import React from 'react';
import './HomePage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppointmentForm from '../components/AppointmentForm';
import { API_ENDPOINTS } from '../config/api';
import ajuImage from '../img/bot.png';
import bannerImage from '../img/banner.jpeg';

function HomePage() {
  // Smooth Scroll Handler
  const handleNavLinkClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute('href') || '';

    let targetId = null;
    if (href.startsWith('/#')) targetId = href.split('#')[1];
    else if (href.startsWith('#')) targetId = href.substring(1);
    else if (href.includes('#')) targetId = href.split('#')[1];

    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookAppointment = async (appointmentData) => {
    try {
      const response = await fetch(API_ENDPOINTS.APPOINTMENTS.CREATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Appointment booked successfully! We will contact you soon.');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert(`Failed to book appointment: ${error.message}`);
    }
  };

  return (
    <div className="home-page">

      {/* Navbar */}
      <Navbar onNavLinkClick={handleNavLinkClick} />

      {/* Hero Section */}
      <header className="hero-section" id="home">
      {/* <img src={bannerImage} alt="Banner" className="home-banner" /> */}
        <div className="container">
          <h2>Welcome to Navjivan Dental Clinic  </h2>
          <p>Your smile is our priority. Experience top-notch dental care with us.</p>
          <a href="#services" className="button" onClick={handleNavLinkClick}>
            Our Services
          </a>
        </div>
        <img src={ajuImage} alt="bot" className="aju" />

      </header>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>

          <div className="services-grid">
            <div className="service-item">
              <h3>General Dentistry</h3>
              <p>Routine check-ups, cleanings, and fillings to maintain your oral health.</p>
            </div>

            <div className="service-item">
              <h3>Cosmetic Dentistry</h3>
              <p>Teeth whitening, veneers, and bonding to enhance your smile.</p>
            </div>

            <div className="service-item">
              <h3>Orthodontics</h3>
              <p>Braces and aligners to straighten teeth and correct bites.</p>
            </div>

            <div className="service-item">
              <h3>Oral Surgery</h3>
              <p>Extractions, wisdom teeth removal, and other surgical procedures.</p>
            </div>

            <div className="service-item">
              <h3>Pediatric Dentistry</h3>
              <p>Gentle dental care for children of all ages.</p>
            </div>

            <div className="service-item">
              <h3>Emergency Dental Care</h3>
              <p>Prompt treatment for dental emergencies to relieve pain and prevent complications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Us</h2>

          <p>
            Navjivan Dental Clinic is committed to providing gentle, high-quality dental care with modern technology and a patient-first approach. We focus on creating healthy smiles through personalized treatments, transparency, and trusted expertise.
          </p>

          <p>
           
          </p>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section id="appointments" className="appointment-booking-section">
        <div className="container">
          <h2 className="section-title">Book an Appointment</h2>
          <p className="section-subtitle">Schedule your visit at your convenience</p>
          <AppointmentForm onBookAppointment={handleBookAppointment} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>

          <div className="contact-info">
            <p><strong>Address:</strong> At. Hanmatmal, Opp Forest Office, Ta-Dharampur, Dist- Valsad</p>

            <p>
              <strong>Phone: </strong>{' '}
              <a> 9313071619 , 6353200245 , 9714756472</a>
            </p>

            <p>
              <strong>Email:</strong>{' '}
              <a href="ajitbhai7@gmail.com">ajitbhaipavar7@gmail.com</a>
            </p>

            <p><strong>Timings:</strong> 9:00 AM – 8:00 PM</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
