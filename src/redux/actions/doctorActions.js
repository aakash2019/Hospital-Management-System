import axios from 'axios';
import { API } from '../../backend';
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
  EDIT_PATIENT_MEDICAL_CONDITIONS_REQUEST,
  EDIT_PATIENT_MEDICAL_CONDITIONS_SUCCESS,
  EDIT_PATIENT_MEDICAL_CONDITIONS_FAILURE,
  DELETE_PATIENT_MEDICAL_CONDITIONS_REQUEST,
  DELETE_PATIENT_MEDICAL_CONDITIONS_SUCCESS,
  DELETE_PATIENT_MEDICAL_CONDITIONS_FAILURE,
} from '../actionTypes'

// SIGNUP DOCTOR
export const signupDoctor = (doctorData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_DOCTOR_REQUEST });
    const response = await axios.post(`${API}/api/doctor/signup`, doctorData);
    dispatch({ type: SIGNUP_DOCTOR_SUCCESS, payload: response.data });
    return true;
  } catch (error) {
    dispatch({ type: SIGNUP_DOCTOR_FAILURE, payload: error.message });
    return false;
  }
};

// LOGIN DOCTOR
export const loginDoctor = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_DOCTOR_REQUEST });
    const response = await axios.post(`${API}/api/doctor/login`, credentials);
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('doctorData', response.data.doctor);

    dispatch({ type: LOGIN_DOCTOR_SUCCESS, payload: response.data });
    return { success: true, message: response.data.message };

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    dispatch({ type: LOGIN_DOCTOR_FAILURE, payload: errorMessage });
    return { success: false, message: errorMessage };
  }
};

// LOGOUT ADMIN
export const logoutDoctor = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_DOCTOR_REQUEST });
    // Clear any stored tokens or data from localStorage/sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('doctorData');
    dispatch({ type: LOGOUT_DOCTOR_SUCCESS } );
    return true;
  } catch (error) {
    dispatch({ type: LOGOUT_DOCTOR_FAILURE, payload: error.message });
    return false;
  }
};

// GET ALL HOSPITALS
export const getHospitals = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HOSPITALS_REQUEST });
    const response = await axios.get(`${API}/api/hospital`);
    dispatch({ type: GET_HOSPITALS_SUCCESS, payload: response.data.hospitals });
  } catch (error) {
    dispatch({ type: GET_HOSPITALS_FAILURE, payload: error.message });
  }
};

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

// GET DOCTOR PATIENTS
export const getDoctorPatients = (doctorId) => async (dispatch) => {
  try {
    dispatch({ type: GET_DOCTOR_PATIENTS_REQUEST });

    const response = await axios.get(`${API}/api/doctor/${doctorId}/patients`);
    
    dispatch({ type: GET_DOCTOR_PATIENTS_SUCCESS, payload: response.data.patients });
  } catch (error) {
    dispatch({ type: GET_DOCTOR_PATIENTS_FAILURE, payload: error.message });
  }
}

// SET DETAILS OF SELECTED PATIENT
export const setPatient = (patientId) => async (dispatch) => {
  try {
    dispatch({ type: SET_CURRENT_PATIENT_REQUEST });

    const response = await axios.get(`${API}/api/doctor/patient/${patientId}`)
    
    dispatch({ type: SET_CURRENT_PATIENT_SUCCESS, payload: response.data.patient });
  } catch (error) {
    dispatch({ type: SET_CURRENT_PATIENT_FAILURE, payload: error.message });
  }
};

// ADD PATIENT MEDICAL CONDITIONS
export const addPatientMedicalConditions = (patientId, medicalConditions) => async (dispatch) => {
  try {
    
    dispatch({ type: ADD_PATIENT_MEDICAL_CONDITIONS_REQUEST });
    
    const response = await axios.post(`${API}/api/doctor/patient/${patientId}`, medicalConditions);

    dispatch({ type: ADD_PATIENT_MEDICAL_CONDITIONS_SUCCESS, payload: response.data.patient });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    dispatch({ type: ADD_PATIENT_MEDICAL_CONDITIONS_FAILURE, payload: error.message });
    return { success: false, message: errorMessage };
  }
}

// EDIT PATIENT MEDICAL CONDITIONS
export const editPatientMedicalCondition = (patientId, medicalConditions) => async(dispatch) => {
  try {
    dispatch({ type: EDIT_PATIENT_MEDICAL_CONDITIONS_REQUEST });

    const response = await axios.put(`${API}/api/doctor//patient/${patientId}/conditions`, medicalConditions);
    dispatch({ type: EDIT_PATIENT_MEDICAL_CONDITIONS_SUCCESS, payload: response.data.patient });

    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    dispatch({ type: EDIT_PATIENT_MEDICAL_CONDITIONS_FAILURE, payload: error.message });
    return { success: false, message: errorMessage };
  }
}

// DELETE PATIENT MEDICAL CONDITIONS
export const deletePatientMedicalCondition = (formData) => async(dispatch) => {
  try {
    dispatch({ type: DELETE_PATIENT_MEDICAL_CONDITIONS_REQUEST });

    const response = await axios.put(`${API}/api/doctor//patient/conditions`, formData);
    dispatch({ type: DELETE_PATIENT_MEDICAL_CONDITIONS_SUCCESS, payload: response.data.patient });

    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    dispatch({ type: DELETE_PATIENT_MEDICAL_CONDITIONS_FAILURE, payload: error.message });
    return { success: false, message: errorMessage };
  }
}

// GET PENDING REQUEST PATIENT DATA
export const getPendingRequestPatientData = (doctorId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PENDING_REQUEST_PATIENT_REQUEST });

    const response = await axios.get(`${API}/api/doctor/${doctorId}/patients/request`);

    dispatch({ type: GET_PENDING_REQUEST_PATIENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PENDING_REQUEST_PATIENT_FAILURE, payload: error.message });
  }
}

// MANAGE PATIENT REQUEST
export const managePatientRequest = (formData) => async (dispatch) => {
  try {
    dispatch({ type: MANAGE_PATIENT_REQUEST_REQUEST });

    const response = await axios.post(`${API}/api/doctor/patients`, formData);

    dispatch({ type: MANAGE_PATIENT_REQUEST_SUCCESS, payload: response.data.doctor });
  } catch (error) {
    dispatch({ type: MANAGE_PATIENT_REQUEST_FAILURE, payload: error.message });
  }
}

// EDIT DOCTOR PROFILE
export const editDoctorProfile = (doctorId, formData) => async(dispatch) => {
  try {
    dispatch({ type: EDIT_DOCTOR_PROFILE_REQUEST });

    const response = await axios.put(`${API}/api/doctor/${doctorId}`, formData);

    dispatch({ type: EDIT_DOCTOR_PROFILE_SUCCESS, payload: response.data.doctor });
    return {
      success: true,
      message: response.data.message
    }
  } catch (error) {
    const errorMessage = error.message || 'Something went wrong';
    dispatch({ type: EDIT_DOCTOR_PROFILE_FAILURE, payload: error.message });
    return {
      success: false,
      message: errorMessage
    }
  }
}