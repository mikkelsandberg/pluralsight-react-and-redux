import * as authorApi from '../../api/authorApi';
import * as types from './actionTypes';

export const loadAuthorsSuccess = authors => ({
	type: types.LOAD_AUTHORS_SUCCESS,
	authors
});

export const loadAuthors = () => {
	return async dispatch => {
		try {
			const authors = await authorApi.getAuthors();
			dispatch(loadAuthorsSuccess(authors));
		} catch (error) {
			throw error;
		}
	};
};
