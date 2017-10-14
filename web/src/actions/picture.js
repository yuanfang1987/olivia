import api from '../api'
import actionTypes from './actionTypes'
import {loading, processError, processResponse} from './common'


export function uploadPicture(base64str, desc) {
    return function (dispatch) {
        dispatch(loading(true));
        api.uploadPicture(base64str, desc).then((response) => {
            console.log('upload picture response: ', response);
            const err = processResponse(response);
            if (!err) {
                const data = response.data;
                const file_path = (data && data.file_path) ? data.file_path: '';
                dispatch({
                    type: actionTypes.UPLOAD_PICTURE_SUCCESS,
                    file_path: file_path
                })
            }
            dispatch(loading(false));
        }).catch((err) => {
            processError(err);
            dispatch(loading(false))
        });
    }
}

export function getAllPictures() {
    console.log('to do, 你来做？');
}
