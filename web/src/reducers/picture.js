import actionTypes from '../actions/actionTypes'

const initState = {
    file_path: '',
    message: '',
    loading: false,
    uploadOK: false,
    pictures: []
};

export default function picture(state = initState, action = {}) {
    console.log('picture reducer, get action data: ', action);
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
            return {...state, loading: false, pictures: []};
        case actionTypes.DELETE_PICTURE_PENDING:
            return {...state, loading: true};
        case actionTypes.DELETE_PICTURE_SUCCESS:
            return {...state, loading: false, message:'删除成功'};
        case actionTypes.DELETE_PICTURE_FAIL:
            let message = action.message;
            return {...state, loading: false, message:message};
        default:
            return state;
    }
}
