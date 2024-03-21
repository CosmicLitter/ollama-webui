<script lang="ts">
	import { Icons } from '$lib/components/icons';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	const chat_examples = [1, 2, 3, 4];
	let suggestions = false;

	onMount(() => {
		suggestions = true;
	});
</script>

<div class="relative flex h-full w-full">
	<div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center">
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
		<textarea class="z-10 w-[800px] resize-none rounded-xl border border-slate-600 bg-slate-800" />
		<span class="z-10 pt-3 text-sm font-light text-slate-400"
			>Some generic disclaimer here about inconsistencies in predictive models. Ollama might lie to
			you.</span
		>
	</div>
	<div class="m-auto -translate-y-32 flex-col items-center">
		<div
			class="opacity-15 flex flex-col items-center transition-opacity duration-300 hover:opacity-60"
		>
			<Icons.ollama />
		</div>
	</div>
</div>
