import {combineReducers} from 'redux';
import auth from './user';
import load from './loading';
import picture from './picture';

const rootReducers = combineReducers({
    load,
    auth,
    picture
});

export default rootReducers;
