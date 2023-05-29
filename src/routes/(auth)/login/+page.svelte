<script>
	import { PUBLIC_POCKETBASE } from '$env/static/public';
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;

	let loading = false;

	$: {
		if (form?.fail) {
			loading = false;
			toast.error(form.message, {
				duration: 3000,
				position: 'bottom-right'
			});
		}
	}

	const loginWithProvider = async (provider) => {
		const module = await import('pocketbase');
		const PocketBase = module.default;
		const pb = new PocketBase(PUBLIC_POCKETBASE);
		await pb.collection('users').authWithOAuth2({ provider, createData: { isOAuth: true } });
		const cookie = pb.authStore.exportToCookie({ secure: false, httpOnly: false });
		document.cookie = cookie;
		goto('/');
		invalidateAll();
	};
</script>

<div class="flex justify-center items-center min-h-[100dvh]">
	<div class="md:flex">
		<div class="md:border-r border-b md:border-b-0 p-6 w-full">
			<form
				method="POST"
				action="?/login"
				use:enhance={() => {
					loading = true;
				}}
				class="w-full max-w-lg"
			>
				<div class="flex flex-col items-center gap-y-3">
					<div class="w-full">
						<label class="label" for="title">
							<span class="label-text text-lg">Email</span>
						</label>
						<input
							class="input input-bordered input-primary w-full"
							type="email"
							name="email"
							required
							value={form?.email || ''}
						/>
					</div>

					<div class="w-full">
						<label class="label" for="password">
							<span class="label-text text-lg">Passwort</span>
						</label>
						<input class="input input-bordered input-primary w-full" required name="password" type="password" />
					</div>

					<button type="submit" class="w-full btn btn-primary" class:loading>Anmelden</button>
				</div>
			</form>

			<a class="hover:underline text-slate-500 mt-2 block cursor-pointer transition" href="/requestPasswordReset">
				Passwort vergessen?
			</a>

			{#each data?.authProviders as provider}
				<div class="mt-2">
					<button class="btn btn-primary w-full max-w-s" on:click={() => loginWithProvider(provider)}>
						Sign in with {provider}
					</button>
				</div>
			{/each}
		</div>
		<div class="md:border-l border-t md:border-t-0 p-6 flex w-full items-center">
			<div>
				<div>Du hast noch keinen Account? Erstelle ihn hier.</div>
				<a href="/register" class="btn btn-primary w-full mt-3">Registrieren</a>
			</div>
		</div>
	</div>
</div>
