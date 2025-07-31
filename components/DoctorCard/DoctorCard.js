// components/DoctorCard.js
import React from 'react';
import '../styles/DoctorCard.css';

const DoctorCard = ({ doctor, onClick }) => {
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
    <div className="doctor-card" onClick={onClick}>
      <div className="card-content">
        <div className="doctor-info">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="doctor-image"
          />
          <div className="doctor-details">
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialization">{doctor.specialization}</p>
          </div>
        </div>
        
        <div className="doctor-meta">
          <div className="rating-experience">
            <span className="rating">⭐ {doctor.rating}</span>
            <span className="experience">{doctor.experience} experience</span>
          </div>
          
          <div className="location">
            <span className="location-icon">📍</span>
            <span className="location-text">{doctor.location}</span>
          </div>
          
          <div className={`status-badge ${getStatusClass(doctor.status)}`}>
            {doctor.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;