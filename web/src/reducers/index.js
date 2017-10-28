import {combineReducers} from 'redux';
import user from './user';
import picture from './picture';

const rootReducers = combineReducers({
    user,
    picture
});

export default rootReducers;
