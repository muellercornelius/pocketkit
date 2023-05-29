import { redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
    if (locals.pb.authStore.isValid) {
        throw redirect(303, "/");
    }
};

export const actions = {
    requestPasswordReset: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        try {
            await locals.pb.collection("users").requestPasswordReset(data.email);
            return {
                success: true,
                message: "E-Mail wurde versendet!",
            };
        } catch (err) {
            return {
                fail: true,
                message: "E-Mail konnte nicht versendet werden!",
            };
        }
    },
};
