import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../auth/AuthContext';
import './DentistLoginPage.css';

function DentistLoginPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSubmit = async (username, password) => {
    setError('');
    const isAuthenticated = await login(username, password);

    if (isAuthenticated) {
      navigate('/dentist-dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="dentist-login-container">
        <section className="login-wrapper">
          <article className="login-info">
            <h2 className="title">Welcome Back</h2>
            <p className="subtitle">
              Enter your credentials to access the dentist dashboard and manage patients.
            </p>
          </article>

          <aside className="login-card">
            <LoginForm 
              onSubmit={handleLoginSubmit} 
              errorMessage={error} 
            />
          </aside>
        </section>
      </main>
    </>
  );
}

export default DentistLoginPage;
