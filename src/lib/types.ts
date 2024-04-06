export type OllamaResponse = {
	created_at: string;
	done: Boolean;
	model: string;
	message: OllamaChatMessage;
	context?: Number[];
	eval_count?: Number;
	eval_duration?: Number;
	prompt_eval_count?: Number;
	prompt_eval_duration?: Number;
	total_duration?: Number;
};

export type OllamaChatMessage = {
	role: string;
	content: string;
};
export type ChatMessage = {
	id: number;
	createdAt: Date;
	role: string;
	content: string;
};

export type ChatHistory = ChatMessage[];
