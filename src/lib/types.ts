export type ChatMessage = {
	id: number;
	createdAt: Date;
	role: string;
	content: string;
};

export type ChatHistory = ChatMessage[];
