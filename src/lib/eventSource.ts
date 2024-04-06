import { SSE } from 'sse.js';

type EventHandler = (event: MessageEvent<any>) => void;

export class EventSource {
	private eventSource?: SSE;
	private handleAnswer?: EventHandler;
	private handleError?: EventHandler;
	private handleAbort?: EventHandler;

	start(
		payload: any,
		handleAnswer: EventHandler,
		handleError: EventHandler,
		handleAbort: EventHandler
	) {
		this.eventSource = new SSE('/api/ollama', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify(payload)
		});
		this.handleAnswer = handleAnswer;
		this.handleError = handleError;
		this.handleAbort = handleAbort;

		if (this.handleAnswer) {
			this.eventSource.addEventListener('message', this.handleAnswer);
		}
		if (this.handleError) {
			this.eventSource.addEventListener('error', this.handleError);
		}
		if (this.handleAbort) {
			this.eventSource.addEventListener('abort', this.handleAbort);
		}

		this.eventSource.stream();
	}

	stop() {
		this.eventSource?.close();
		console.log(
			'Closing event source: ' +
				JSON.stringify(this.eventSource?.method + JSON.stringify(this.eventSource?.payload))
		);
		this.reset();
	}

	reset() {
		if (this.handleAnswer) {
			this.eventSource?.removeEventListener('message', this.handleAnswer);
		}
		if (this.handleError) {
			this.eventSource?.removeEventListener('error', this.handleError);
		}
		if (this.handleAbort) {
			this.eventSource?.removeEventListener('abort', this.handleAbort);
		}

		this.eventSource?.close();
		this.eventSource = undefined;
	}
}
