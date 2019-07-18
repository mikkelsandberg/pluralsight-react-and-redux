import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';

import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import Spinner from '../common/Spinner';
import CourseList from './CourseList';

class CoursesPage extends Component {
	componentDidMount() {
		const { courses, authors, actions } = this.props;
		if (!courses.length) {
			try {
				actions.loadCourses();
			} catch (error) {
				console.log(`Loading courses failed: ${error}`);
			}
		}

		if (!authors.length) {
			try {
				actions.loadAuthors();
			} catch (error) {
				console.log(`Loading courses failed: ${error}`);
			}
		}
	}

	handleDeleteCourse = async course => {
		toast.success('Course deleted!');
		try {
			await this.props.actions.deleteCourse(course);
		} catch (error) {
			toast.error(`Delete failed! ${error.message}`, { autoClose: false });
		}
	};

	render() {
		return (
			<>
				<h2>Courses</h2>

				{this.props.loading ? (
					<Spinner />
				) : (
					<>
						<Link
							style={{ marginBottom: 20 }}
							className="btn btn-primary add-course"
							to="/course"
						>
							Add course
						</Link>

						<CourseList
							courses={this.props.courses}
							onDeleteClick={this.handleDeleteCourse}
						/>
					</>
				)}
			</>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		courses: state.courses.map(course => {
			return {
				...course,
				authorName: state.authors?.find(author => author.id === course.authorId)
					?.name
			};
		}),
		authors: state.authors,
		loading: state.apiCallsInProgress > 0
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
			loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
			deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CoursesPage);
