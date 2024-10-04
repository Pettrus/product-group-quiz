<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
    $: question = data.question;
</script>

<svelte:head>
	<title>Quiz</title>
</svelte:head>

<section>
	<form
		method="POST"
		action="?/nextQuestion"
		use:enhance={() => {
			return async ({ result, update }) => {
				console.log('RESULT', result);
				update();
			};
		}}
	>
		<div class="card bg-base-100 w-96 mx-auto mt-12 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{question.question}</h2>

                <input type="hidden" name="id" value={question.id} />

				{#each JSON.parse(question.options) as option}
					<div class="form-control">
						<label class="label cursor-pointer">
							<input type="radio" name="option" class="radio" value={option} />
							<span class="label-text">{option}</span>
						</label>
					</div>
				{/each}

				<button type="submit" class="btn btn-primary">Next</button>
			</div>
		</div>
	</form>
</section>
