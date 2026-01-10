import React, { useState } from 'react';
import './AppointmentForm.css';

function AppointmentForm({ onBookAppointment, editingAppointment = null }) {
  const [appointment, setAppointment] = useState(
    editingAppointment || {
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      appointmentDate: '',
      appointmentTime: '',
      reason: '',
      notes: '',
      status: 'REQUESTED',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookAppointment(appointment);
    setAppointment({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      appointmentDate: '',
      appointmentTime: '',
      reason: '',
      notes: '',
      status: 'REQUESTED',
    });
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="appointment-form-container">
      <h3>{editingAppointment ? 'Edit Appointment' : 'Request an Appointment'}</h3>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name: *</label>
            <input
              type="text"
              name="patientName"
              value={appointment.patientName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email: *</label>
            <input
              type="email"
              name="patientEmail"
              value={appointment.patientEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number: *</label>
            <input
              type="tel"
              name="patientPhone"
              value={appointment.patientPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Reason for Visit: *</label>
            <select
              name="reason"
              value={appointment.reason}
              onChange={handleChange}
              required
            >
              <option value="">Select a reason</option>
              <option value="Routine Checkup">Routine Checkup</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Root Canal">Root Canal</option>
              <option value="Filling">Filling</option>
              <option value="Extraction">Extraction</option>
              <option value="Whitening">Whitening</option>
              <option value="Consultation">Consultation</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Appointment Date: *</label>
            <input
              type="date"
              name="appointmentDate"
              value={appointment.appointmentDate}
              onChange={handleChange}
              min={today}
              required
            />
          </div>
          <div className="form-group">
            <label>Appointment Time: *</label>
            <input
              type="time"
              name="appointmentTime"
              value={appointment.appointmentTime}
              onChange={handleChange}
              min="09:00"
              max="19:00"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Additional Notes:</label>
          <textarea
            name="notes"
            value={appointment.notes}
            onChange={handleChange}
            placeholder="Any additional information..."
            rows="4"
          />
        </div>

        {editingAppointment && (
          <div className="form-group">
            <label>Status: *</label>
            <select
              name="status"
              value={appointment.status}
              onChange={handleChange}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        )}

        <button type="submit" className="submit-btn">
          {editingAppointment ? 'Update Appointment' : 'Request Appointment'}
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
