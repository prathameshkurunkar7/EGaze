import { combineReducers } from 'redux';
import eventReducer from '../reducers/eventReducer';
import errorReducer from '../reducers/errorReducer';

export default combineReducers({
    eventReducer
});