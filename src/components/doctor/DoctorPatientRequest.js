import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Container, Modal } from 'react-bootstrap';
import { getPendingRequestPatientData, managePatientRequest } from '../../redux/actions/doctorActions';
import DoctorNavbar from './DoctorNavbar';

const DoctorPatientRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctorData, loading, pendingPatients } = useSelector(state => state.doctor);
  const [ showModal, setShowModal ] = useState(false);
  const [ modalMessage, setModalMessage ] = useState('');

  useEffect(() => {
    dispatch(getPendingRequestPatientData(doctorData._id));
    
  }, [dispatch, doctorData._id]);

  const handleRequest = (patientId, request) => {
    const formData = { doctorId: doctorData._id, patientId: patientId, action: request };
    dispatch(managePatientRequest(formData));

    setShowModal(true);

    if(request==='accept'){
        setModalMessage('Patient request accepted successfully');
    }
    if(request==='decline'){
        setModalMessage('Patient request declined');
    }

  }

  const handleModalButtonClick = () => {
    setShowModal(false)
    navigate('/doctor/patients', {state: { doctorData }});

  }
  return (
    <div>
      {/* Navbar */}
      <DoctorNavbar />

      {/* Hospital List */}
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center">Patients Requests</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr key="hospitalHeadings">
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Accept</th>
                <th>Decline</th>
              </tr>
            </thead>
            <tbody>
              {pendingPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleRequest(patient.id, 'accept')}
                    >
                      Accept
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRequest(patient._id, 'decline')}
                    >
                      Decline
                    </Button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      {/* Add Medical Conditions Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{modalMessage}</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalButtonClick}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleModalButtonClick}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default DoctorPatientRequest;
