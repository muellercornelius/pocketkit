export const load = async ({ locals }) => {
	const authStore = locals.pb.authStore;
	const user = JSON.parse(JSON.stringify(authStore.model));
	return {
		user,
	};
};
