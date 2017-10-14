import actionTypes from '../actions/actionTypes'


const initState = {
    loading: false
};

export default function loading(state = initState, action = {}) {
    console.log('loading reducer, get action data: ', action);
    switch (action.type) {
        case actionTypes.LOADING:
            let load = action.loading;
            return {...state, loading: load};
        default:
            return state;
    }
}
