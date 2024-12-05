import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getDoctorPatients, setPatient } from '../../redux/actions/doctorActions';
import DoctorNavbar from './DoctorNavbar';

const DoctorAllPatients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctorData, loading, patients } = useSelector(state => state.doctor);

  useEffect(() => {
    dispatch(getDoctorPatients(doctorData._id));
    
  }, [dispatch, doctorData._id]);

  const handleViewPatientDetails = (patientId) => {
    dispatch(setPatient(patientId));
    
    navigate('/doctor/patient/viewdetails', {state: { doctorData }});
  }

  return (
    <div>
      {/* Navbar */}
      <DoctorNavbar />

      {/* Hospital List */}
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center">List of your Patients</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr key="hospitalHeadings">
                <th>Patient Name</th>
                <th>View details</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleViewPatientDetails(patient._id)}
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

export default DoctorAllPatients;
