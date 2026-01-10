import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PatientTable from '../components/PatientTable';
import PatientForm from '../components/PatientForm';
import AppointmentTable from '../components/AppointmentTable';
import AppointmentForm from '../components/AppointmentForm';
import { useAuth } from '../auth/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import HomeDashboard from '../components/HomeDashboard';
import AppointmentRequestTable from '../components/AppointmentRequestTable';
import './DentistDashboardPage.css';

function DentistDashboardPage() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [currentView, setCurrentView] = useState(() => {
    const savedView = localStorage.getItem('dentistDashboardView');
    return savedView ? savedView : 'home';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [diseaseFilter, setDiseaseFilter] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const { isAuthenticated, logout, authLoading } = useAuth();
  const navigate = useNavigate();

  // Memoized fetch functions
  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching patients from:', API_ENDPOINTS.PATIENTS.LIST);
      const response = await fetch(API_ENDPOINTS.PATIENTS.LIST);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched patients data:', data);

      if (Array.isArray(data)) {
        setPatients(data);
      } else {
        console.warn('API returned non-array data:', data);
        setPatients([]);
        setError('Invalid data format from server');
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError(`Failed to fetch patients: ${error.message}`);
      setPatients([]);
    } finally {
      setIsLoading(false);
    }
  }, [setPatients, setError, setIsLoading]); // Include setters in dependencies

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching appointments from:', API_ENDPOINTS.APPOINTMENTS.LIST);
      const response = await fetch(API_ENDPOINTS.APPOINTMENTS.LIST);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched appointments data:', data);

      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        console.warn('API returned non-array data:', data);
        setAppointments([]);
        setError('Invalid data format from server');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError(`Failed to fetch appointments: ${error.message}`);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  }, [setAppointments, setError, setIsLoading]); // Include setters in dependencies

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/dentist-login');
    } else if (!authLoading && isAuthenticated) {
      fetchPatients();
      fetchAppointments();
    }
  }, [isAuthenticated, authLoading, navigate, fetchPatients, fetchAppointments]); // Add fetch functions to dependencies

  // Filter and search patients
  useEffect(() => {
    let filtered = patients;

    // Search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.firstName && p.firstName.toLowerCase().includes(lowerSearch)) ||
          (p.lastName && p.lastName.toLowerCase().includes(lowerSearch)) ||
          (p.email && p.email.toLowerCase().includes(lowerSearch)) ||
          (p.contactNumber && p.contactNumber.includes(searchTerm))
      );
    }

    // Disease filter
    if (diseaseFilter) {
      filtered = filtered.filter((p) => p.disease && p.disease.toLowerCase().includes(diseaseFilter.toLowerCase()));
    }

    setFilteredPatients(filtered);
  }, [patients, searchTerm, diseaseFilter]);

  // Filter appointment requests
  useEffect(() => {
    setAppointmentRequests(appointments.filter(app => app.status === 'REQUESTED'));
  }, [appointments]);

  const handleAddPatient = useCallback(async (patientData) => {
    try {
      const endpoint = editingPatient
        ? API_ENDPOINTS.PATIENTS.UPDATE(editingPatient.id)
        : API_ENDPOINTS.PATIENTS.CREATE;
      const method = editingPatient ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchPatients();
      setCurrentView('viewPatients');
      setEditingPatient(null);
    } catch (error) {
      console.error('Error adding/updating patient:', error);
      setError(`Failed to save patient: ${error.message}`);
    }
  }, [editingPatient, fetchPatients, setCurrentView, setEditingPatient, setError]);

  const handleEditPatient = useCallback((patient) => {
    setEditingPatient(patient);
    setCurrentView('addPatient');
  }, [setEditingPatient, setCurrentView]);

  const handleDeletePatient = useCallback(async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        const response = await fetch(API_ENDPOINTS.PATIENTS.DELETE(patientId), {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
        setError(`Failed to delete patient: ${error.message}`);
      }
    }
  }, [fetchPatients, setError]);

  const handleBookAppointment = useCallback(async (appointmentData) => {
    try {
      const endpoint = editingAppointment
        ? API_ENDPOINTS.APPOINTMENTS.UPDATE(editingAppointment.id)
        : API_ENDPOINTS.APPOINTMENTS.CREATE;
      const method = editingAppointment ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchAppointments();
      setCurrentView('viewAppointments');
      setEditingAppointment(null);
    } catch (error) {
      console.error('Error booking/updating appointment:', error);
      setError(`Failed to save appointment: ${error.message}`);
    }
  }, [editingAppointment, fetchAppointments, setCurrentView, setEditingAppointment, setError]);

  const handleEditAppointment = useCallback((appointment) => {
    setEditingAppointment(appointment);
    setCurrentView('bookAppointment');
  }, [setEditingAppointment, setCurrentView]);

  const handleDeleteAppointment = useCallback(async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const response = await fetch(API_ENDPOINTS.APPOINTMENTS.DELETE(appointmentId), {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
        setError(`Failed to delete appointment: ${error.message}`);
      }
    }
  }, [fetchAppointments, setError]);

  const handleAppointmentStatusChange = useCallback(async (appointmentId, newStatus) => {
    try {
      const appointment = appointments.find(a => a.id === appointmentId);
      const updatedData = { ...appointment, status: newStatus };

      const response = await fetch(API_ENDPOINTS.APPOINTMENTS.UPDATE(appointmentId), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh both appointments and patients so completed appointment
      // details are reflected in the patient list
      await fetchAppointments();
      await fetchPatients();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setError(`Failed to update appointment: ${error.message}`);
    }
  }, [appointments, fetchAppointments, fetchPatients, setError]);

  const handleApproveAppointment = useCallback(async (appointmentId) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.APPOINTMENTS.LIST}/${appointmentId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchAppointments();
      fetchPatients(); // Potentially update patient info if needed for metrics
    } catch (error) {
      console.error('Error approving appointment:', error);
      setError(`Failed to approve appointment: ${error.message}`);
    }
  }, [fetchAppointments, fetchPatients, setError]);

  const handleRejectAppointment = useCallback(async (appointmentId) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.APPOINTMENTS.LIST}/${appointmentId}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchAppointments();
      fetchPatients(); // Potentially update patient info if needed for metrics
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      setError(`Failed to reject appointment: ${error.message}`);
    }
  }, [fetchAppointments, fetchPatients, setError]);

  useEffect(() => {
    localStorage.setItem('dentistDashboardView', currentView);
  }, [currentView]);

  const renderView = () => {
    if (isLoading) {
      return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
    }

    if (error) {
      return (
        <div style={{ padding: '20px', color: '#d32f2f', backgroundColor: '#ffebee', borderRadius: '4px' }}>
          <strong>Error:</strong> {error}
        </div>
      );
    }

    switch (currentView) {
      case 'viewPatients':
        return (
          <div>
            {/* Search Bar */}
            <div className="search-filter-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Disease Filter */}
              <div className="filter-box">
                <select
                  value={diseaseFilter}
                  onChange={(e) => setDiseaseFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Diseases</option>
                  {[...new Set(patients.map((p) => p.disease).filter((d) => d))]
                    .sort()
                    .map((disease) => (
                      <option key={disease} value={disease}>
                        {disease}
                      </option>
                    ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || diseaseFilter) && (
                <button
                  className="clear-filters-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setDiseaseFilter('');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="results-count">
              Showing {filteredPatients.length} of {patients.length} patients
            </div>

            {/* Patient Table */}
            <PatientTable
              patients={filteredPatients}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          </div>
        );
      case 'addPatient':
        return <PatientForm onAddPatient={handleAddPatient} editingPatient={editingPatient} />;
      case 'viewAppointments':
        return <AppointmentTable 
          appointments={appointments} 
          onEdit={handleEditAppointment}
          onDelete={handleDeleteAppointment}
          onStatusChange={handleAppointmentStatusChange}
        />;
      case 'home':
        return <HomeDashboard patients={patients} appointments={appointments} />;
      case 'viewRequests':
        return (
          <AppointmentRequestTable
            appointmentRequests={appointmentRequests}
            onApprove={handleApproveAppointment}
            onReject={handleRejectAppointment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h2 className="sidebar-title">Dashboard</h2>

          <ul className="sidebar-menu">
            <li
              className={currentView === 'home' ? 'active' : ''}
              onClick={() => {
                setCurrentView('home');
                setEditingPatient(null);
                setEditingAppointment(null);
              }}
            >
              Home Dashboard
            </li>
            <li
              className={currentView === 'viewPatients' ? 'active' : ''}
              onClick={() => {
                setCurrentView('viewPatients');
                setEditingPatient(null);
                setEditingAppointment(null);
              }}
            >
              View Patients
            </li>
            <li
              className={currentView === 'viewRequests' ? 'active' : ''}
              onClick={() => {
                setCurrentView('viewRequests');
                setEditingPatient(null);
                setEditingAppointment(null);
              }}
            >
              Appointment Requests
            </li>
            <li
              className={currentView === 'addPatient' ? 'active' : ''}
              onClick={() => setCurrentView('addPatient')}
            >
              {editingPatient ? 'Edit Patient' : 'Add Patient'}
            </li>
            <li
              className={currentView === 'viewAppointments' ? 'active' : ''}
              onClick={() => {
                setCurrentView('viewAppointments');
                setEditingAppointment(null);
              }}
            >
              View Appointments
            </li>
          </ul>

          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </aside>

        <main className="main-content">{renderView()}</main>
      </div>

      <Footer />
    </>
  );
}


export default DentistDashboardPage;
