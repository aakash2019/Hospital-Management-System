// DoctorDashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.doctor);

  useEffect(() => {
    
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
