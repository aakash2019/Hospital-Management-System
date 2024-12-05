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
  GET_DOCTOR_PATIENTS_REQUEST,
  GET_DOCTOR_PATIENTS_SUCCESS,
  GET_DOCTOR_PATIENTS_FAILURE,
  SET_CURRENT_PATIENT_REQUEST,
  SET_CURRENT_PATIENT_SUCCESS,
  SET_CURRENT_PATIENT_FAILURE,
  GET_PENDING_REQUEST_PATIENT_REQUEST,
  GET_PENDING_REQUEST_PATIENT_SUCCESS,
  GET_PENDING_REQUEST_PATIENT_FAILURE,
  MANAGE_PATIENT_REQUEST_REQUEST,
  MANAGE_PATIENT_REQUEST_SUCCESS,
  MANAGE_PATIENT_REQUEST_FAILURE,
  EDIT_DOCTOR_PROFILE_REQUEST,
  EDIT_DOCTOR_PROFILE_SUCCESS,
  EDIT_DOCTOR_PROFILE_FAILURE,
  ADD_PATIENT_MEDICAL_CONDITIONS_REQUEST,
  ADD_PATIENT_MEDICAL_CONDITIONS_SUCCESS,
  ADD_PATIENT_MEDICAL_CONDITIONS_FAILURE,
} from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  doctorData: null,
  doctors: [],
  patients: [],
  pendingPatients: [],
  patient: [],
  hospitals: [],
  doctorHospitals: [],
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
        error: null,
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
      return { ...state, loading: true, error: null }
    case LOGOUT_DOCTOR_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        doctorData: [],
        doctors: [],
        hospitals: [],
        token: null,
        loading: false,
        error: null
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
      loading: true,
      error: null
    }

    case GET_DOCTOR_HOSPITALS_SUCCESS:
      return {
        ...state,
        loading: false,
        doctorHospitals: action.payload
      }

    case GET_DOCTOR_HOSPITALS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    // GET DOCTOR PATIENTS
    case GET_DOCTOR_PATIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case GET_DOCTOR_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: action.payload
      }

    case GET_DOCTOR_PATIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    // SET CURRENT SELECTED PATIENT
    case SET_CURRENT_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    
    case SET_CURRENT_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patient: action.payload
      }

    case SET_CURRENT_PATIENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    // ADD PATIENT MEDICAL CONDITIONS
    case ADD_PATIENT_MEDICAL_CONDITIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case ADD_PATIENT_MEDICAL_CONDITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        patient: action.payload
      }

    case ADD_PATIENT_MEDICAL_CONDITIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    // GET PENDING REQUEST PATIENT DATA
    case GET_PENDING_REQUEST_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    
    case GET_PENDING_REQUEST_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        pendingPatients: action.payload.patients
      }

    case GET_PENDING_REQUEST_PATIENT_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload
      }

    // MANAGE PATIENT REQUEST
    case MANAGE_PATIENT_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case MANAGE_PATIENT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        doctorData: action.payload
      }

    case MANAGE_PATIENT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    // EDIT DOCTOR DETAILS
    case EDIT_DOCTOR_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case EDIT_DOCTOR_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        doctorData: action.payload
      }

    case EDIT_DOCTOR_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state;
  }
};

export default doctorReducer;
