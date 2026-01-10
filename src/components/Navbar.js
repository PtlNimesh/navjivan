
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onNavLinkClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e, id) => {
    // If a page-level handler was provided (HomePage), delegate to it
    if (onNavLinkClick) {
      onNavLinkClick(e);
      return;
    }

    e.preventDefault();

    // Navigate to home, then scroll to the section smoothly
    navigate('/', { replace: false });
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 120);
  };

  const handleHomeClick = (e) => {
    if (onNavLinkClick) {
      onNavLinkClick(e);
      return;
    }
    // Default: smooth scroll to top and navigate home
    e.preventDefault();
    navigate('/', { replace: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = (e) => {
    // Ensure we scroll to top when navigating to login
    // Let Link handle navigation, then scroll after a short delay
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 80);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="brand">
          <a className="logo">Navjivan Dental Clinic</a>
          <h4 className="doctor-name">Dr. Ajit L Pavar</h4>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#home" onClick={(e) => handleSectionClick(e, 'home')}>Home</a>
          </li>
          <li>
            <a href="#services" onClick={(e) => handleSectionClick(e, 'services')}>Services</a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleSectionClick(e, 'about')}>About Us</a>
          </li>
          <li>
            <a href="#appointments" onClick={(e) => handleSectionClick(e, 'appointments')}>Book Appointment</a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')}>Contact</a>
          </li>
          <li>
            <Link to="/dentist-login" className="login-button" onClick={handleLoginClick}>Dentist Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
