import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) === '_SUCCESS';
}

export default function apiStatusReducer(
	apiStatusState = initialState.apiCallsInProgress,
	action
) {
	if (action.type === types.BEGIN_API_CALL) {
		return apiStatusState + 1;
	} else if (actionTypeEndsInSuccess(action.type)) {
		return apiStatusState - 1;
	}
	return apiStatusState;
}
