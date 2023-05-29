<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;

	$: {
		if (form?.fail) {
			toast.error(form.message, {
				duration: 3000,
				position: 'bottom-right'
			});
		}
		if (form?.success) {
			toast.success(form.message, {
				duration: 3000,
				position: 'bottom-right'
			});
		}
	}
</script>

<h1 class="text-4xl mt-6 mb-3">Account Settings</h1>
<div class="flex gap-5">

	<div class="bg-white p-5 shadow-md rounded-lg">
		<div class="text-xl font-semibold">Benutzerdaten</div>
		<form action="?/changeName" method="POST" use:enhance>
			<div class="max-w-xs">
				<input
					class="input input-bordered input-primary w-full mt-2"
					placeholder="Name"
					type="text"
					name="name"
					required
					value={data?.user?.name}
				/>
				<button class="btn mt-2 btn-accent w-full" type="submit">Speichern</button>
			</div>
		</form>
	</div>

	{#if !data?.user?.isOAuth}
	<div class="bg-white p-5 shadow-md rounded-lg">
		<div class="text-xl font-semibold">E-Mail Adresse ändern</div>
		<form action="?/changeEmail" method="POST" use:enhance>
			<div class="max-w-xs">
				<label class="label" for="title">
					<span class="label-text">Neue E-Mail Adresse</span>
				</label>
				<input
					class="input input-bordered input-primary w-full"
					placeholder="E-Mail Adresse"
					type="email"
					name="email"
				/>
				<button class="btn mt-2 btn-accent w-full" type="submit">Email Adresse ändern</button>
			</div>
		</form>
	</div>
	{/if}

	{#if !data?.user?.isOAuth}
	<div class="bg-white p-5 shadow-md rounded-lg">
		<div class="text-xl font-semibold">Passwort ändern</div>
		<form action="?/changePassword" method="POST" use:enhance>
			<div class="max-w-xs">
				<label class="label" for="title">
					<span class="label-text">Altes Passwort</span>
				</label>
				<input class="input input-bordered input-primary w-full" type="password" required name="oldPassword" />
				<label class="label" for="title">
					<span class="label-text">Neues Passwort</span>
				</label>
				<input class="input input-bordered input-primary w-full" type="password" required name="password" />
				<label class="label" for="title">
					<span class="label-text">Neues Passwort wiederholen</span>
				</label>
				<input class="input input-bordered input-primary w-full" type="password" required name="passwordConfirm" />
				<button class="btn mt-2 btn-accent w-full" type="submit">Passwort ändern</button>
			</div>
		</form>
	</div>
	{/if}
</div>
