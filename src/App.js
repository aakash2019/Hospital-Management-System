import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
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


const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Homepage route */}
          <Route path="/" element={<Homepage/>} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/signup" element={<AdminSignupForm />} />
          <Route path="/admin/login" element={<AdminLoginForm />} />
          <Route path="/admin/homepage" element={<AdminHomepage />} />
          <Route path="/admin/hospital" element={<AdminHospital />} />

          {/* Doctor routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/signup" element={<DoctorSignupForm />} />
          <Route path="/doctor/login" element={<DoctorLoginForm />} />
          <Route path="/doctor/homepage" element={<DoctorHomepage />} />
          <Route path="/doctor/hospital" element={<DoctorHospital />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
