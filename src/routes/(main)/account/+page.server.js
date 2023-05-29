export const actions = {
    changeName: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);
        await locals.pb.collection("users").update(locals.user.id, { name: data.name });
    },
    changeEmail: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        const email = data.email.trim();

        try {
            await locals.pb
                .collection("users")
                .requestEmailChange(email);
            return {
                success: true,
                message: "Email versendet!",
            };
        } catch (_) {
            return {
                fail: true,
                message: "Email konnte nicht versendet werden!",
            };
        }
    },
    changePassword: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        if (data.password.length < 8) {
            return {
                fail: true,
                message: "Das Passwort muss mindestens 8 Zeichen lang sein!",
            };
        }

        if (data.password !== data.passwordConfirm) {
            return {
                fail: true,
                message: "Die Passwörter stimmen nicht überein!",
            };
        }

        try {
            await locals.pb
                .collection("users")
                .update(locals.user.id, data);
        } catch (_) {
            console.log(_);
            return {
                fail: true,
                message: "Passwort konnte nicht geändert werden!",
            };
        }
    },
};