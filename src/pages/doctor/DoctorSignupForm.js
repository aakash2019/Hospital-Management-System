// DoctorSignupForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { signupDoctor, getHospitals } from '../../redux/actions/doctorActions';

const DoctorSignupForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.doctor.loading);
  const error = useSelector(state => state.doctor.error);
  const hospitals = useSelector((state) => state.doctor.hospitals); // Assuming hospitals are stored in state.hospital.hospitals

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    hospital: ''
  });

  useEffect(() => {
    dispatch(getHospitals()); // Fetch hospitals when the component mounts
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(signupDoctor(formData));
    if (success) {
      navigate('/doctor/homepage');
    } else {
      console.error(error);
    }
  };
  

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: '25rem', marginTop: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Card.Body>
          <Card.Title>Doctor Signup</Card.Title>
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
              <Form.Label>Specialty</Form.Label>
              <Form.Control type="text" name="specialty" value={formData.specialty} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hospital</Form.Label>
              <Form.Control
                as="select"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
              >
                <option value="">Select a hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital._id} value={hospital._id}>
                    {hospital.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DoctorSignupForm;
