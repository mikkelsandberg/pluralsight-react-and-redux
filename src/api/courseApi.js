import { handleError, handleResponse } from './apiUtils';

const baseUrl = process.env.API_URL + '/courses/';

export async function getCourses() {
	try {
		const courses = await fetch(baseUrl);
		return handleResponse(courses);
	} catch (error) {
		handleError(error);
	}
}

export async function saveCourse(course) {
	try {
		const courseToSave = await fetch(baseUrl + (course.id || ''), {
			method: course.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(course)
		});
		return handleResponse(courseToSave);
	} catch (error) {
		handleError(error);
	}
}

export async function deleteCourse(courseId) {
	try {
		const courseToDelete = await fetch(baseUrl + courseId, {
			method: 'DELETE'
		});
		return handleResponse(courseToDelete);
	} catch (error) {
		handleError(error);
	}
}
