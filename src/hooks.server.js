import PocketBase from "pocketbase";
import { PUBLIC_POCKETBASE } from "$env/static/public";
import { handleAuth } from "$lib/utils/handleAuth";

export const handle = async function ({ event, resolve }) {
	event.locals.pb = new PocketBase(PUBLIC_POCKETBASE);

	const cookieAsString = event.request.headers.get("cookie") || ""

	event.locals.pb.authStore.loadFromCookie(cookieAsString);

	try {
		event.locals.pb.authStore.isValid &&
			(await event.locals.pb.collection("users").authRefresh());
	} catch (_) {
		event.locals.pb.authStore.clear();
	}

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = event.locals.pb.authStore.model;
	} else {
		event.locals.user = undefined;
	}

	handleAuth(event, event.locals.user);

	const response = await resolve(event);

	if (event.locals.pb.authStore.isValid) {
		response.headers.set(
			"set-cookie",
			event.locals.pb.authStore.exportToCookie({
				secure: import.meta.env.PROD,
				maxAge: 60 * 60 * 24 * 180,
			}),
		);
	} else {
		// Clear cookie
		response.headers.set(
			"set-cookie",
			event.locals.pb.authStore.exportToCookie({
				secure: import.meta.env.PROD,
				maxAge: 0,
				expires: new Date(0),
			}),
		);
	}

	return response;
};
