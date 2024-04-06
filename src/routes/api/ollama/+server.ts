import type { OllamaChatMessage } from '$lib/types';

export async function POST({ request, fetch }) {
	try {
		let requestData: { messages: OllamaChatMessage[]; model: string; context: string };

		if (!request.body) throw new Error('No request body');

		const read = await request.body.getReader().read();
		const decoder = new TextDecoder();
		const data = decoder.decode(read.value);

		requestData = JSON.parse(data);

		console.log(requestData.messages);

		// Format the data to be sent to Ollama
		const body = {
			model: requestData.model,
			messages: requestData.messages,
			context: requestData.context != '' ? requestData.context : undefined
		};

		console.log('Sending to Ollama: ', body);
		const response = await fetch('http://localhost:11434/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'text/event-stream'
			},
			body: JSON.stringify(body)
		});

		const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();

		if (!reader) throw new Error('No reader');

		const stream = new ReadableStream({
			async start(controller) {
				while (true) {
					const { value, done } = await reader?.read();
					if (done) break;

					console.log('value: ', value);

					const data = `event: message\ndata: ${value}\n\n`;
					controller.enqueue(data);
				}
			}
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive'
			}
		});
	} catch (error) {
		console.log(error);
	}
}
