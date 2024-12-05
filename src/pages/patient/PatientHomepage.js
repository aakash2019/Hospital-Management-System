// PatientHomepage
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import PatientNavbar from '../../components/patient/PatientNavbar';

const PatientHomepage = () => {
  const navigate = useNavigate();
  const patientData = useSelector(state => state.patient.patientData); // Get doctor data from Redux
  
  const goToDoctors = async () => {
    navigate('/patient/doctors', {state: { patientData }});
  };

  const goToProfile = async () => {
    navigate('/patient/profile', {state: { patientData }});
  };

  return (
    <div>
      {/* Navbar */}
      <PatientNavbar />

      {/* Admin Dashboard Heading */}
      <h1 className="text-center my-4">Patient Dashboard</h1>

      {/* Cards Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={3}>
            <Card className="shadow-lg text-center mb-4" style={{ minHeight: '200px', minWidth: '250px' }}>
              <Card.Body>
                <Card.Title>Doctors</Card.Title>
                <Card.Text>Send requests to doctors to be their patient.</Card.Text>
                <Button onClick={goToDoctors} variant="primary">View Doctors</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3 }>
            <Card className="shadow-lg text-center mb-4" style={{ minHeight: '200px', minWidth: '250px' }}>
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Card.Text>Manage your profile.</Card.Text>
                <Button onClick={goToProfile} variant="primary">View Profile</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PatientHomepage;
