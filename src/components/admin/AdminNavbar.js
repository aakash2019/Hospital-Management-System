import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logoutAdmin } from '../../redux/actions/adminActions';
import { Button } from 'react-bootstrap';

const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const adminData = useSelector(state => state.admin.adminData); // Get doctor data from Redux

    const handleLogout = async () => {
      const success = await dispatch(logoutAdmin());
      if (success) {
          navigate('/');
      } else {
          console.error("Logout failed");
      }
    };

    const goToHomepage = async () => {
      navigate('/admin/homepage', {state: { adminData }});
    };

    const goToHospital = async () => {
      navigate('/admin/hospital', {state: { adminData }});
    };

    const goToDoctor = async () => {
      navigate('/admin/doctors', {state: { adminData }});
    };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={ goToHomepage }>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={ goToHomepage }>Home</Nav.Link>
              <Nav.Link onClick={ goToHospital }>Hospital</Nav.Link>
              <Nav.Link onClick={ goToDoctor }>Doctor</Nav.Link>
            </Nav>
            <Button onClick={handleLogout} variant="outline-danger">Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default AdminNavbar;