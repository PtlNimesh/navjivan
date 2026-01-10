
import React from 'react';
import './PatientTable.css';

function PatientTable({ patients, onEdit, onDelete }) {
  // Ensure patients is an array
  const patientList = Array.isArray(patients) ? patients : [];

  if (patientList.length === 0) {
    return (
      <div>
        <h3>All Patients</h3>
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No patients found. Add a new patient to get started.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3>All Patients</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Disease/Condition</th>
            <th>Last Completed Appointment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientList.map((patient) => (
            <tr key={patient.id}>
              <td data-label="ID">{patient.id}</td>
              <td data-label="First Name">{patient.firstName}</td>
              <td data-label="Last Name">{patient.lastName}</td>
              <td data-label="DOB">{patient.dob}</td>
              <td data-label="Contact">{patient.contactNumber}</td>
              <td data-label="Email">{patient.email}</td>
              <td data-label="Disease">{patient.disease || patient.lastCompletedAppointmentReason || '-'}</td>
                            <td data-label="Last Completed">
                              {patient.lastCompletedAppointmentDate ? (
                                <div style={{ fontSize: '0.9em' }}>
                                  <div><strong>Date:</strong> {patient.lastCompletedAppointmentDate}</div>
                                  {/* <div><strong>Reason:</strong> {patient.lastCompletedAppointmentReason || '-'}</div> */}
                                  {patient.lastCompletedAppointmentNotes && <div><strong>Notes:</strong> {patient.lastCompletedAppointmentNotes}</div>}
                                </div>
                              ) : (
                                '-'
                              )}
                            </td>
              <td data-label="Actions">
                <button className="action-btn edit-btn" onClick={() => onEdit(patient)} title="Edit">
                  ✏️
                </button>
                <button className="action-btn delete-btn" onClick={() => onDelete(patient.id)} title="Delete">
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

export default PatientTable;
