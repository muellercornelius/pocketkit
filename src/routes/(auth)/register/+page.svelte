<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	export let form;

	$: {
		if (form?.fail) {
			toast.error(form.message, {
				duration: 3000,
				position: 'bottom-right'
			});
		}
	}
</script>

<div class="flex justify-center items-center min-h-[100dvh] p-6">
	<form method="POST" action="?/register" use:enhance class="w-full max-w-sm">
		<div class="flex flex-col items-center gap-y-3">
			<div class="w-full">
				<label class="label" for="firstName">
					<span class="label-text text-lg">Email</span>
				</label>
				<input
					class="input input-bordered input-primary w-full "
					name="email"
					type="email"
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

			<div class="w-full">
				<label class="label" for="passwordConfirm">
					<span class="label-text text-lg">Passwort bestätigen</span>
				</label>
				<input class="input input-bordered input-primary w-full" required name="passwordConfirm" type="password" />
			</div>

			<button class="btn btn-primary w-full"> Benutzer erstellen </button>
		</div>
	</form>
</div>
