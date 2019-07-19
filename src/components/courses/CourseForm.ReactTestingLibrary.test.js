import React from 'react';
import { cleanup, render } from 'react-testing-library';

import CourseForm from './CourseForm';

afterEach(cleanup);

function renderCourseForm(args) {
	const defaultProps = {
		authors: [],
		course: {},
		saving: false,
		errors: {},
		onSave: () => {},
		onChange: () => {}
	};

	const props = { ...defaultProps, ...args };
	return render(<CourseForm {...props} />);
}

function rtlGetByText(text, options = {}, logDebug = false) {
	const { getByText, debug } = renderCourseForm(options);
	if (logDebug) debug();
	return getByText(text);
}

it('Should render "Add Course" header', () => {
	rtlGetByText('Add Course');
});

it('Should label save button as "Save" when not saving', () => {
	rtlGetByText('Save');
});

it('Should label save button as "Saving..." when saving', () => {
	rtlGetByText('Saving...', { saving: true });
});
