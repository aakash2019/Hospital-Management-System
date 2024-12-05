import { 
    SIGNUP_PATIENT_FAILURE, 
    SIGNUP_PATIENT_REQUEST, 
    SIGNUP_PATIENT_SUCCESS,
    LOGIN_PATIENT_REQUEST,
    LOGIN_PATIENT_SUCCESS,
    LOGIN_PATIENT_FAILURE,
    LOGOUT_PATIENT_REQUEST,
    LOGOUT_PATIENT_SUCCESS,
    LOGOUT_PATIENT_FAILURE,
    GET_ALL_DOCTORS_REQUEST,
    GET_ALL_DOCTORS_SUCCESS,
    GET_ALL_DOCTORS_FAILURE,
    GET_DOCTOR_HOSPITALS_REQUEST,
    GET_DOCTOR_HOSPITALS_SUCCESS,
    GET_DOCTOR_HOSPITALS_FAILURE,
    SET_CURRENT_DOCTOR_REQUEST,
    SET_CURRENT_DOCTOR_SUCCESS,
    SET_CURRENT_DOCTOR_FAILURE,
    SEND_REQUEST_TO_DOCTOR_REQUEST,
    SEND_REQUEST_TO_DOCTOR_SUCCESS,
    SEND_REQUEST_TO_DOCTOR_FAILURE,
    EDIT_PATIENT_DETAILS_REQUEST,
    EDIT_PATIENT_DETAILS_SUCCESS,
    EDIT_PATIENT_DETAILS_FAILURE
 } from "../actionTypes";

const initialState = {
    isAuthenticated: false,
    patientData: null,
    doctors: [],
    doctor: [],
    doctorHospitals: [],
    token: null,
    loading: false,
    error: null
};


const patientReducer = (state = initialState, action) => {
    switch (action.type) {

        // SIGNUP PATIENT
        case SIGNUP_PATIENT_REQUEST:
        return {
            ...state,
            loading: true,
            error: null
        };
        case SIGNUP_PATIENT_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                patientData: action.payload,
                token: action.payload.token,
                error: null
            }
        case SIGNUP_PATIENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
      
      // LOGIN PATIENT
        case LOGIN_PATIENT_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_PATIENT_SUCCESS:
            return { 
                ...state, 
                loading: false,
                patientData: action.payload.patient,
                isAuthenticated: true, 
                token: action.payload.token
            };
        case LOGIN_PATIENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        
        // LOGOUT PATIENT
        case LOGOUT_PATIENT_REQUEST:
            return { ...state, loading: true, error: null }
        case LOGOUT_PATIENT_SUCCESS:
            return {
            ...state,
            isAuthenticated: false,
            patientData: null,
            doctors: [],
            token: null,
            loading: false,
            error: null
        };
        case LOGOUT_PATIENT_FAILURE:
        return { ...state, loading:false, error: action.payload }
    
      // GET ALL DOCTORS
        case GET_ALL_DOCTORS_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_ALL_DOCTORS_SUCCESS:
            return {
          ...state,
          doctors: action.payload,
          loading: false
        };
        case GET_ALL_DOCTORS_FAILURE:
            return { ...state, loading:false, error: action.payload }
    

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

        //   SET DOCTOR DETAILS
        case SET_CURRENT_DOCTOR_REQUEST:
            return {
                ...state, 
                loading: true,
                error: null
            }

        case SET_CURRENT_DOCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                doctor: action.payload
            }

        case SET_CURRENT_DOCTOR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

            // SEND REQUEST TO DOCTOR
        case SEND_REQUEST_TO_DOCTOR_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case SEND_REQUEST_TO_DOCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case SEND_REQUEST_TO_DOCTOR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        // EDIT PATIENT DETAILS
        case EDIT_PATIENT_DETAILS_REQUEST:
            return {
                ...state,
                loadin: true,
                error: null
            }

        case EDIT_PATIENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                patientData: action.payload
            }

        case EDIT_PATIENT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
  };
  
  export default patientReducer;
  