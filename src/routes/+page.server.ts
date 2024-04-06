import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let models = null;
	try {
		const response = await fetch('http://localhost:11434/api/tags', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw await response.json();
		}

		models = await response.json();
	} catch (error) {
		console.log(error);
	}

	return {
		models
	};
};
