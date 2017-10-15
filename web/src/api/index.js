import startsWith from 'lodash/startsWith';
import axios from 'axios';

const client = axios.create({
    timeout: 180000
});

const API_URL = '/v1/';

function toApi() {
    const args = Array.prototype.slice.call(arguments);
    return API_URL + args.join('/');
}

function httpCall(url, method, headers, body) {
    return client.request({
        url,
        method,
        data: body,
        headers,
        responseType: 'json'
    });
}

function get(url, headers) {
    const fullUrl = startsWith(url, 'http') ? url : toApi(url);
    return httpCall(fullUrl, 'GET', headers);
}

function post(url, data, headers) {
    const fullUrl = startsWith(url, 'http') ? url : toApi(url);
    return httpCall(fullUrl, 'POST', headers, data);
}

function del(url, headers) {
    const fullUrl = startsWith(url, 'http') ? url : toApi(url);
    return httpCall(fullUrl, 'DELETE', headers);
}

export default {
    login(email, password) {
        return post('user/login', {email, password});
    },

    logout() {
        return del('user/logout');
    },

    register(email, password) {
        return post('user/register', {email, password});
    },

    me() {
        return get('user/me');
    },

    getJiraIssues(project_id, start_date, end_date) {
        return post('jira/issues', {project_id, start_date, end_date});
    },

    filterIssues(project_id) {
        return post('jira/filter-issues', {project_id});
    },

    uploadPicture(base64str, desc) {
        return post('/picture/upload', {base64str, desc});
    },

    getAllPictures() {
        return get('/picture/all');
    },

}
