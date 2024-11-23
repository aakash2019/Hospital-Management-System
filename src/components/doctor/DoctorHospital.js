import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import DoctorNavbar from './DoctorNavbar';
import { getDoctorHospitals } from '../../redux/actions/doctorActions';

const DoctorHospital = () => {
  const dispatch = useDispatch();
  const { doctorData, hospitals, loading, error } = useSelector(state => state.doctor);

  useEffect(() => {
    dispatch(getDoctorHospitals(doctorData?._id));
  }, [dispatch, doctorData?._id]);

  return (
    <div>
      {/* Navbar */}
      <DoctorNavbar />

      {/* Hospital List */}
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center">Your Hospitals</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr key="hospitalHeadings">
                <th>Hospital Name</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital, index) => (
                <tr key={hospital._id || index}>
                  <td>{hospital.name}</td>
                  <td>{hospital.city}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default DoctorHospital;
