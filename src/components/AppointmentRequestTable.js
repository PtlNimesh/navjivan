import React from 'react';
import './AppointmentRequestTable.css';

function AppointmentRequestTable({
  appointmentRequests,
  onApprove,
  onReject,
}) {
  if (!appointmentRequests || appointmentRequests.length === 0) {
    return <p>No new appointment requests.</p>;
  }

  return (
    <div className="appointment-requests-table-container">
      <h3>Appointment Requests</h3>
      <table className="appointment-requests-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.patientName}</td>
              <td>{request.patientEmail}</td>
              <td>{request.patientPhone}</td>
              <td>{request.appointmentDate}</td>
              <td>{request.appointmentTime}</td>
              <td>{request.reason}</td>
              <td>{request.notes}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => onApprove(request.id)} className="approve-btn">Approve</button>
                <button onClick={() => onReject(request.id)} className="reject-btn">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentRequestTable;