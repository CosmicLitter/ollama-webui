<script lang="ts">
	import { quartInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { Icons } from '$lib/components/icons';

	let open = true;
</script>

<div class="relative">
	<button
		on:click={() => (open = !open)}
		class="group absolute -right-6 top-1/2 z-10 w-6 -translate-y-1/2 py-4 opacity-50 transition-all duration-300 hover:opacity-100"
	>
		<div
			class="mx-auto -mb-0.5 h-4 w-1 {open
				? 'rotate-0 duration-500 group-hover:rotate-12'
				: '-rotate-12'} rounded-t-full bg-slate-300"
		/>
		<div
			class=" mx-auto -mb-0.5 h-4 w-1 {open
				? 'rotate-0 duration-500 group-hover:-rotate-12'
				: 'rotate-12'} rounded-b-full bg-slate-300"
		/>
	</button>
	{#if open}
		<div
			class="flex h-full w-72 flex-col bg-slate-950 pt-4"
			transition:slide={{ duration: 500, easing: quartInOut, axis: 'x' }}
		>
			<button class="mx-4 flex h-10 items-center rounded-lg hover:bg-slate-900">
				<Icons.bot class="mx-2 h-8 " />
				<span class="grow truncate text-left font-semibold"> New Chat </span>
				<Icons.newChat class="mx-2 h-5" />
			</button>
			<div class="mt-auto flex items-center py-4">
				<Icons.user class="mx-4 " />
				<span>User authentication module coming soon.</span>
			</div>
		</div>
	{/if}
</div>
