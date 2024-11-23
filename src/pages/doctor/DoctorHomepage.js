import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';

const DoctorHomepage = () => {
  const navigate = useNavigate();

  const goToHospital = async () => {
    navigate('/doctor/hospital');
  };

  const goToPatients = async () => {
    navigate('/doctor/patients');
  };

  // if (!doctorData) return <p>Loading...</p>;

  return (
    <div>
      {/* Navbar */}
      <DoctorNavbar />

      {/* Admin Dashboard Heading */}
      <h1 className="text-center my-4">Doctor Dashboard</h1>

      {/* Cards Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={3}>
            <Card className="shadow-lg text-center mb-4" style={{ minHeight: '200px', minWidth: '250px' }}>
              <Card.Body>
                <Card.Title>Hospitals</Card.Title>
                <Card.Text>Manage your hospital information and updates.</Card.Text>
                <Button onClick={goToHospital} variant="primary">View Hospitals</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3 }>
            <Card className="shadow-lg text-center mb-4" style={{ minHeight: '200px', minWidth: '250px' }}>
              <Card.Body>
                <Card.Title>Patients</Card.Title>
                <Card.Text>Manage your patient profiles and availability.</Card.Text>
                <Button onClick={goToPatients} variant="primary">View Patients</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DoctorHomepage;
