import { combineReducers } from 'redux';
import doctorReducer from './doctorReducer';
import hospitalReducer from './hospitalReducer';

export default combineReducers({
  doctor: doctorReducer,
  hospital: hospitalReducer,
});