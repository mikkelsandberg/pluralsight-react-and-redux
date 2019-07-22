import { mount } from 'enzyme';
import React from 'react';

import { authors, courses, newCourse } from '../../../tools/mockData';
import { ManageCoursePage } from './ManageCoursePage';

function render(args) {
	const defaultProps = {
		authors,
		courses,
		// History passed from React Router in real app, so just stubbing for test.
		// Could also use MemoryRouter as shown in Header.test.js,
		// or even wrap with React Router, depending on if
		// you need to test React Router related behavior.
		history: {},
		saveCourse: jest.fn(),
		loadAuthors: jest.fn(),
		loadCourses: jest.fn(),
		course: newCourse,
		match: {},
		location: {}
	};

	const props = { ...defaultProps, ...args };

	return mount(<ManageCoursePage {...props} />);
}

it('sets error when trying to save empty title field', () => {
	const wrapper = render();
	wrapper.find('form').simulate('submit');
	const error = wrapper.find('.alert').first();
	expect(error.text()).toBe('Title is required.');
});
