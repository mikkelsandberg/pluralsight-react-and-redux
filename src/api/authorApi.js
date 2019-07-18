import { handleError, handleResponse } from './apiUtils';

const baseUrl = process.env.API_URL + '/authors/';

export async function getAuthors() {
	try {
		const authors = await fetch(baseUrl);
		return handleResponse(authors);
	} catch (error) {
		handleError(error);
	}
}
