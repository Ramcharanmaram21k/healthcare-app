// components/LandingPage.js
import React from 'react';
import SearchBar from './SearchBar';
import DoctorCard from './DoctorCard';
import '../styles/LandingPage.css';

const LandingPage = ({ 
  filteredDoctors, 
  searchTerm, 
  setSearchTerm, 
  handleDoctorClick 
}) => {
  return (
    <div className="landing-page">
      <div className="container">
        <div className="landing-header">
          <h1 className="main-title">Healthcare Appointment Booking</h1>
          <p className="subtitle">
            Find and book appointments with top healthcare professionals
          </p>
          
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onClick={() => handleDoctorClick(doctor)}
            />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="no-results">
            <p>No doctors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;