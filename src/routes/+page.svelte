<script lang="ts">
	import { Icons } from '$lib/components/icons';
	import { ChatSuggestions } from '$lib/components/chatsuggestions';
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { EventSource } from '$lib/eventSource';
	import type { ChatMessage, OllamaResponse } from '$lib/types';
	import { chatStore } from '$lib/stores';

	export let data: PageData;

	$: ({ models } = data);

	let selectedModel = '';
	let prompt = '';
	let context = '';

	let responding = false;
	let liveAnswer = '';

	// A naive way to prevent multiple EventSource connections
	// Not a good use of the unsubscribe function. A connection should remain open until the page closes
	// or until another tool is navigated to. For now it's fine since this is primarily for personal use,
	// but this will need to change as the app scales.
	let unsubscribe: () => void;

	let textareaElement: HTMLTextAreaElement;

	function handleAnswer(event: MessageEvent<any>) {
		const response: OllamaResponse = JSON.parse(event.data);
		console.log('response: ', response);

		if (!response.done) {
			liveAnswer += response.message.content;
		} else {
			let message: ChatMessage = {
				id: new Date(response.created_at).getTime(),
				createdAt: new Date(response.created_at),
				role: 'assistant',
				content: liveAnswer
			};

			chatStore.addMessage(message);

			liveAnswer = '';
			prompt = '';
			textareaElement.style.height = '';

			unsubscribe();
			responding = false;
		}
	}

	function handleError(event: MessageEvent<any>) {
		console.log(event);
		responding = false;
		unsubscribe();
	}

	function handleAbort(event: MessageEvent<any>) {
		console.log(event);
		responding = false;
		unsubscribe();
	}

	function subscribe() {
		const sse = new EventSource();
		let payload = {
			messages: $chatStore.map(({ role, content }) => ({ role, content })),
			model: selectedModel,
			context: context
		};
		console.log('payload: ', payload);
		sse.start(payload, handleAnswer, handleError, handleAbort);
		return () => sse.stop();
	}

	const submitPrompt = async () => {
		if (selectedModel != '' && prompt != '' && !responding) {
			responding = true;
			console.log('Submitting prompt: ', prompt);
			let message = {
				id: Date.now(),
				createdAt: new Date(),
				role: 'user',
				content: prompt
			};

			chatStore.addMessage(message);

			unsubscribe = subscribe();
		}
	};
</script>

<div class="relative flex h-full w-full">
	<div class="absolute left-2 top-2">
		<!-- Select Model: Show when configuring a new chat, hide after sending the first message -->

		<select
			id="models"
			bind:value={selectedModel}
			class="block w-full rounded-lg border border-slate-800 bg-slate-700 p-2.5 text-sm text-slate-300 placeholder-slate-500 outline-none"
			disabled={$chatStore.length > 0}
		>
			<option value="" selected>Select a model</option>

			{#each models.models as model}
				<option value={model.name}>{model.name}</option>
			{/each}
		</select>
	</div>
	<div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center">
		{#if $chatStore.length == 0}
			<ChatSuggestions />
		{/if}
		<form class="relative flex w-full shadow-sm" on:submit|preventDefault={submitPrompt}>
			<!-- Work on styling for text area. It should be disabled and greyed out while Ollama is responding and restore user's prompt if there is an error with the response -->

			{#if responding}
				<Icons.spinner
					class="absolute right-0 top-1/2 z-20 my-auto mr-2 -translate-y-1/2 fill-slate-300"
				/>
			{:else}
				<button type="submit">
					<Icons.send
						class="absolute right-0 top-1/2 z-20 my-auto mr-2 h-5 -translate-y-1/2 fill-slate-300"
					/>
				</button>
			{/if}
			<textarea
				class="z-10 flex h-11 w-[800px] resize-none rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 outline-none {responding
					? `text-slate-200/30`
					: ``}"
				placeholder="send a message"
				disabled={responding}
				bind:this={textareaElement}
				bind:value={prompt}
				on:keypress={(e) => {
					if (e.keyCode == 13 && !e.shiftKey) {
						e.preventDefault();
					}
					if (prompt !== '' && e.keyCode == 13 && !e.shiftKey) {
						submitPrompt();
					}
				}}
				rows="1"
				on:input={() => {
					textareaElement.style.height = '';
					textareaElement.style.height = Math.min(textareaElement.scrollHeight, 200) + 'px';
				}}
			/>
		</form>
		<span class="z-10 pt-3 text-sm font-light text-slate-400"
			>Some generic disclaimer here about inconsistencies in predictive models. Ollama might lie to
			you.</span
		>
	</div>

	{#if $chatStore.length == 0}
		<div class="m-auto -translate-y-32 flex-col items-center">
			<div class="items-center opacity-15 transition-opacity duration-300 hover:opacity-60">
				<Icons.ollama />
			</div>
		</div>
	{:else}
		<div class="mx-auto flex h-full w-full max-w-6xl flex-col overflow-y-auto pb-24">
			{#each $chatStore as message (message.id)}
				<div class="w-full flex-col">
					{#if message.role !== 'assistant'}
						<span class="flex w-28 gap-3 py-4 pr-2 text-lg font-bold"><Icons.userAvatar />You</span>
					{:else}
						<span class="flex w-28 gap-2 py-4 pr-2 text-lg font-bold"
							><img src="favicon.png" class="h-7 w-7" alt="ollama" />Ollama</span
						>
					{/if}
					<div class="whitespace-pre-line px-9">
						{@html marked.parse(message.content)}
					</div>
				</div>
			{/each}
			{#if liveAnswer}
				<div class="w-full">
					<span class="flex w-28 gap-2 py-4 pr-2 text-lg font-bold"
						><img src="favicon.png" class="h-7 w-7" alt="ollama" />Ollama</span
					>
					<div class="whitespace-pre-line px-9">
						{@html marked.parse(liveAnswer)}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
