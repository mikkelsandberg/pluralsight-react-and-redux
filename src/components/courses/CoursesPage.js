import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends Component {
	componentDidMount() {
		const { courses, authors, actions } = this.props;
		if (!courses.length) {
			actions.loadCourses().catch(error => {
				console.log(`Loading courses failed: ${error}`);
			});
		}

		if (!authors.length) {
			actions.loadAuthors().catch(error => {
				console.log(`Loading courses failed: ${error}`);
			});
		}
	}

	render() {
		return (
			<>
				<h2>Courses</h2>

				<Link
					style={{ marginBottom: 20 }}
					className="btn btn-primary add-course"
					to="/course"
				>
					Add course
				</Link>

				<CourseList courses={this.props.courses} />
			</>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	courses: state.courses.map(course => {
		return {
			...course,
			authorName: state.authors?.find(author => author.id === course.authorId)
				?.name
		};
	}),
	authors: state.authors
});

const mapDispatchToProps = dispatch => ({
	actions: {
		loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
		loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CoursesPage);
