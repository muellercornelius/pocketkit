<script>
	import { GripVertical } from 'lucide-svelte';
</script>

<div class="p-2">
	<div class="navbar justify-between bg-white rounded-md shadow-md mb-2">
		<div class="">
			<a class="btn btn-ghost normal-case text-xl" href="/">Your Text</a>
		</div>
		<div class=" items-center">
			<div class="form-control">
				<input type="text" placeholder="Search" class="input input-bordered w-96" />
			</div>
		</div>
		<div>
			<div class="dropdown dropdown-hover dropdown-end">
				<div class="btn rounded-full btn-circle btn-ghost m-1"><GripVertical /></div>
				<ul class="dropdown-content shadow-lg menu p-2 bg-white rounded-box w-52 border">
					<li><a href="/account">Account</a></li>
					<form action="/?/signout" method="POST">
						<li>
							<button type="submit">Abmelden</button>
						</li>
					</form>
				</ul>
			</div>
		</div>
	</div>
	<slot />
</div>
