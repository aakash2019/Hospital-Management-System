// PatientDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';

const PatientDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-dashboard">
      <h2>Patient Dashboard</h2>
      <div className="card-container">
        <div className="card" onClick={() => navigate('/patient/login')}>
          <h3>Login</h3>
          <p>Access the patient portal.</p>
        </div>
        
        <div className="card" onClick={() => navigate('/patient/signup')}>
          <h3>Signup</h3>
          <p>Create a new patient account.</p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
