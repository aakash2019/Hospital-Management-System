import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import DoctorNavbar from './DoctorNavbar';

const DoctorPatientDetails = () => {
  const { patient } = useSelector(state => state.doctor);
  return (
    <div>
      {/* Navbar */}
      <DoctorNavbar />
      <Container className="my-5">
        {/* Patient Details Section */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h2 className="text-center mb-3">{patient.name}</h2>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Address:</strong> {patient?.address}</p>
          </Card.Body>
        </Card>
        </Container>
        </div>

  );
};

export default DoctorPatientDetails;
