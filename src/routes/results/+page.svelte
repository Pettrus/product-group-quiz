<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: activeTab = 0;
</script>

<svelte:head>
	<title>Results</title>
</svelte:head>

<section>
	<div class="card bg-base-100 w-96 mx-auto mt-12 shadow-xl">
		<div class="card-body">
			<div role="tablist" class="tabs tabs-boxed">
				<button
					type="button"
					role="tab"
					class="tab"
					class:tab-active={activeTab === 0}
					on:click={() => (activeTab = 0)}>Your questions</button
				>
				<button
					type="button"
					role="tab"
					class="tab"
					class:tab-active={activeTab === 1}
					on:click={() => (activeTab = 1)}>Leader board</button
				>
			</div>

			<div>
				{#if activeTab === 0}
					<div>
						{#each data.questions as question, i}
							<div class="mt-5">
								<div class="flex justify-between items-center">
									<h2 class="text-xl font-bold">Question: {i + 1}</h2>

									{#if question.userAnswer === question.answer}
										<div class="text-green-500">
											+1 Point
										</div>
									{:else}
										<div class="text-red-500">
											Wrong
										</div>
									{/if}
								</div>

								{#each JSON.parse(question.options) as option, optionIndex}
									<div
										class="ml-5 my-3 p-1 rounded-md {question.answer ===
											optionIndex && 'border-solid border-2 border-green-500'} {question.userAnswer != question.answer && question.userAnswer === optionIndex && 'border-solid border-2 border-red-500'}"
									>
										{option}
									</div>
								{/each}
							</div>
						{/each}
					</div>
				{:else}
					<div class="mt-5">
						{#each data.allUsers as user}
							<div>
								{user.name} - {user.points}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
