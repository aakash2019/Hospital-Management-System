// PatientSignupForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { signupPatient } from '../../redux/actions/patientActions';

const PatientSignupForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.patient.loading);
  const error = useSelector(state => state.patient.error);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(signupPatient(formData));
    if (success) {
      navigate('/patient/homepage');
    } else {
      console.error(error);
    }
  };
  

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: '25rem', marginTop: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Card.Body>
          <Card.Title>Patient Signup</Card.Title>
          {loading && <p>Signing up...</p>}
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" name="age" value={formData.age} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select a gender</option>
                  <option key="male" value="Male">
                    Male
                  </option>
                  <option key="female" value="Female">
                    Female
                  </option>
                  <option key="other" value="Other">
                    Other
                  </option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
            </Form.Group>
            
            <Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PatientSignupForm;
