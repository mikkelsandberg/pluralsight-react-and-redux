import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { newCourse } from '../../../tools/mockData';
import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import CourseForm from './CourseForm';

const ManageCoursePage = ({
	courses,
	authors,
	loadAuthors,
	loadCourses,
	saveCourse,
	...props
}) => {
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (!courses?.length) {
			loadCourses().catch(error => {
				console.log(`Loading courses failed: ${error}`);
			});
		}

		if (!authors?.length) {
			loadAuthors().catch(error => {
				console.log(`Loading courses failed: ${error}`);
			});
		}
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setCourse(prevCourse => ({
			...prevCourse,
			[name]: name === 'authorId' ? parseInt(value, 10) : value
		}));
	}

	function handleSave(e) {
		e.preventDefault();
		saveCourse(course);
	}

	return (
		<CourseForm
			course={course}
			authors={authors}
			errors={errors}
			onChange={handleChange}
			onSave={handleSave}
		/>
	);
};

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loadCourses: PropTypes.func.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	saveCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	course: newCourse,
	courses: state.course,
	authors: state.authors
});

const mapDispatchToProps = {
	loadCourses,
	loadAuthors,
	saveCourse
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageCoursePage);
