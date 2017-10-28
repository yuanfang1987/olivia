import actionTypes from '../actions/actionTypes'

const initState = {
    file_path: '',
    message: '',
    loading: false,
    pictures: [],
    status: 'NotStarted'
};

export default function picture(state = initState, action = {}) {
    console.log('picture reducer, get action data: ', action);
    switch (action.type) {
        case actionTypes.UPLOAD_PICTURE_PENDING:
            return {...state, loading: true, status: actionTypes.UPLOAD_PICTURE_PENDING};
        case actionTypes.UPLOAD_PICTURE_SUCCESS:
            let file_path = action.file_path;
            return {...state, file_path: file_path, loading: false, status: actionTypes.UPLOAD_PICTURE_SUCCESS};
        case actionTypes.UPLOAD_PICTURE_FAIL:
            return {...state, loading: false, status: actionTypes.UPLOAD_PICTURE_FAIL};
        case actionTypes.GET_PICTURES_PENDING:
            return {...state, loading: true, status: actionTypes.GET_PICTURES_PENDING};
        case actionTypes.GET_PICTURES_SUCCESS:
            let pictures = action.pictures;
            return {...state, pictures: pictures, loading: false, status: actionTypes.GET_PICTURES_SUCCESS};
        case actionTypes.GET_PICTURES_FAIL:
            return {...state, loading: false, pictures: [], status: actionTypes.GET_PICTURES_FAIL};
        case actionTypes.DELETE_PICTURE_PENDING:
            return {...state, loading: true, status: actionTypes.DELETE_PICTURE_PENDING};
        case actionTypes.DELETE_PICTURE_SUCCESS:
            return {...state, loading: false, message:'删除成功', status: actionTypes.DELETE_PICTURE_SUCCESS};
        case actionTypes.DELETE_PICTURE_FAIL:
            let message = action.message;
            return {...state, loading: false, message:message, status: actionTypes.DELETE_PICTURE_FAIL};
        default:
            return state;
    }
}
