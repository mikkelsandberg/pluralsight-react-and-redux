import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses } from '../../redux/actions/courseActions';

const ManageCoursePage = ({ courses, authors, loadAuthors, loadCourses }) => {
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

	return (
		<>
			<h2>Manage Course</h2>
		</>
	);
};

ManageCoursePage.propTypes = {
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loadCourses: PropTypes.func.isRequired,
	loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	courses: state.course,
	authors: state.authors
});

const mapDispatchToProps = {
	loadCourses,
	loadAuthors
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageCoursePage);
