import { createStore } from 'redux';

import * as courseActions from './actions/courseActions';
import rootReducer from './reducers';
import initialState from './reducers/initialState';

it('should handle creating courses', () => {
	// arrange
	const store = createStore(rootReducer, initialState);
	const course = {
		title: 'Clean code'
	};

	// act
	const action = courseActions.createCourseSuccess(course);
	store.dispatch(action);

	// assert
	const createdCourse = store.getState().courses[0];
	expect(createdCourse).toEqual(course);
});