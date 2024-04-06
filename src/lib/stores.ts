import { writable } from 'svelte/store';
import type { ChatHistory, ChatMessage } from './types';

function createChatStore() {
	const { subscribe, set, update } = writable<ChatHistory>([]);

	// Add a new message to the chat history
	const addMessage = (message: ChatMessage) => {
		update((messages) => [...messages, message]);
	};

	// Clear the chat history
	const clearMessages = () => {
		set([]);
	};

	// Remove a message from the chat history
	const removeMessage = (id: number) => {
		update((messages) => messages.filter((message) => message.id !== id));
	};

	//

	return {
		subscribe,
		addMessage,
		clearMessages,
		removeMessage
	};
}

export const chatStore = createChatStore();
