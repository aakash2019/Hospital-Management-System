import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHospitals, addHospital, editHospital, deleteHospital } from '../../redux/actions/adminActions';
import { addDoctorToHospital, getAllDoctors } from '../../redux/actions/adminActions';
import { Button, Table, Container, Modal, Form } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const AdminHospital = () => {
  const dispatch = useDispatch();
  // const { hospitals, loading, error } = useSelector(state => state.hospital);
  const { doctors, hospitals, loading } = useSelector(state => state.admin);
  
  const [showAddHospitalModal, setShowAddHospitalModal] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const [newHospital, setNewHospital] = useState({ name: '', city: '' });
  const [editedHospital, setEditedHospital] = useState({ name: '', city: '' });

  const [hospitalId, setHospitalId] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalCity, setHospitalCity] = useState("");

  useEffect(() => {
    dispatch(getHospitals());
  }, [dispatch]);

  const handleEdit = (hospitalId, hospitalName, hospitalCity) => {
    setShowEditModal(true);
    setHospitalId(hospitalId);
    setHospitalName(hospitalName);
    setHospitalCity(hospitalCity);
  };

  const handleAddDoctor = (hospitalId, hospitalName, hospitalCity) => {
    setShowAddDoctorModal(true);
    setHospitalName(hospitalName);
    setHospitalId(hospitalId);
    setHospitalCity(hospitalCity);
    dispatch(getAllDoctors());
  }

  const handleDelete = (hospitalId) => {
    setHospitalId(hospitalId);
    dispatch(deleteHospital(hospitalId));
  };

  const handleAddHospital = () => {
    if(!newHospital.name || !newHospital.city){
      return alert("Please enter name and city!");
    }
    dispatch(addHospital(newHospital));
    setShowAddHospitalModal(false);
    setNewHospital({ name: '', city: '' });
  };

  const handleEditHospital = () => {
    dispatch(editHospital(hospitalId, editedHospital));
    setShowEditModal(false);
    setEditedHospital({ name: '', city: '' });
  };

  const handleAddDoctorToHospital = async (doctorId) => {
    setShowAddDoctorModal(false);
    const formData = {hospitalId: hospitalId, doctorId: doctorId};

    // Dispatch the action and await the result
    const result = await dispatch(addDoctorToHospital(formData)); // result contains { success, message }

    if (result.success) {
      setShowSuccessModal(true); 
    } else {
      setShowFailureModal(true); 
    }
  };

  return (
    
    <div>
      {/* Navbar */}
      <AdminNavbar />

      {/* Hospital List */}
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center">List of Hospitals</h2>
          <Button variant="success" onClick={() => setShowAddHospitalModal(true)}>
            Add Hospital
          </Button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr key="hospitalHeadings">
                <th>Hospital Name</th>
                <th>City</th>
                <th>Edit</th>
                <th>Add Doctors</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital, index) => (
                <tr key={index}>
                  <td>{hospital.name}</td>
                  <td>{hospital.city}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(hospital._id, hospital.name, hospital.city)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleAddDoctor(hospital._id, hospital.name, hospital.city)}
                    >
                      Add
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(hospital._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      {/* Add Hospital Modal */}
      <Modal show={showAddHospitalModal} onHide={() => setShowAddHospitalModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Hospital</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formHospitalName">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hospital name"
                value={newHospital.name}
                onChange={(e) =>
                  setNewHospital({ ...newHospital, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formHospitalCity" className="mt-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={newHospital.city}
                onChange={(e) =>
                  setNewHospital({ ...newHospital, city: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddHospitalModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddHospital}>
            Add Hospital
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Hospital Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Hospital</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditHospitalName">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={hospitalName}
                value={editedHospital.name}
                onChange={(e) =>
                  setEditedHospital({ ...editedHospital, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEditHospitalCity" className="mt-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder={hospitalCity}
                value={editedHospital.city}
                onChange={(e) =>
                  setEditedHospital({ ...editedHospital, city: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditHospital}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Doctor Modal */}
      <Modal show={showAddDoctorModal} onHide={() => setShowAddDoctorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{hospitalName}, {hospitalCity}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
              <thead>
                <tr key="hospitalHeadings">
                  <th>Doctor Name</th>
                  <th>Specialty</th>
                  <th>Email</th>
                  <th>Add Doctor</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doctor => (
                  <tr key={doctor._id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialty}</td>
                    <td>{doctor.email}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleAddDoctorToHospital(doctor._id)}
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Doctor added to hospital successfully</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Failure Modal */}
      <Modal show={showFailureModal} onHide={() => setShowFailureModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Doctor already exists in this hospital.</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowFailureModal(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminHospital;
