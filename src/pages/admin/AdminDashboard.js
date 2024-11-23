// AdminDashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAdminExistence } from '../../redux/actions/adminActions';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminExists, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(checkAdminExistence());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="card-container">
        <div className="card" onClick={() => navigate('/admin/login')}>
          <h3>Login</h3>
          <p>Access the admin portal.</p>
        </div>
        {!adminExists && (
          <div className="card" onClick={() => navigate('/admin/signup')}>
            <h3>Signup</h3>
            <p>Create a new admin account.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
