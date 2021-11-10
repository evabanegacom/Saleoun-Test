import { combineReducers } from 'redux';
import userReducer from './userReducer';
import studentReducer from './studentReducer';

const rootReducer = combineReducers({
    user: userReducer,
    students: studentReducer,
  });
  
  export default rootReducer;