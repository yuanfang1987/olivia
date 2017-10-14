import {message} from 'antd';
import actionTypes from './actionTypes';

export const actionCodes = {
	FAIL: 0,
	OK: 1,
	NOT_LOGIN: 401
};

export function processResponse(resp) {
	// console.log('processResponse', resp);
	if (typeof resp.data.res_code === 'number' && resp.data.res_code !== actionCodes.OK) {
		// dispatch(error(resp.data.res_code, resp.data.message));
		message.error(resp.data.message);
		return true;
	}
	// dispatch(error(actionCodes.OK, null));
	return false;
}

export function processError(err) {
	console.log('processError', err);
	if (err) {
		message.error('Failed to connect server, please try later.');
		return true;
	}
}

export function loading(enabled) {
	return {
		type: actionTypes.LOADING,
		loading: enabled
	}
}

export function error(errorCode = 0, message = "") {
	return {
		type: actionTypes.ERROR,
		errorCode: errorCode,
		hasError: errorCode !== actionCodes.OK,
		message: message
	};
}

// export function search(queryConditions = {}, searchAPI, actionType) {
// 	let name = actionType;
// 	return function (dispatch) {
// 		dispatch(loading(true));
// 		searchAPI(queryConditions)
// 			.then((response) => {
// 				console.log(" search queryConditions  ", response);
// 				var hasError = processResponse(response);
// 				if (!hasError) {
// 					const data = response.data;
// 					const items = (data && data.items) ? data.items : [];
// 					dispatch({
// 						type: name,
// 						items: items,
// 						searchTotalCount: data.search_total_count
// 					});
// 				}
// 				dispatch(loading(false));
// 			})
// 			.catch((error) => {
// 				processError(error);
// 				dispatch(loading(false));
// 			});
// 	};
// }
