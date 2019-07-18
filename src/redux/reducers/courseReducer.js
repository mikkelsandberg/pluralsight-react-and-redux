import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(
	coursesState = initialState.courses,
	action
) {
	switch (action.type) {
		case types.CREATE_COURSE_SUCCESS:
			return [...coursesState, { ...action.course }];

		case types.UPDATE_COURSE_SUCCESS:
			return coursesState.map(course =>
				course.id === action.course.id ? action.course : course
			);

		case types.LOAD_COURSES_SUCCESS:
			return action.courses;

		default:
			return coursesState;
	}
}
