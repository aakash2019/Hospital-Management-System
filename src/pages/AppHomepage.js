import React from 'react';
import '../styles/Homepage.css'; // Import the CSS for styling
import { useNavigate } from 'react-router-dom';

const AppHomepage = () => {
    const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1 style={{margin: '30px'}}>Welcome to the Patient Management System</h1>
      <div className="card-container">
        <div onClick={() => navigate('/admin/dashboard')} className="card admin-card">
          <h2>Admin</h2>
          <p>Manage system settings, users, and other administrative tasks.</p>
        </div>
        <div onClick={() => navigate('/patient/dashboard')} className="card patient-card">
          <h2>Patient</h2>
          <p>Access your medical records, book appointments, and communicate with doctors.</p>
        </div>
        <div onClick={() => navigate('/doctor/dashboard')} className="card doctor-card">
          <h2>Doctor</h2>
          <p>Manage patient records, view appointments, and provide care.</p>
        </div>
      </div>
    </div>
  );
};

export default AppHomepage;
