import { combineReducers } from 'redux';

import authors from './authorReducers';
import courses from './courseReducer';

const rootReducer = combineReducers({
	courses,
	authors
});

export default rootReducer;
