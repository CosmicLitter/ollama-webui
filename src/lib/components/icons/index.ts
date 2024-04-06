import { SvelteComponent } from 'svelte';
import { MessageSquarePlus } from 'lucide-svelte';
import { Bot } from 'lucide-svelte';
import { CircleUserRound } from 'lucide-svelte';
import { Send } from 'lucide-svelte';
import { UserRoundIcon } from 'lucide-svelte';
import Ollama from './ollama.svelte';
import Spinner from './spinner.svelte';

export type Icon = SvelteComponent;

export const Icons = {
	userAvatar: UserRoundIcon,
	spinner: Spinner,
	send: Send,
	ollama: Ollama,
	newChat: MessageSquarePlus,
	bot: Bot,
	user: CircleUserRound
};
