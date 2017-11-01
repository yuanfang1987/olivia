import api from '../api'
import actionTypes from './actionTypes'
import {processError, processResponse} from './common'


export function uploadPicture(base64str, desc) {
    return function (dispatch) {
        /** 更新store状态，通知页面上的上传图片的按钮处理 loading 状态 */
        dispatch({
            type: actionTypes.UPLOAD_PICTURE_PENDING
        });
        /** 把相关数据发给服务器 */
        api.uploadPicture(base64str, desc).then((response) => {
            console.log('upload picture response: ', response);
            const err = processResponse(response);
            /** 如果服务器返回结果正确，则通知页面图片已上传成功 */
            if (!err) {
                const data = response.data;
                const file_path = (data && data.file_path) ? data.file_path: '';
                dispatch({
                    type: actionTypes.UPLOAD_PICTURE_SUCCESS,
                    file_path: file_path
                })
                /** 如果服务器返回结果失败，则通知页面上图失败 */
            } else {
                dispatch({
                    type: actionTypes.UPLOAD_PICTURE_FAIL
                })
            }
            /** 如果网络请求出错，则通知页面上传失败 */
        }).catch((err) => {
            processError(err);
            dispatch({
                type: actionTypes.UPLOAD_PICTURE_FAIL
            })
        });
    }
}

export function getAllPictures() {
    return function (dispatch) {
        /** 通知照片墙页面，图片正在获取中... */
        dispatch({
            type: actionTypes.GET_PICTURES_PENDING
        });
        /** 开始向服务器请求当前用户的图片列表 */
        api.getAllPictures().then((response) => {
            console.log('get all pictures response: ', response);
            const err = processResponse(response);
            /** 如果服务器返回结果正确，则把图片列表更新到页面 */
            if (!err) {
                const data = response.data;
                const pictures = (data && data.pictures) ? data.pictures: [];
                dispatch({
                    type: actionTypes.GET_PICTURES_SUCCESS,
                    pictures: pictures
                });
                /** 如果服务器返回结果失败，则通知页面获取图片列表失败 */
            } else {
                dispatch({
                    type: actionTypes.GET_PICTURES_FAIL
                });
            }
            /** 如果网络出问题，则通知页面获取图片列表失败 */
        }).catch(err => {
            console.log('get all pictures fail: ', err);
            dispatch({
                type: actionTypes.GET_PICTURES_FAIL
            });
        })
    }
}

export function deletePictures(picture_paths) {
    return function (dispatch) {
        /** 用于通知页面照片正在删除中... */
        dispatch({
            type: actionTypes.DELETE_PICTURE_PENDING
        });
        /** 向服务器提交数据，告诉服务器要删除哪些照片 */
        api.deletePictures(picture_paths).then((response) => {
            console.log('delete pictures response: ', response);
            const err = processResponse(response);
            if (!err) {
                const data = response.data;
                const message = (data && data.message) ? data.message: '';
                dispatch({
                    type: actionTypes.DELETE_PICTURE_SUCCESS,
                    message: message
                });
                /** 删除成功后，要重新获取照片列表 */
                api.getAllPictures().then(response => {
                    const err = processResponse(response);
                    if (!err) {
                        const data = response.data;
                        const pictures = (data && data.pictures) ? data.pictures: [];
                        dispatch({
                            type: actionTypes.GET_PICTURES_SUCCESS,
                            pictures: pictures
                        });
                    }
                }).catch(err => {
                    console.log('get pictures fail: ', err);
                })
            } else {
                dispatch({
                    type: actionTypes.DELETE_PICTURE_FAIL,
                    message: 'delete fail'
                })
            }
        }).catch(err => {
            console.log('delete pictures fail: ', err);
            dispatch({
                type: actionTypes.DELETE_PICTURE_FAIL,
                message: err
            })
        })
    }
}
