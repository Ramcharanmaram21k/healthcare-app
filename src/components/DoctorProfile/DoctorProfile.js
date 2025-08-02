// components/DoctorProfile.js
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import BackButton from '../BackButton/BackButton';
import './DoctorProfile.css';

const DoctorProfile = ({ 
  selectedDoctor, 
  setCurrentPage, 
  handleBookAppointment 
}) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Available Today':
        return 'status-available';
      case 'Fully Booked':
        return 'status-booked';
      case 'On Leave':
        return 'status-leave';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="doctor-profile-page">
      <div className="container">
        <BackButton onClick={() => setCurrentPage('landing')}>
          Back to Doctors
        </BackButton>

        <div className="profile-card">
          <div className="profile-header">
            <div className="doctor-header-info">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="profile-image"
              />
              <div className="header-text">
                <h1 className="profile-name">{selectedDoctor.name}</h1>
                <p className="profile-specialization">{selectedDoctor.specialization}</p>
                <div className="profile-rating">
                  <span className="rating">⭐ {selectedDoctor.rating}</span>
                  <span className="experience">{selectedDoctor.experience} experience</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="content-grid">
              <div className="contact-section">
                <h2 className="section-title">Contact Information</h2>
                <div className="contact-info">
                  <div className="contact-item">
                    <FaPhone style={{ color: '#28a745' }} className="contact-icon" /> 
                    <span className="contact-text">{selectedDoctor.phone}</span>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope style={{ color: '#007bff' }} className="contact-icon" /> 
                    <span className="contact-text">{selectedDoctor.email}</span>
                  </div>
                  <div className="contact-item">
                    <FaMapMarkerAlt style={{ color: '#dc3545' }} className="contact-icon" /> 
                    <span className="contact-text">{selectedDoctor.location}</span>
                  </div>
                </div>

                <div className="status-section">
                  <div className={`status-badge ${getStatusClass(selectedDoctor.status)}`}>
                    {selectedDoctor.status}
                  </div>
                </div>
              </div>

              <div className="schedule-section">
                <h2 className="section-title">Availability Schedule</h2>
                <div className="schedule-list">
                  {Object.entries(selectedDoctor.schedule).map(([day, times]) => (
                    <div key={day} className="schedule-item">
                      <span className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                      <div className="time-slots">
                        {times.length > 0 ? (
                          times.map((time, index) => (
                            <span key={index} className="time-slot">
                              {time}
                            </span>
                          ))
                        ) : (
                          <span className="no-slots">Not Available</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="book-appointment-section">
              <button
                onClick={() => handleBookAppointment(selectedDoctor)}
                disabled={selectedDoctor.status === 'On Leave'}
                className={`book-btn ${selectedDoctor.status === 'On Leave' ? 'disabled' : ''}`}
              >
                <span className="btn-icon">📅</span>
                {selectedDoctor.status === 'On Leave' ? 'Currently Unavailable' : 'Book Appointment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;