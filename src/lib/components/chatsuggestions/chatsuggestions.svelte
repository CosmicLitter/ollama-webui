<script lang="ts">
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	const chat_examples = [1, 2, 3, 4];
	let suggestions = false;

	onMount(() => {
		suggestions = true;
	});
</script>

<div class="grid grid-cols-2 gap-3 py-6">
	{#each chat_examples as example, i}
		{#if suggestions}
			<button
				class="h-16 w-[380px] rounded-lg border border-slate-600 p-2
					text-left hover:bg-slate-800"
				in:fly={{
					delay: 100 * i,
					duration: 300,
					// x: 100,
					y: 500,
					opacity: 0.1,
					easing: quintOut
				}}
			>
				<h4 class="font-bold text-slate-300">
					Chat Suggestion {example}
				</h4>
				<p class="truncate text-slate-400">
					This is a placeholder suggestion and currently does not function.
				</p>
			</button>
		{/if}
	{/each}
</div>
