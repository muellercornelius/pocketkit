import { redirect } from "@sveltejs/kit";

const loggedOut = ["/login", "/register", "/success", "/requestPasswordReset"];

export const handleAuth = (event, user) => {
	const path = event.url.pathname;
	if (!user) {
		if (!loggedOut.includes(path)) {
			throw redirect(303, "/login");
		}
	}
};
