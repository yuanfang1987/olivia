import actionTypes from '../actions/actionTypes'

const initState = {
    file_path: ''
};

export default function picture(state = initState, action = {}) {
    console.log('jira reducer, get action data: ', action);
    switch (action.type) {
        case actionTypes.UPLOAD_PICTURE_SUCCESS:
            let file_path = action.file_path;
            return {...state, file_path: file_path};
        default:
            return state;
    }
}
