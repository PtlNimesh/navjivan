
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DentistLoginPage from './pages/DentistLoginPage';
import DentistDashboardPage from './pages/DentistDashboardPage';
import { AuthProvider } from './auth/AuthContext'; // Import AuthProvider
import './App.css'; // Global styles or base styles

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap routes with AuthProvider */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dentist-login" element={<DentistLoginPage />} />
          <Route path="/dentist-dashboard" element={<DentistDashboardPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
