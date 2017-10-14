import api from '../api'
import actionTypes from './actionTypes'
import {loading, processError, processResponse} from './common'

export function getJiraIssue(project_id, start_date, end_date) {
    return function (dispatch) {
        dispatch(loading(true));
        api.getJiraIssues(project_id, start_date, end_date)
            .then((response) => {
                console.log('get jira issues response: ', response);
                const err = processResponse(response);
                if (!err) {
                    const data = response.data;
                    const issues = (data && data.issues) ? data.issues : [];
                    const filterissues = (data && data.serverityissues) ? data.serverityissues: [];
                    const priorissues = (data && data.priorityissues) ? data.priorityissues: [];
                    const typeissues = (data && data.typeissues) ? data.typeissues: [];
                    const componentissues = (data && data.componentissues) ? data.componentissues: [];
                    const total = (data && data.total) ? data.total: 0;
                    const stateissues = (data && data.stateissues) ? data.stateissues: [];
                    const reporterissues = (data && data.reportersissue) ? data.reportersissue: [];
                    const assigneesissue = (data && data.assigneesissue) ? data.assigneesissue: [];
                    const reopenissues = (data && data.reopenissues) ? data.reopenissues: [];
                    const rejectedissues = (data && data.rejectedissues) ? data.rejectedissues: [];
                    dispatch({
                        type: actionTypes.SEARCH_JIRA_ISSUE_SUCCESS,
                        total: total,
                        issues: issues,
                        serveissues: filterissues,
                        priorissues: priorissues,
                        typeissues: typeissues,
                        componentissues: componentissues,
                        stateissues: stateissues,
                        reporterissues: reporterissues,
                        assigneesissue: assigneesissue,
                        reopenissues: reopenissues,
                        rejectedissues: rejectedissues
                    });
                }
                dispatch(loading(false));
            })
            .catch((error) => {
                processError(error);
                dispatch(loading(false))
            });
    }
}

export function getJiraProjects() {
    console.log('to do ......ha ha.')
}

export function filterJiraIssue(project_id) {
    return function (dispatch) {
        dispatch(loading(true));
        api.filterIssues(project_id)
            .then((response) => {
                console.log('filter jira issues response: ', response);
                const err = processResponse(response);
                if (!err) {
                    const data = response.data;
                    const filterissues = (data && data.serverityissues) ? data.serverityissues: [];
                    const priorissues = (data && data.priorityissues) ? data.priorityissues: [];
                    const typeissues = (data && data.typeissues) ? data.typeissues: [];
                    const componentissues = (data && data.componentissues) ? data.componentissues: [];
                    dispatch({
                        type: actionTypes.SEARCH_JIRA_ISSUE_SUCCESS,
                        serveissues: filterissues,
                        priorissues: priorissues,
                        typeissues: typeissues,
                        componentissues: componentissues
                    });
                }
                dispatch(loading(false))
            })
            .catch((error) => {
                processError(error);
                dispatch(loading(false));
            });
    }
}
