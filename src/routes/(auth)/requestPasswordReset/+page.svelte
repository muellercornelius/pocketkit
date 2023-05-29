<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	export let form;

	let loading = false;

	$: {
		if (form?.success) {
			loading = false;
			toast.success(form.message, {
				duration: 3000,
				position: 'bottom-right'
			});
		}
		if (form?.fail) {
			loading = false;
			toast.error(form.message, {
				duration: 3000,
				position: 'bottom-right'
			});
		}
	}
</script>

<div class="flex justify-center items-center min-h-[100dvh] p-6">
	{#if !form?.success}
		<form
			method="POST"
			action="?/requestPasswordReset"
			use:enhance={() => {
				loading = true;
			}}
			class="w-full max-w-sm"
		>
			<div class="flex flex-col items-center gap-y-3">
				<div class="w-full">
					<label class="label" for="firstName">
						<span class="label-text text-lg">Email</span>
					</label>
					<input class="input input-bordered input-primary w-full" required name="email" type="email" />
				</div>
				<button class="btn btn-primary w-full" class:loading>Passwort zurücksetzen</button>
			</div>
		</form>
	{:else}
		<a class="btn btn-primary w-full max-w-sm" href="/login">Zurück zum Login</a>
	{/if}
</div>
