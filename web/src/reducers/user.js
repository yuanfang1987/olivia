import actionTypes from '../actions/actionTypes'

const initialState = {
    user: null,
    loggingIn: false,
    loggingOut: false,
    loginErrors: null,
    logoutOK: false,
    status: 'NotStarted',
    logout_status: 'NotStarted',
    message: ''
};

export default function auth(state = initialState, action = {}) {
    console.log('user reduce, get action data: ', action.payload);
    switch (action.type) {
        case actionTypes.LOGIN_PENDING:
            return {...state, status: 'InProgress'};
        case actionTypes.LOGIN_SUCCESS:
            let user = action.payload.user;
            return {...state, user: user, loggingIn: false, loginErrors: null, status: 'Success'};
        case actionTypes.LOGIN_ERROR:
            return {...state, user: null, loggingIn: false, loginErrors: action.payload.data.message, status: 'Fail'};
        case actionTypes.REGISTER_PENDING:
            return {...state, status: 'InProgress'};
        case actionTypes.REGISTER_SUCCESS:
            let u = action.payload.user;
            return {...state, user: u, loggingIn: false, loginErrors: null, status: 'Success'};
        case actionTypes.REGISTER_ERROR:
            return {...state, user: null, loggingIn: false, loginErrors: '邮箱地址已被注册过!', status: 'Fail'};
        case actionTypes.LOGOUT_PENDING:
            return {...state, logout_status: 'InProgress'};
        case actionTypes.LOGOUT_SUCCESS:
            return {...state, logoutOK: true, user: null,  logout_status: 'Success'};
        case actionTypes.LOGOUT_FAIL:
            let msg = action.message;
            return {...state, message: msg, logout_status: 'Fail'};
        default:
            return state;
    }
}
