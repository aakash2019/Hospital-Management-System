import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logoutDoctor } from '../../redux/actions/doctorActions';
import { Button } from 'react-bootstrap';

const DoctorNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
      const success = await dispatch(logoutDoctor());
      if (success) {
          navigate('/');
      } else {
          console.error("Logout failed");
      }
    };

    const handleMyHospitalClick = () => {
      // if (doctorData && doctorData._id) {
        // Navigate to My Hospital and pass doctor ID
        navigate(`/doctor/hospital`);
      // } else {
      //   console.error("Doctor ID not found");
      // }
    };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="doctor/homepage">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/doctor/homepage">Home</Nav.Link>
              <Nav.Link onClick={handleMyHospitalClick}>My Hospital</Nav.Link>
              <Nav.Link href="/doctor/patients">Patients</Nav.Link>
              <Nav.Link href="/doctor/requests">Requests</Nav.Link>
              <Nav.Link href="/doctor/profile">Profile</Nav.Link>
            </Nav>
            <Button onClick={handleLogout} variant="outline-danger">Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default DoctorNavbar;