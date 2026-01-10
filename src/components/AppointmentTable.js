import React from 'react';
import './AppointmentTable.css';

function AppointmentTable({ appointments, onEdit, onDelete, onStatusChange }) {
  const appointmentList = Array.isArray(appointments) ? appointments : [];

  if (appointmentList.length === 0) {
    return (
      <div className="appointment-table-container">
        <h3>Appointments</h3>
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No appointments scheduled. Book one to get started.
        </p>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Helper function to format time
  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return timeString.substring(0, 5); // HH:MM format
  };

  // Status badge styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'status-scheduled';
      case 'Completed':
        return 'status-completed';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return 'status-scheduled';
    }
  };

  return (
    <div className="appointment-table-container">
      <h3>Appointments</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList.map((appointment) => (
            <tr key={appointment.id}>
              <td data-label="ID">{appointment.id}</td>
              <td data-label="Patient Name">{appointment.patientName}</td>
              <td data-label="Date">{formatDate(appointment.appointmentDate)}</td>
              <td data-label="Time">{formatTime(appointment.appointmentTime)}</td>
              <td data-label="Reason">{appointment.reason || '-'}</td>
              <td data-label="Status">
                <select
                  className={`status-badge ${getStatusColor(appointment.status)}`}
                  value={appointment.status}
                  onChange={(e) => onStatusChange(appointment.id, e.target.value)}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td data-label="Contact">{appointment.patientPhone}</td>
              <td data-label="Actions">
                
                <button 
                  className="action-btn delete-btn" 
                  onClick={() => onDelete(appointment.id)} 
                  title="Delete"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;
