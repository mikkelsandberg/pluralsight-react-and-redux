import * as courseApi from '../../api/courseApi';
import * as types from './actionTypes';

export function loadCoursesSuccess(courses) {
	return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
	return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
	return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
	return async dispatch => {
		try {
			const courses = await courseApi.getCourses();
			dispatch(loadCoursesSuccess(courses));
		} catch (error) {
			throw error;
		}
	};
}

export function saveCourse(course) {
	return function(dispatch) {
		return courseApi
			.saveCourse(course)
			.then(savedCourse => {
				course.id
					? dispatch(updateCourseSuccess(savedCourse))
					: dispatch(createCourseSuccess(savedCourse));
			})
			.catch(error => {
				throw error;
			});
	};
}
