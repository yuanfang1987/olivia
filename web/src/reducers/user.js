import actionTypes from '../actions/actionTypes'

const initialState = {
    user: null,
    loggingIn: false,
    loggingOut: false,
    loginErrors: null
};

export default function auth(state = initialState, action = {}) {
    console.log('user reduce, get action data: ', action.payload);
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            let user = action.payload.user;
            return {...state, user: user, loggingIn: false, loginErrors: null};
        case actionTypes.LOGIN_ERROR:
            return {...state, user: null, loggingIn: false, loginErrors: action.payload.data.message};
        case actionTypes.REGISTER_SUCCESS:
            let ua = action.payload.data;
            return {...state, user: ua, loggingIn: false, loginErrors: null};
        case actionTypes.REGISTER_ERROR:
            return {...state, user: null, loggingIn: false, loginErrors: action.payload.data.message};
        default:
            return state;
    }
}
