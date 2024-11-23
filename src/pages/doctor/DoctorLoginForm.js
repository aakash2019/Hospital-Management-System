// DoctorLoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginDoctor } from '../../redux/actions/doctorActions';
import { Card, Form, Button } from 'react-bootstrap';

const DoctorLoginForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.doctor.loading);
  const error = useSelector(state => state.doctor.error);
  const isAuthenticated = useSelector(state => state.doctor.isAuthenticated);

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
    const result = await dispatch(loginDoctor(formData));    
    if (result.success) {
      navigate('/doctor/homepage');
    } else {
      console.error('Login failed');
    }
  };

  if(isAuthenticated){

    return navigate('/doctor/homepage');
  }

  console.log(isAuthenticated);
  

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: '25rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Card.Body>
          <Card.Title className="text-center">Doctor Login</Card.Title>
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

export default DoctorLoginForm;
