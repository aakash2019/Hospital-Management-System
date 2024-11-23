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