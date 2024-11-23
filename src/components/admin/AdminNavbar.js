import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logoutAdmin } from '../../redux/actions/adminActions';
import { Button } from 'react-bootstrap';

const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = async () => {
        const success = await dispatch(logoutAdmin());
        if (success) {
            navigate('/');
        } else {
            console.error("Logout failed");
        }
        };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="admin/homepage">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/admin/homepage">Home</Nav.Link>
              <Nav.Link href="/admin/hospital">Hospital</Nav.Link>
              <Nav.Link href="/admin/doctor">Doctor</Nav.Link>
              <Nav.Link href="/admin/profile">Profile</Nav.Link>
            </Nav>
            <Button onClick={handleLogout} variant="outline-danger">Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default AdminNavbar;