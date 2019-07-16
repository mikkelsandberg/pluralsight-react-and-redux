import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends Component {
	state = {
		course: {
			title: ''
		}
	};

	handleChange = e => {
		const course = { ...this.state.course, title: e.target.value };
		this.setState({ course });
	};

	handleSubmit = e => {
		e.preventDefault();

		this.props.actions.createCourse(this.state.course);
	};

	render() {
		const {
			state: { course },

			handleChange,
			handleSubmit
		} = this;

		return (
			<Fragment>
				<form onSubmit={handleSubmit}>
					<h2>Courses</h2>
					<h3>Add Course</h3>
					<input type="text" onChange={handleChange} value={course.title} />
					<button type="submit">Save</button>
				</form>
				{this.props.courses.map(course => (
					<div key={course.title}>{course.title}</div>
				))}
			</Fragment>
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
