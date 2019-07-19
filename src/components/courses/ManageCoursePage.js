import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { newCourse } from '../../../tools/mockData';
import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import Spinner from '../common/Spinner';
import CourseForm from './CourseForm';

function ManageCoursePage({
	courses,
	authors,
	loadAuthors,
	loadCourses,
	saveCourse,
	history,
	...props
}) {
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);

	async function getCourses() {
		try {
			await loadCourses();
		} catch (error) {
			console.log(`Loading courses failed: ${error}`);
		}
	}

	async function getAuthors() {
		try {
			await loadAuthors();
		} catch (error) {
			console.log(`Loading courses failed: ${error}`);
		}
	}

	useEffect(() => {
		if (!courses?.length) {
			getCourses();
		} else {
			setCourse({ ...props.course });
		}

		if (!authors?.length) {
			getAuthors();
		}
	}, [props.course]);

	function handleChange(e) {
		const { name, value } = e.target;
		setCourse(prevCourse => ({
			...prevCourse,
			[name]: name === 'authorId' ? parseInt(value, 10) : value
		}));
	}

	function formIsValid() {
		const { title, authorId, category } = course;
		const errors = {};

		if (!title) errors.title = 'Title is required.';
		if (!authorId) errors.author = 'Author is required.';
		if (!category) errors.category = 'Category is required.';

		setErrors(errors);
		// Form is valid if erros object has no keys
		return Object.keys(errors).length === 0;
	}

	async function handleSave(e) {
		e.preventDefault();

		if (!formIsValid()) return;

		setSaving(true);

		try {
			await saveCourse(course);
			toast.success('Course saved!');
			history.push('/courses');
		} catch (error) {
			setSaving(false);
			setErrors({ onSave: error.message });
		}
	}

	return authors.length === 0 || courses.length === 0 ? (
		<Spinner />
	) : (
		<CourseForm
			course={course}
			authors={authors}
			errors={errors}
			onChange={handleChange}
			onSave={handleSave}
			saving={saving}
		/>
	);
}

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loadCourses: PropTypes.func.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	saveCourse: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
	return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
	const { slug } = ownProps.match.params;
	const course =
		slug && state.courses.length
			? getCourseBySlug(state.courses, slug)
			: newCourse;
	return {
		course,
		courses: state.courses,
		authors: state.authors
	};
}

const mapDispatchToProps = {
	loadCourses,
	loadAuthors,
	saveCourse
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageCoursePage);
