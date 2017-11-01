import {message} from 'antd';
import actionTypes from './actionTypes';

export const actionCodes = {
	FAIL: 0,
	OK: 1,
	NOT_LOGIN: 401
};

/** 预处理函数，用于先判断服务器返回的json数据中， res_code 是否为 1 */
export function processResponse(resp) {
	if (typeof resp.data.res_code === 'number' && resp.data.res_code !== actionCodes.OK) {
		message.error(resp.data.message);
		return true;
	}
	return false;
}

/** 用于处理当服务器返回结果出错时的错误信息 */
export function processError(err) {
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
