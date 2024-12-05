import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors, setDoctor } from '../../redux/actions/adminActions';
import { Button, Table, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminAllDoctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminData, loading, doctors } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getAllDoctors());
    
  }, [dispatch]);

  const handleViewDoctorDetails = (doctorId) => {
    dispatch(setDoctor(doctorId));
    navigate('/admin/doctor/viewdetails', {state: { adminData }});
  }

  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />

      {/* Hospital List */}
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center">List of Doctors</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr key="hospitalHeadings">
                <th>Doctor Name</th>
                <th>View details</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor._id}>
                  <td>{doctor.name}</td>
                  
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleViewDoctorDetails(doctor._id)}
                    >
                      View
                    </Button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default AdminAllDoctors;
