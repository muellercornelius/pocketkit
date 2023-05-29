import { redirect } from "@sveltejs/kit";

export const actions = {
	signout: async ({ locals }) => {
		locals.pb.authStore.clear();
		throw redirect(303, "/login");
	},
};
