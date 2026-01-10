// API Configuration
// This file centralizes all backend API URLs for easy management
// Supports both local development and devtunnel deployment

// Get the backend URL from environment variables
// Defaults to localhost for local development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8085';

// Log the API URL in development mode for debugging
if (process.env.NODE_ENV === 'development') {
  console.log('API Base URL:', API_BASE_URL);
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
  },
  PATIENTS: {
    LIST: `${API_BASE_URL}/api/patients`,
    CREATE: `${API_BASE_URL}/api/patients`,
    UPDATE: (id) => `${API_BASE_URL}/api/patients/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/patients/${id}`,
  },
  APPOINTMENTS: {
    LIST: `${API_BASE_URL}/api/appointments`,
    CREATE: `${API_BASE_URL}/api/appointments`,
    UPDATE: (id) => `${API_BASE_URL}/api/appointments/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/appointments/${id}`,
    BY_PATIENT: (patientId) => `${API_BASE_URL}/api/appointments/patient/${patientId}`,
    BY_STATUS: (status) => `${API_BASE_URL}/api/appointments/status/${status}`,
  },
};

export default API_BASE_URL;
