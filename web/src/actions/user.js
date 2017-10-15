import api from '../api'
import actionTypes from './actionTypes'
import {message} from 'antd';
import {loading, processError, processResponse} from './common'

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
                processError(error);
                dispatch({
                    type: actionTypes.REGISTER_ERROR
                });
            });
    }
}

export function login(email, password) {
    return function(dispatch) {
        dispatch(loading(true));
        api.login(email, password)
            .then((response) => {
                console.log('login response: ', response);
                const err = processResponse(response);
                if(!err){
                    console.log('login success');
                    const data = response.data;
                    const user = (data && data.user) ? data.user: null;
                    dispatch({
                        type: actionTypes.LOGIN_SUCCESS,
                        payload: {
                            user
                        }
                    });
                }
                dispatch(loading(false));
            })
            .catch((error) => {
                processError(error);
                dispatch(loading(false));
            })
    }
}

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

export function logout() {
    console.log('enter logout()');
    return function(dispatch) {
        api.logout().then((response) => {
            message.success('已退出！');
            console.log('logout response: ', response);
            dispatch({
                type: actionTypes.LOGOUT_SUCCESS
            });
        }).catch((error) => {
            processError(error);
            dispatch({
                type: actionTypes.LOGOUT
            });
        })
    }
}
