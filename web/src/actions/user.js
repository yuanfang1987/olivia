import api from '../api'
import actionTypes from './actionTypes'
import {loading, processError, processResponse} from './common'

/** 注册 */
export function register(email, password, gender, name) {
    return function(dispatch) {
        dispatch({
            type: actionTypes.REGISTER_PENDING
        });
        api.register(email, password, gender, name)
            .then((response) => {
                console.log('register response: ', response);
                const err = processResponse(response);
                if (!err) {
                    const data = response.data;
                    const user = (data && data.user) ? data.user: null;
                    dispatch({
                        type: actionTypes.REGISTER_SUCCESS,
                        payload: {
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: actionTypes.REGISTER_ERROR
                    });
                }
            })
            .catch((error) => {
                console.log('疯了吗 register, get error');
                // processError(error);
                dispatch({
                    type: actionTypes.REGISTER_ERROR
                });
            });
    }
}

/** 登录 */
export function login(email, password) {
    return function(dispatch) {
        dispatch({
            type: actionTypes.LOGIN_PENDING
        });
        api.login(email, password)
            .then((response) => {
                console.log('login response: ', response);
                const err = processResponse(response);
                const data = response.data;
                if(!err){
                    console.log('login success');
                    const user = (data && data.user) ? data.user: null;
                    dispatch({
                        type: actionTypes.LOGIN_SUCCESS,
                        payload: {
                            user
                        }
                    });
                } else {
                    const msg = data.message;
                    dispatch({
                        type: actionTypes.LOGIN_ERROR,
                        message: msg
                    })
                }
            })
            .catch((error) => {
                processError(error);
                dispatch({
                    type: actionTypes.LOGIN_ERROR,
                    message: error
                });
            })
    }
}

/** 此方法未使用，预留 */
export function me() {
    console.log('enter me()');
    return function(dispatch) {
        api.me().then((response) => {
                console.log('get me info resp: ', response);
            }
        ).catch((error) => {
            processError(error);
            dispatch(loading(false));
        })
    }
}

/** 登出 */
export function logout() {
    console.log('enter logout()');
    return function(dispatch) {
        dispatch({
            type: actionTypes.LOGOUT_PENDING
        });
        api.logout().then((response) => {
            console.log('logout response: ', response);
            const data = response.data;
            const err = processResponse(response);
            if (!err) {
                dispatch({
                    type: actionTypes.LOGOUT_SUCCESS
                })
            } else {
                const msg = data.message;
                dispatch({
                    type: actionTypes.LOGOUT_FAIL,
                    message: msg
                })
            }
        }).catch((error) => {
            processError(error);
            dispatch({
                type: actionTypes.LOGOUT_FAIL,
                message: error
            });
        })
    }
}
