import axios from 'axios';
import { API } from '../../backend';
import { 
    SIGNUP_PATIENT_REQUEST,
    SIGNUP_PATIENT_SUCCESS,
    SIGNUP_PATIENT_FAILURE,
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
    EDIT_PATIENT_DETAILS_FAILURE,
    EDIT_PATIENT_DETAILS_SUCCESS
 } from '../actionTypes';

// SIGNUP PATIENT
export const signupPatient = (patientData) => async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_PATIENT_REQUEST });
      const response = await axios.post(`${API}/api/patient/signup`, patientData);
      dispatch({ type: SIGNUP_PATIENT_SUCCESS, payload: response.data });
      return true;
    } catch (error) {
      dispatch({ type: SIGNUP_PATIENT_FAILURE, payload: error.message });
      return false;
    }
};

export const loginPatient = (patientData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_PATIENT_REQUEST });
        const response = await axios.post(`${API}/api/patient/login`, patientData);


        localStorage.setItem('token', response.data.token);
        localStorage.setItem('patientData', response.data.patient);


        dispatch({ type: LOGIN_PATIENT_SUCCESS, payload: response.data });
        return { success: true, message: response.data.message }

        
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        dispatch({ type: LOGIN_PATIENT_FAILURE, payload: errorMessage });
        return { success: false, message: errorMessage };

    }
}

export const logoutPatient = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_PATIENT_REQUEST });
        
        // Clear any stored tokens or data from localStorage/sessionStorage
        localStorage.removeItem('token');
        localStorage.removeItem('patientData');

        dispatch({ type: LOGOUT_PATIENT_SUCCESS});
        return true;
    } catch (error) {
        dispatch({ type: LOGOUT_PATIENT_FAILURE, payload: error.message });
        return false;
    }
}

// GET ALL DOCTORS
export const getAllDoctors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_DOCTORS_REQUEST });

    const response = await axios.get(`${API}/api/patient/doctors`);
    
    dispatch({ type: GET_ALL_DOCTORS_SUCCESS, payload: response.data.doctors } );
    return true;
  } catch (error) {
    dispatch({ type: GET_ALL_DOCTORS_FAILURE, payload: error.message });
    // console.log(error);
    return false;
  }
}
  
// GET DOCTOR HOSPITALS
export const getDoctorHospitals = (doctorId) => async (dispatch) => {
  try {
    dispatch({ type: GET_DOCTOR_HOSPITALS_REQUEST });
    const response = await axios.get(`${API}/api/doctor/${doctorId}/hospitals`);

    dispatch({ type: GET_DOCTOR_HOSPITALS_SUCCESS, payload: response.data.hospitals });
  } catch (error) {
    dispatch({ type: GET_DOCTOR_HOSPITALS_FAILURE, payload: error.message });
  }
}

// SET DETAILS OF SELECTED DOCTOR
export const setDoctor = (doctorId) => async (dispatch) => {
  try {
    dispatch({ type: SET_CURRENT_DOCTOR_REQUEST });

    const response = await axios.get(`${API}/api/patient/doctor/${doctorId}`)
    
    dispatch({ type: SET_CURRENT_DOCTOR_SUCCESS, payload: response.data.doctor });
  } catch (error) {
    dispatch({ type: SET_CURRENT_DOCTOR_FAILURE, payload: error.message });
  }
}

// SEND REQUEST TO DOCTOR
export const sendRequest = (patientId, doctorId) => async (dispatch) => {
  try {
    dispatch({ type: SEND_REQUEST_TO_DOCTOR_REQUEST});

    const bodyData = { "doctorId": doctorId, "patientId": patientId }
    const response = await axios.post(`${API}/api/patient/request/${doctorId}`, bodyData);

    dispatch({type: SEND_REQUEST_TO_DOCTOR_SUCCESS, payload: response.data });
    
    return {
      success: true,
      message: response.data.message
    }
  } catch (error) {
    const errorMessage = error.message || 'Something went wrong';
    
    dispatch({ type: SEND_REQUEST_TO_DOCTOR_FAILURE, payload: error.message });
    return {
      success: false,
      message: errorMessage
    }
  }
};

// EDIT PATIENT DETAILS
export const editPatientDetails = (patientId, formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PATIENT_DETAILS_REQUEST });

    const response = await axios.put(`${API}/api/patient/${patientId}`, formData)

    dispatch({ type: EDIT_PATIENT_DETAILS_SUCCESS, payload: response.data.patient });
    
    return {
      success: true,
      message: response.data.message
    }
  } catch (error) {
    const errorMessage = error.message || 'Something went wrong';
    dispatch({ type: EDIT_PATIENT_DETAILS_FAILURE, payload: error.message});
    return {
      success: false,
      message: errorMessage
    }
  }
}