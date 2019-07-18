import { combineReducers } from 'redux';

import apiStatusReducer from './apiStatusReducer';
import authors from './authorReducers';
import courses from './courseReducer';

const rootReducer = combineReducers({
	courses,
	authors,
	apiStatusReducer
});

export default rootReducer;
