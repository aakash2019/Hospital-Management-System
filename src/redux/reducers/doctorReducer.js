import {
  SIGNUP_DOCTOR_REQUEST,
  SIGNUP_DOCTOR_SUCCESS,
  SIGNUP_DOCTOR_FAILURE,
  LOGIN_DOCTOR_REQUEST,
  LOGIN_DOCTOR_SUCCESS,
  LOGIN_DOCTOR_FAILURE,
  LOGOUT_DOCTOR_REQUEST,
  LOGOUT_DOCTOR_SUCCESS,
  LOGOUT_DOCTOR_FAILURE,
  GET_HOSPITALS_REQUEST,
  GET_HOSPITALS_SUCCESS,
  GET_HOSPITALS_FAILURE,
  GET_DOCTOR_HOSPITALS_REQUEST,
  GET_DOCTOR_HOSPITALS_SUCCESS,
  GET_DOCTOR_HOSPITALS_FAILURE,
} from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  doctorData: null,
  doctors: [],
  hospitals: [],
  token: null,
  loading: false,
  error: null
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    // SIGNUP DOCTOR
    case SIGNUP_DOCTOR_REQUEST:
      return { 
        ...state, 
        loading: true 
      };
    case SIGNUP_DOCTOR_SUCCESS:
      return { 
        ...state, 
        doctorData: action.payload.doctor, 
        isAuthenticated: true,
        token: action.payload.token,
        loading: false 
      };
    case SIGNUP_DOCTOR_FAILURE:
      return { 
        ...state, 
        error: action.payload, 
        loading: false 
      };

    // LOGIN DOCTOR
    case LOGIN_DOCTOR_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_DOCTOR_SUCCESS:
      return { 
        ...state, 
        loading: false,
        doctorData: action.payload.doctor,
        isAuthenticated: true, 
        token: action.payload.token
       };
    case LOGIN_DOCTOR_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    // LOGOUT DOCTOR
    case LOGOUT_DOCTOR_REQUEST:
      return { ...state, loading: true }
    case LOGOUT_DOCTOR_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        doctorData: null,
        token: null,
      };
    case LOGOUT_DOCTOR_FAILURE:
      return { ...state, loading:false, error: action.payload }
    
    // GET HOSPITALS
    case GET_HOSPITALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      
    case GET_HOSPITALS_SUCCESS:
      return {
        ...state,
        loading: false,
        hospitals: action.payload, 
      };
      
    case GET_HOSPITALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Set error message
      };

    // GET DOCTOR HOSPITALS
    case GET_DOCTOR_HOSPITALS_REQUEST:
    return {
      ...state,
      loading: true
    }

    case GET_DOCTOR_HOSPITALS_SUCCESS:
      return {
        ...state,
        loading: false,
        hospitals: action.payload
      }

    case GET_DOCTOR_HOSPITALS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
};

export default doctorReducer;
