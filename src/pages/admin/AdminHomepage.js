import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AdminNavbar from '../../components/admin/AdminNavbar';

const AdminHomepage = () => {
  const adminData = useSelector(state => state.admin.adminData);
  const navigate = useNavigate();

  const goToHospital = async () => {
    navigate('/admin/hospital');
  };

  if (!adminData) return <p>Loading...</p>;

  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />

      {/* Admin Dashboard Heading */}
      <h1 className="text-center my-4">Admin Dashboard</h1>

      {/* Cards Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={3}>
            <Card className="shadow-lg text-center mb-4" style={{ minHeight: '200px', minWidth: '250px' }}>
              <Card.Body>
                <Card.Title>Hospitals</Card.Title>
                <Card.Text>Manage hospital information and updates.</Card.Text>
                <Button onClick={goToHospital} variant="primary">View Hospitals</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3 }>
            <Card className="shadow-lg text-center mb-4" style={{ minHeight: '200px', minWidth: '250px' }}>
              <Card.Body>
                <Card.Title>Doctors</Card.Title>
                <Card.Text>Manage doctor profiles and availability.</Card.Text>
                <Button variant="primary">View Doctors</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminHomepage;
