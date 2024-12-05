// DoctorDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Doctor Dashboard</h2>
      <div className="card-container">
        <div className="card" onClick={() => navigate('/doctor/login')}>
          <h3>Login</h3>
          <p>Access the doctor portal.</p>
        </div>
        
        <div className="card" onClick={() => navigate('/doctor/signup')}>
          <h3>Signup</h3>
          <p>Create a new doctor account.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
