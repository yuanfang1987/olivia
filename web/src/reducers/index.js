import {combineReducers} from 'redux';
import auth from './user'
import jira from './jira'
import load from './loading'
import picture from './picture'

const rootReducers = combineReducers({
    load,
    auth,
    jira,
    picture
});

export default rootReducers;
