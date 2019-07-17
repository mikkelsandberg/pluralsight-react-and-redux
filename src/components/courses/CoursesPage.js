import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends Component {
	componentDidMount() {
		this.props.actions.loadCourses().catch(error => {
			console.log(`Loading courses failed: ${error}`);
		});
	}

	render() {
		return (
			<>
				<h2>Courses</h2>
				<CourseList courses={this.props.courses} />
			</>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	courses: state.courses
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(courseActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CoursesPage);
