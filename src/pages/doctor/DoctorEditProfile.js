// DoctorEditProfile.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Button, Modal, Table, Container } from 'react-bootstrap';
import { editDoctorProfile, getDoctorHospitals } from '../../redux/actions/doctorActions';
import { getHospitals } from '../../redux/actions/adminActions';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';

const DoctorEditProfile = () => {
  const dispatch = useDispatch();
  const { loading, error, doctorData, doctorHospitals, hospitals } = useSelector(state => state.doctor);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  useEffect(() => {
    dispatch(getDoctorHospitals(doctorData?._id));
    dispatch(getHospitals());
    
  }, [dispatch, doctorData]);

  const [formData, setFormData] = useState({
    name: doctorData.name,
    specialty: doctorData.specialty,
    hospital: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(editDoctorProfile(doctorData._id, formData));
    if (result.success) {
        setFormData({hospital: ''});
        dispatch(getDoctorHospitals(doctorData?._id));
        setShowSuccessModal(true);
    } else {
      setShowFailureModal(true);
    }
  };
  

  return (
    <div>
        <DoctorNavbar />

        <div className="d-flex align-items-center justify-content-center vh-100">
        <Card style={{ width: '25rem', marginTop: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Card.Body>
            <Card.Title>Edit Profile</Card.Title>
            {loading && <p>....</p>}
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleEdit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Specialty</Form.Label>
                    <Form.Control type="text" name="specialty" value={formData.specialty} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Add Hospital</Form.Label>
                    <Form.Control
                        as="select"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleChange}
                        
                    >
                        <option value="">Select a hospital</option>
                        {hospitals.map((hospital) => (
                        <option key={hospital._id} value={hospital._id}>
                            {hospital.name}
                        </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                
                <Button type="submit" variant="primary" className="mt-3">Save Changes</Button>
            </Form>
            </Card.Body>
        </Card>
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="text-center">Your Hospitals</h5>
            </div>
            {loading ? (
            <p>Loading...</p>
            ) : error ? (
            <p>Error: {error}</p>
            ) : (
            <Table striped bordered hover>
                <thead>
                <tr key="hospitalHeadings">
                    <th>Hospital Name</th>
                    <th>City</th>
                </tr>
                </thead>
                <tbody>
                {doctorHospitals.map((hospital, index) => (
                    <tr key={hospital._id || index}>
                    <td>{hospital.name}</td>
                    <td>{hospital.city}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            )}
        </Container>

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

export default DoctorEditProfile;
