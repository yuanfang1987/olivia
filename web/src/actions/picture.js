import api from '../api'
import actionTypes from './actionTypes'
import {processError, processResponse} from './common'


export function uploadPicture(base64str, desc) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPLOAD_PICTURE_PENDING
        });
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
            } else {
                dispatch({
                    type: actionTypes.UPLOAD_PICTURE_FAIL
                })
            }
        }).catch((err) => {
            processError(err);
            dispatch({
                type: actionTypes.UPLOAD_PICTURE_FAIL
            })
        });
    }
}

export function getAllPictures() {
    console.log('to do, 你来做？');
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_PICTURES_PENDING
        });
        api.getAllPictures().then((response) => {
            console.log('get all pictures response: ', response);
            const err = processResponse(response);
            if (!err) {
                const data = response.data;
                const pictures = (data && data.pictures) ? data.pictures: [];
                dispatch({
                    type: actionTypes.GET_PICTURES_SUCCESS,
                    pictures: pictures
                });
            } else {
                dispatch({
                    type: actionTypes.GET_PICTURES_FAIL
                });
            }
        }).catch(err => {
            console.log('get all pictures fail: ', err);
            dispatch({
                type: actionTypes.GET_PICTURES_FAIL
            });
        })
    }



}
