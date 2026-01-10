
import React, { useState, useEffect } from 'react';
import './PatientForm.css';

function PatientForm({ onAddPatient, editingPatient = null }) {
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    contactNumber: '',
    email: '',
    disease: '',
    lastCompletedAppointmentDate: '',
    lastCompletedAppointmentReason: '',
    lastCompletedAppointmentNotes: '',
  });

  useEffect(() => {
    if (editingPatient) {
      setNewPatient({
        firstName: editingPatient.firstName || '',
        lastName: editingPatient.lastName || '',
        dob: editingPatient.dob || '',
        contactNumber: editingPatient.contactNumber || '',
        email: editingPatient.email || '',
        disease: editingPatient.disease || '',
        lastCompletedAppointmentDate: editingPatient.lastCompletedAppointmentDate || '',
        lastCompletedAppointmentReason: editingPatient.lastCompletedAppointmentReason || '',
        lastCompletedAppointmentNotes: editingPatient.lastCompletedAppointmentNotes || '',
      });
    }
  }, [editingPatient]);

  const handleAddPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    onAddPatient(newPatient);
    setNewPatient({
      firstName: '',
      lastName: '',
      dob: '',
      contactNumber: '',
      email: '',
      disease: '',
      lastCompletedAppointmentDate: '',
      lastCompletedAppointmentReason: '',
      lastCompletedAppointmentNotes: '',
    });
  };

  return (
    <div className="patient-form-container">
      <h3>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h3>
      <form onSubmit={handleAddPatientSubmit} className="add-patient-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={newPatient.firstName} onChange={handleAddPatientChange} required />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={newPatient.lastName} onChange={handleAddPatientChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={newPatient.dob} onChange={handleAddPatientChange} />
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input type="text" name="contactNumber" value={newPatient.contactNumber} onChange={handleAddPatientChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={newPatient.email} onChange={handleAddPatientChange} required />
          </div>
          <div className="form-group">
            <label>Disease/Condition:</label>
            <input type="text" name="disease" value={newPatient.disease} onChange={handleAddPatientChange} placeholder="e.g., Cavity, Gingivitis, Root Canal" />
          </div>
        </div>

        <fieldset className="last-completed-fieldset">
          <legend>Last Completed Appointment (optional)</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="lastCompletedAppointmentDate"
                value={newPatient.lastCompletedAppointmentDate}
                onChange={handleAddPatientChange}
              />
            </div>
            <div className="form-group">
              <label>Reason:</label>
              <input
                type="text"
                name="lastCompletedAppointmentReason"
                value={newPatient.lastCompletedAppointmentReason}
                onChange={handleAddPatientChange}
                placeholder="e.g., Filling, Cleaning"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea
              name="lastCompletedAppointmentNotes"
              value={newPatient.lastCompletedAppointmentNotes}
              onChange={handleAddPatientChange}
              rows={3}
            />
          </div>
        </fieldset>

        <button type="submit" className="dashboard-button">{editingPatient ? 'Update Patient' : 'Add Patient'}</button>
      </form>
    </div>
  );
}

export default PatientForm;
