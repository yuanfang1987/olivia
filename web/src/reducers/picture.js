import actionTypes from '../actions/actionTypes'

const initState = {
    file_path: '',
    loading: false,
    uploadOK: false,
    pictures: []
};

export default function picture(state = initState, action = {}) {
    console.log('jira reducer, get action data: ', action);
    switch (action.type) {
        case actionTypes.UPLOAD_PICTURE_PENDING:
            return {...state, loading: true};
        case actionTypes.UPLOAD_PICTURE_SUCCESS:
            let file_path = action.file_path;
            return {...state, file_path: file_path, loading: false, uploadOK: true};
        case actionTypes.UPLOAD_PICTURE_FAIL:
            return {...state, loading: false};
        case actionTypes.GET_PICTURES_PENDING:
            return {...state, loading: true};
        case actionTypes.GET_PICTURES_SUCCESS:
            let pictures = action.pictures;
            return {...state, pictures: pictures, loading: false};
        case actionTypes.GET_PICTURES_FAIL:
            return {...state, loading: false};
        default:
            return state;
    }
}
