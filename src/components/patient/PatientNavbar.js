import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { logoutPatient } from '../../redux/actions/patientActions';

const PatientNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const patientData = useSelector(state => state.patient.patientData); // Get doctor data from Redux

    const handleLogout = async () => {
      const success = await dispatch(logoutPatient());
      if (success) {
          navigate('/');
      } else {
          console.error("Logout failed");
      }
    };

    const goToDoctors = async () => {
      navigate('/patient/doctors', {state: { patientData }});
    };

    const goToHomepage = async () => {
      navigate('/patient/homepage', {state: { patientData }});
    };

    const goToProfile = async () => {
      navigate('/patient/profile', {state: { patientData }});
    };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={ goToHomepage }>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={ goToHomepage }>Home</Nav.Link>
              <Nav.Link onClick={ goToDoctors }>Doctors</Nav.Link>
              <Nav.Link onClick={ goToProfile }>Profile</Nav.Link>
            </Nav>
            <Button onClick={handleLogout} variant="outline-danger">Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default PatientNavbar;