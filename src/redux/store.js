import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import doctorReducer from './reducers/doctorReducer';
import hospitalReducer from './reducers/hospitalReducer';
import patientReducer from './reducers/patientReducer';
import adminReducer from './reducers/adminReducer';

const rootReducer = combineReducers({
  doctor: doctorReducer,
  hospital: hospitalReducer,
  patient: patientReducer,
  admin: adminReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;