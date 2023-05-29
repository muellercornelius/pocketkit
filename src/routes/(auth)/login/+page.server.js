import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, "/");
	}

	const loginMethods = await locals.pb.collection('users').listAuthMethods();
	return {
		authProviders: loginMethods.authProviders.map(p => p.name),
	};
};

export const actions = {
	login: async ({ request, locals, fetch }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		const email = data.email.trim();
		const password = data.password.trim();

		try {
			const res = await locals.pb
				.collection("users")
				.authWithPassword(email, password);
			if (!res.record.verified) {
				await locals.pb.authStore.clear();
				return {
					fail: true,
					message: "Email nicht verifiziert!",
					email: data.email,
				};
			}
		} catch (_) {
			return {
				fail: true,
				message: "Email oder Passwort falsch!",
			};
		}
	},
};
