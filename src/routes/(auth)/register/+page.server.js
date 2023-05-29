import { redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, "/");
	}
};

export const actions = {
	register: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		data.emailVisibility = true;

		if (data.password.length < 8) {
			return {
				fail: true,
				message: "Das Passwort muss mindestens 8 Zeichen lang sein!",
				email: data.email,
			};
		}

		if (data.password !== data.passwordConfirm) {
			return {
				fail: true,
				message: "Die Passwörter stimmen nicht überein!",
				email: data.email,
			};
		}

		try {
			await locals.pb.collection("users").create(data);
			await locals.pb.collection('users').requestVerification(data.email);
			throw redirect(303, "/success");
		} catch (err) {
			if (err.constructor.name === "Redirect") {
				throw redirect(err.status, err.location);
			}
			return {
				fail: true,
				message: "Der Benutzer existiert bereits!",
				email: data.email,
			};
		}
	},
};
