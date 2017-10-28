import actionTypes from '../actions/actionTypes'

const initialState = {
    user: null,
    status: 'NotStarted',
    message: '',
    loading: false
};

export default function auth(state = initialState, action = {}) {
    console.log('user reduce, get action: ', action);
    switch (action.type) {
        case actionTypes.LOGIN_PENDING:
            return {...state, status: actionTypes.LOGIN_PENDING, loading: true};
        case actionTypes.LOGIN_SUCCESS:
            let user = action.payload.user;
            return {...state, user: user, status: actionTypes.LOGIN_SUCCESS, loading: false};
        case actionTypes.LOGIN_ERROR:
            let msg = action.message;
            return {...state, user: null, loading: false, status: actionTypes.LOGIN_ERROR, message: msg};
        case actionTypes.REGISTER_PENDING:
            return {...state, status: actionTypes.REGISTER_PENDING, loading: true};
        case actionTypes.REGISTER_SUCCESS:
            let u = action.payload.user;
            return {...state, user: u, loading: false, status: actionTypes.REGISTER_SUCCESS};
        case actionTypes.REGISTER_ERROR:
            return {...state, user: null, loading: false, message: '邮箱地址已被注册', status: actionTypes.REGISTER_ERROR};
        case actionTypes.LOGOUT_PENDING:
            return {...state, status: actionTypes.LOGOUT_PENDING};
        case actionTypes.LOGOUT_SUCCESS:
            return {...state, user: null, status: actionTypes.LOGOUT_SUCCESS};
        case actionTypes.LOGOUT_FAIL:
            let msg1 = action.message;
            return {...state, message: msg1, status: actionTypes.LOGOUT_FAIL};
        default:
            return state;
    }
}
