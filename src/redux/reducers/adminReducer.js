import { 
  CHECK_ADMIN_REQUEST,
  CHECK_ADMIN_SUCCESS,
  CHECK_ADMIN_FAILURE,
  SIGNUP_ADMIN_REQUEST,
  SIGNUP_ADMIN_SUCCESS,
  SIGNUP_ADMIN_FAILURE,
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  LOGOUT_ADMIN_REQUEST,
  LOGOUT_ADMIN_SUCCESS,
  LOGOUT_ADMIN_FAILURE,
  GET_ALL_DOCTORS_REQUEST,
  GET_ALL_DOCTORS_SUCCESS,
  GET_ALL_DOCTORS_FAILURE,
  ADD_DOCTOR_REQUEST,
  ADD_DOCTOR_SUCCESS,
  ADD_DOCTOR_FAILURE,
  GET_HOSPITALS_REQUEST,
  GET_HOSPITALS_SUCCESS,
  GET_HOSPITALS_FAILURE,
  ADD_HOSPITAL_REQUEST,
  ADD_HOSPITAL_SUCCESS,
  ADD_HOSPITAL_FAILURE,
  EDIT_HOSPITAL_REQUEST,
  EDIT_HOSPITAL_SUCCESS,
  EDIT_HOSPITAL_FAILURE,
  DELETE_HOSPITAL_REQUEST,
  DELETE_HOSPITAL_SUCCESS,
  DELETE_HOSPITAL_FAILURE,
  SET_CURRENT_DOCTOR_REQUEST,
  SET_CURRENT_DOCTOR_SUCCESS,
  SET_CURRENT_DOCTOR_FAILURE,
  ADD_INITIAL_HOSPITALS_REQUEST,
  ADD_INITIAL_HOSPITALS_SUCCESS,
  ADD_INITIAL_HOSPITALS_FAILURE
} from '../actionTypes';

const initialState = {
    isAuthenticated: false,
    adminData: null,
    doctors: [],
    doctorData: [],
    hospitals: [], 
    token: null,
    adminExists: false,
    loading: false,
    error: null
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      
      // CHECK ADMIN IF EXISTS
      case CHECK_ADMIN_REQUEST:
        return { ...state, loading: true, error: null };
      case CHECK_ADMIN_SUCCESS:
        return { ...state, loading: false, adminExists: action.payload.exists };
      case CHECK_ADMIN_FAILURE:
        return { ...state, loading: false, error: action.payload };

    // SIGNUP ADMIN
    case SIGNUP_ADMIN_REQUEST:
      return { ...state, loading: true, error: null };
    case SIGNUP_ADMIN_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        adminData: action.payload, 
        isAuthenticated: true, 
        token: action.payload.token 
      };
    case SIGNUP_ADMIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // LOGIN ADMIN
    case LOGIN_ADMIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_ADMIN_SUCCESS:
      return { 
        ...state, 
        loading: false,
        adminData: action.payload.admin,
        isAuthenticated: true, 
        token: action.payload.token
       };
    case LOGIN_ADMIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    // LOGOUT ADMIN
    case LOGOUT_ADMIN_REQUEST:
      return { ...state, loading: true, error: null }
    case LOGOUT_ADMIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        adminData: null,
        token: null,
        loading: false,
        error: null
      };
    case LOGOUT_ADMIN_FAILURE:
      return { ...state, loading:false, error: action.payload }

    // ADD INITIAL HOSPITALS
    case ADD_INITIAL_HOSPITALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case ADD_INITIAL_HOSPITALS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        hospitals: action.payload
      }

    case ADD_INITIAL_HOSPITALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

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
            doctorData: action.payload
        }    

    case SET_CURRENT_DOCTOR_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload
        }

    // ADD DOCTOR TO HOSPITAL
    case ADD_DOCTOR_REQUEST:
      return { ...state, loading: true, error: null }
    case ADD_DOCTOR_SUCCESS:
      return {
        ...state, loading: false
      };
    case ADD_DOCTOR_FAILURE:
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

      // ADD HOSPITAL
    case ADD_HOSPITAL_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };

      case ADD_HOSPITAL_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          hospitals: [...state.hospitals, action.payload] 
        };
  
      
    case ADD_HOSPITAL_FAILURE:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };

    // EDIT HOSPITAL
    case EDIT_HOSPITAL_REQUEST:
      return {
        ...state, 
        loading: true, 
        error: null 
      };

    case EDIT_HOSPITAL_SUCCESS:
      return {
        ...state,
        loading: false,
        hospitals: state.hospitals.map((hospital) =>
          hospital._id === action.payload._id ? action.payload : hospital
        ),
      };

    case EDIT_HOSPITAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // DELETE HOSPITAL
    case DELETE_HOSPITAL_REQUEST:
      return {
        ...state, 
        loading: true, 
        error: null 
      };
    
    case DELETE_HOSPITAL_SUCCESS:
      return {
        ...state,
        loading: false,
        hospitals: state.hospitals.filter(hospital => hospital._id !== action.payload), 
      };

    case DELETE_HOSPITAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

  
    // DEFAULT
    default:
        return state;
    }
  };
  
  export default adminReducer;
  