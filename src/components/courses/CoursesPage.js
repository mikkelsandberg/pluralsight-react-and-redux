import React, { Component } from 'react';

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

		alert(this.state.course.title);
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

export default CoursesPage;
