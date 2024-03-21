import { SvelteComponent } from 'svelte';
import { MessageSquarePlus } from 'lucide-svelte';
import { Bot } from 'lucide-svelte';
import { CircleUserRound } from 'lucide-svelte';
import Ollama from './ollama.svelte';

export type Icon = SvelteComponent;

export const Icons = {
	ollama: Ollama,
	newChat: MessageSquarePlus,
	bot: Bot,
	user: CircleUserRound
};
