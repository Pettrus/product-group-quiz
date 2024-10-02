<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section>
	<form method="POST" action="?/login" use:enhance={() => {
		return async ({ result, update }) => {
			console.log("RESULT", result);
			update();
		};
	}}>
		<div class="card bg-base-100 w-96 mx-auto mt-12 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Please inform the PIN in order to proceed</h2>
				<label class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="h-4 w-4 opacity-70"
					>
						<path
							fill-rule="evenodd"
							d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
							clip-rule="evenodd"
						/>
					</svg>
					<input type="password" name="pin" class="grow" />
				</label>
				{#if form?.incorrect}
					<div>Incorect PIN</div>
				{/if}

				<button class="btn btn-primary" type="submit">Submit</button>
			</div>
		</div>
	</form>
</section>
