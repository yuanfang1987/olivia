import api from '../api'
import actionTypes from './actionTypes'
import {loading, processError, processResponse} from './common'

export function register(email, password) {
    return function(dispatch) {
        dispatch(loading(true));
        api.register(email, password)
            .then((response) => {
                console.log('register response: ', response);
                const data = response.data;
                dispatch({
                    type: actionTypes.REGISTER_SUCCESS,
                    payload: {
                        data
                    }
                });
                dispatch(loading(false));
            })
            .catch((error) => {
                processError(error);
                dispatch(loading(false));
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
            console.log('logout response: ', response);
        }).catch((error) => {
            processError(error);
            dispatch(loading(false));
        })
    }
}
