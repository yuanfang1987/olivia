import actionTypes from '../actions/actionTypes'

const initState = {
    total: 0,
    issueItems: [],
    filterServeriy: [],
    priorIssu: [],
    typeIssu: [],
    compoIssue: [],
    stateissues:[],
    reporterissues: [],
    assigneesissue: [],
    reopenissues: [],
    rejectedissues: []
};

export default function jira(state = initState, action = {}) {
    console.log('jira reducer, get action data: ', action);
    switch (action.type) {
        case actionTypes.SEARCH_JIRA_ISSUE_SUCCESS:
            let total = action.total;
            let issu = action.issues;
            let serverityissues = action.serveissues;
            let prioris = action.priorissues;
            let typeIssuuu = action.typeissues;
            let compIssue = action.componentissues;
            let stateissues = action.stateissues;
            let reporterissue = action.reporterissues;
            let assigneesissue = action.assigneesissue;
            let reopenissues = action.reopenissues;
            let rejectedissues = action.rejectedissues;
            return {...state, filterServeriy: serverityissues, priorIssu: prioris, typeIssu: typeIssuuu,
                compoIssue: compIssue, issueItems: issu, total: total, stateissues: stateissues,
                reporterissues: reporterissue, assigneesissue: assigneesissue, reopenissues: reopenissues,
                rejectedissues: rejectedissues};
        default:
            return state;
    }
}
