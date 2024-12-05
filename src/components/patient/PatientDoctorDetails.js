import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorHospitals, sendRequest } from '../../redux/actions/patientActions';
import { Button, Table, Container, Modal, Card } from 'react-bootstrap';
import PatientNavbar from './PatientNavbar';

const PatientDoctorDetails = () => {
  const dispatch = useDispatch();
  const { doctor, doctorHospitals, loading, patientData } = useSelector(state => state.patient);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  // Fetch doctor hospitals when the component mounts
  useEffect(() => {
    if (doctor && doctor._id) {
      dispatch(getDoctorHospitals(doctor._id));
    }
  }, [dispatch, doctor]);

  const handleSendRequest = async () => {
    console.log(patientData._id);
    
    const result = await dispatch(sendRequest(patientData._id, doctor._id))
    if (result.success) {
      setShowSuccessModal(true);
    } else {
      setShowFailureModal(true);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <PatientNavbar />

      <Container className="my-5">
        {/* Doctor Details Section */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h2 className="text-center mb-3">{doctor.name}</h2>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Email:</strong> {doctor?.email}</p>
          </Card.Body>
        </Card>

        {/* Hospitals Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Hospitals Associated</h3>
          <Button variant="success" onClick={handleSendRequest}>
            Send Request
          </Button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : doctorHospitals.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Hospital Name</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {doctorHospitals.map((hospital, index) => (
                <tr key={index}>
                  <td>{hospital.name}</td>
                  <td>{hospital.city}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No hospitals associated with this doctor.</p>
        )}
      </Container>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Request sent successfully.</h5>
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
          <h5>You have already sent a request to this doctor.</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowFailureModal(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientDoctorDetails;
