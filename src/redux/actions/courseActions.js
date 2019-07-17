import * as courseApi from '../../api/courseApi';
import * as types from './actionTypes';

export const createCourse = course => ({
	type: types.CREATE_COURSE,
	course
});

export const loadCoursesSuccess = courses => ({
	type: types.LOAD_COURSES_SUCCESS,
	courses
});

export const loadCourses = () => {
	return dispatch => {
		return courseApi
			.getCourses()
			.then(courses => {
				dispatch(loadCoursesSuccess(courses));
			})
			.catch(error => {
				throw error;
			});
	};
};
