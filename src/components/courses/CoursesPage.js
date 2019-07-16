import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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

		this.props.dispatch(courseActions.createCourse(this.state.course));
	};

	render() {
		const {
			state: { course },

			handleChange,
			handleSubmit
		} = this;

		return (
			<form onSubmit={handleSubmit}>
				<h2>Courses</h2>
				<h3>Add Course</h3>
				<input type="text" onChange={handleChange} value={course.title} />
				<button type="submit">Save</button>
			</form>
		);
	}
}

CoursesPage.propTypes = {
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	courses: state.courses
});

export default connect(mapStateToProps)(CoursesPage);
