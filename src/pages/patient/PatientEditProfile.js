// PatientEditProfile.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import PatientNavbar from '../../components/patient/PatientNavbar';
import { editPatientDetails } from '../../redux/actions/patientActions';

const PatientEditProfile = () => {
  const dispatch = useDispatch();
  const { loading, error, patientData } = useSelector(state => state.patient);
  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  
  // Redirect to login if patientData is null (e.g., after logout)
  useEffect(() => {
    if (!patientData) {
      navigate('/'); // Replace with your login route
    }
  }, [patientData, navigate]);

  const [formData, setFormData] = useState({
    name: patientData?.name || '', // Handle null patientData
    age: patientData?.age || '',
    address: patientData?.address || '',
  });

  useEffect(() => {
    // Update formData if patientData changes
    if (patientData) {
      setFormData({
        name: patientData.name,
        age: patientData.age,
        address: patientData.address,
      });
    }
  }, [patientData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(editPatientDetails(patientData._id, formData));
    if (result.success) {
        console.log(result.message);
        
        setShowSuccessModal(true);
    } else {
        console.log(result.message);
        
        setShowFailureModal(true);
    }
  };

  return (
    <div>
        <PatientNavbar />

        <div className="d-flex align-items-center justify-content-center vh-100">
        <Card style={{ width: '25rem', marginTop: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Card.Body>
            <Card.Title>Edit Profile</Card.Title>
            {loading && <p>....</p>}
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleEdit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" name="age" value={formData.age} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
                </Form.Group>
                
                <Button type="submit" variant="primary" className="mt-3">Save Changes</Button>
            </Form>
            </Card.Body>
        </Card>

        {/* Success Modal */}
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h5>Details updates successfully.</h5>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={() => setShowSuccessModal(false)}>
                Ok
            </Button>
            </Modal.Footer>
        </Modal>

        {/* Failure Modal */}
        <Modal show={showFailureModal} onHide={() => setShowFailureModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h5>Error in updating details.</h5>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="warning" onClick={() => setShowFailureModal(false)}>
                Ok
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    </div>
  );
};

export default PatientEditProfile;
