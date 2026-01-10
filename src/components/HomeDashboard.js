import React from 'react';
import './HomeDashboard.css';

function HomeDashboard({ patients, appointments }) {
  // Helper function to get today's date in 'YYYY-MM-DD' format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const todayDate = getTodayDate();

  // Calculate metrics
  const totalPatients = patients.length;
  const todayPatients = patients.filter(patient => {
    // Assuming patient registration date is available and can be compared
    // You might need to adjust this based on your actual patient object structure
    return patient.registrationDate && patient.registrationDate.startsWith(todayDate);
  }).length;

  const totalAppointments = appointments.length;
  const pendingAppointmentsCount = appointments.filter(
    (app) => app.status === 'SCHEDULED'
  ).length;

  const todayAppointments = appointments.filter(
    (app) => app.appointmentDate && app.appointmentDate.startsWith(todayDate)
  ).length;

  return (
    <div className="home-dashboard">
      <h3>Dentist Overview</h3>
      <div className="dashboard-metrics">
        <div className="metric-card">
          <h4>Total Patients</h4>
          <p>{totalPatients}</p>
        </div>
        <div className="metric-card">
          <h4>Today's Patients</h4>
          <p>{todayPatients}</p>
        </div>
        <div className="metric-card">
          <h4>Total Appointments</h4>
          <p>{totalAppointments}</p>
        </div>
        <div className="metric-card">
          <h4>Pending Appointments</h4>
          <p>{pendingAppointmentsCount}</p>
        </div>
        <div className="metric-card">
          <h4>Today's Appointments</h4>
          <p>{todayAppointments}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;
