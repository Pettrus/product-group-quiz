<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { updated } from '$app/stores';

	const { data }: { data: PageData } = $props();
	let question = $state(data.question);
	let remaining = $state(30);

	onMount(() => {
		const interval = setInterval(() => {
			remaining -= 1;

			if (remaining === 0) {
				clearInterval(interval);

				const form: any = document.getElementById('quizz-form');
				form?.submit();
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>Quiz</title>
</svelte:head>

<section>
	<form
		method="POST"
		id="quizz-form"
		action="?/nextQuestion"
		use:enhance={() => {
			return async ({ result, update }) => {
				const data: any = result;

				if (data != null && data.type !== 'redirect') {
					question = data.data[0];

					remaining = 30;

					const radios = document.getElementsByName('option');

					for (let index = 0; index < radios.length; index++) {
						const radio: any = radios[index];
						radio.checked = false;
					}
				} else {
					update();
				}
			};
		}}
	>
		<div class="card bg-base-100 w-96 mx-auto mt-12 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{question.question}</h2>

				<div class="text-right text-lg font-bold">{remaining}⏳</div>

				<input type="hidden" name="id" value={question.id} />
				<input type="hidden" name="time" id="time" value={remaining} />

				{#each JSON.parse(question.options) as option}
					<div class="form-control">
						<label class="label cursor-pointer">
							<input
								type="radio"
								name="option"
								class="radio"
								value={option}
								required={remaining > 0}
							/>
							<span class="label-text">{option}</span>
						</label>
					</div>
				{/each}

				<button type="submit" class="btn btn-primary">Next</button>
			</div>
		</div>
	</form>
</section>
