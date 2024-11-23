// AdminLoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../redux/actions/adminActions';
import { Card, Form, Button } from 'react-bootstrap';

const AdminLoginForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.admin.loading);
  const error = useSelector(state => state.admin.error);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(loginAdmin(formData));
    if (success) {
      navigate('/admin/homepage');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: '25rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Card.Body>
          <Card.Title className="text-center">Admin Login</Card.Title>
          {loading && <p>Logging in...</p>}
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3 w-100">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminLoginForm;
