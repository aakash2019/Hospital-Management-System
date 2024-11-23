import axios from 'axios';
import { API } from '../../backend';
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
  
} from '../actionTypes';

// CHECK IF ADMIN EXISTS
export const checkAdminExistence = () => async (dispatch) => {
  try {
    dispatch({ type: CHECK_ADMIN_REQUEST });
    const response = await axios.get(`${API}/api/admin/exists`);
    dispatch({ type: CHECK_ADMIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CHECK_ADMIN_FAILURE, payload: error.message });
  }
};

// SIGNUP ADMIN
export const signupAdmin = (adminData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_ADMIN_REQUEST });
    const response = await axios.post(`${API}/api/admin/signup`, adminData);
    dispatch({ type: SIGNUP_ADMIN_SUCCESS, payload: response.data });
    return true;
  } catch (error) {
    dispatch({ type: SIGNUP_ADMIN_FAILURE, payload: error.message });
    return false;
  }
};

// LOGIN ADMIN
export const loginAdmin = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_ADMIN_REQUEST });
    const response = await axios.post(`${API}/api/admin/login`, credentials);

    localStorage.setItem('adminToken', response.data.token);
    localStorage.setItem('adminData', response.data.admin);
    
    dispatch({ type: LOGIN_ADMIN_SUCCESS, payload: response.data });
    return true;
  } catch (error) {
    dispatch({ type: LOGIN_ADMIN_FAILURE, payload: error.message });
  }
};

// LOGOUT ADMIN
export const logoutAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_ADMIN_REQUEST });
    // Clear any stored tokens or data from localStorage/sessionStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    dispatch({ type: LOGOUT_ADMIN_SUCCESS } );
    return true;
  } catch (error) {
    dispatch({ type: LOGOUT_ADMIN_FAILURE, payload: error.message });
    return false;
    
  }
}

// GET ALL DOCTORS
export const getAllDoctors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_DOCTORS_REQUEST });

    const token = getState().admin.token; // Retrieve token from admin reducer
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(`${API}/api/admin/doctors`, config);

    dispatch({ type: GET_ALL_DOCTORS_SUCCESS, payload: response.data.doctors } );
    return true;
  } catch (error) {
    dispatch({ type: GET_ALL_DOCTORS_FAILURE, payload: error.message });
    console.log(error);
    return false;
  }
}

// ADD DOCTOR TO HOSPITAL
export const addDoctorToHospital = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_DOCTOR_REQUEST });

    const token = getState().admin.token; // Retrieve token from admin reducer
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(`${API}/api/admin/hospital/doctor`, formData, config);

    dispatch({ type: ADD_DOCTOR_SUCCESS, payload: response.data });
    
    return { success: true, message: response.data.message };
  } catch (error) {
    // Handle the error message from the backend
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    dispatch({ type: ADD_DOCTOR_FAILURE, payload: errorMessage });
    return { success: false, message: errorMessage };
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

// ADD NEW HOSPITAL
export const addHospital = (hospitalData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_HOSPITAL_REQUEST });

    const token = getState().admin.token; // Retrieve token from admin reducer
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(`${API}/api/admin/hospital`, hospitalData, config);
    dispatch({ type: ADD_HOSPITAL_SUCCESS, payload: response.data.hospital });
  } catch (error) {
    dispatch({ type: ADD_HOSPITAL_FAILURE, payload: error.message });
  }
};

// EDIT HOSPITAL
export const editHospital = (hospitalId, hospitalData) => async (dispatch, getState) => {
  try {    
    dispatch({ type: EDIT_HOSPITAL_REQUEST }); // Start request

    // Get the token from the state (assuming it's stored in the admin reducer)
    const token = getState().admin.token; // Retrieve token from admin reducer

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    
    const response = await axios.put(`${API}/api/admin/hospital/${hospitalId}`, hospitalData, config);

    dispatch({ type: EDIT_HOSPITAL_SUCCESS, payload: response.data.hospital }); 
  } catch (error) {
    dispatch({
      type: EDIT_HOSPITAL_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.log(error);
    
  }
};

// DELETE HOSPITAL
export const deleteHospital = (hospitalId) => async (dispatch, getState) => {
  try {    
    dispatch({ type: DELETE_HOSPITAL_REQUEST }); // Start request

    // Get the token from the state (assuming it's stored in the admin reducer)
    const token = getState().admin.token; // Retrieve token from admin reducer

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    
    await axios.delete(`${API}/api/admin/hospital/${hospitalId}`, config);

    dispatch({ type: DELETE_HOSPITAL_SUCCESS, payload: hospitalId }); 
  } catch (error) {
    dispatch({
      type: DELETE_HOSPITAL_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.log(error);
    
  }
};