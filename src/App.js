import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHomepage from './pages/AppHomepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSignupForm from './pages/admin/AdminSignupForm';
import AdminLoginForm from './pages/admin/AdminLoginForm';
import AdminHomepage from './pages/admin/AdminHomepage';
import AdminHospital from './components/admin/AdminHospital';
import DoctorSignupForm from './pages/doctor/DoctorSignupForm';
import DoctorLoginForm from './pages/doctor/DoctorLoginForm';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorHomepage from './pages/doctor/DoctorHomepage';
import DoctorHospital from './components/doctor/DoctorHospital';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientLoginForm from './pages/patient/PatientLoginForm';
import PatientSignupForm from './pages/patient/PatientSignupForm';
import PatientHomepage from './pages/patient/PatientHomepage';
import PatientAllDoctors from './components/patient/PatientAllDoctors';
import PatientDoctorDetails from './components/patient/PatientDoctorDetails';
import PatientEditProfile from './pages/patient/PatientEditProfile';
import AdminAllDoctors from './components/admin/AdminAllDoctors';
import DoctorAllPatients from './components/doctor/DoctorAllPatients';
import DoctorPatientDetails from './components/doctor/DoctorPatientDetails';
import DoctorPatientRequest from './components/doctor/DoctorPatientRequest';
import DoctorEditProfile from './pages/doctor/DoctorEditProfile';


const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Homepage route */}
          <Route path="/" element={<AppHomepage/>} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/signup" element={<AdminSignupForm />} />
          <Route path="/admin/login" element={<AdminLoginForm />} />
          <Route path="/admin/homepage" element={<AdminHomepage />} />
          <Route path="/admin/hospital" element={<AdminHospital />} />
          <Route path="/admin/doctors" element={<AdminAllDoctors />} />          
          {/* <Route path="/admin/doctor/viewdetails" element={<AdminDoctorDetails />} />  */}

          {/* Doctor routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/signup" element={<DoctorSignupForm />} />
          <Route path="/doctor/login" element={<DoctorLoginForm />} />
          <Route path="/doctor/homepage" element={<DoctorHomepage />} />
          <Route path="/doctor/hospital" element={<DoctorHospital />} />
          <Route path="/doctor/patients" element={<DoctorAllPatients />} />
          <Route path="/doctor/patient/viewdetails" element={<DoctorPatientDetails />} />
          <Route path="/doctor/request" element={<DoctorPatientRequest />} />
          <Route path="/doctor/profile" element={<DoctorEditProfile />} />
          
          {/* Patient routes */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/signup" element={<PatientSignupForm />} />
          <Route path="/patient/login" element={<PatientLoginForm />} />
          <Route path="/patient/homepage" element={<PatientHomepage />} /> 
          <Route path="/patient/doctors" element={<PatientAllDoctors />} />          
          <Route path="/patient/doctor/viewdetails" element={<PatientDoctorDetails />} /> 
          <Route path="/patient/profile" element={<PatientEditProfile />} />          

        </Routes>
      </div>
    </Router>
  );
};

export default App;
