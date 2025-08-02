import React from 'react';
import BackButton from '../BackButton/BackButton';
import { doctorsData } from '../../doctorsData';
import { FaUser, FaEnvelope, FaCalendarAlt, FaClock } from 'react-icons/fa'; 
import './BookingForm.css';

const BookingForm = ({
  bookingForm,
  setBookingForm,
  setCurrentPage,
  handleFormSubmit
}) => {
  const doctor = doctorsData.find(d => d.id === bookingForm.doctorId);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getAvailableTimes = (doctorId, selectedDate) => {
    const doctorInfo = doctorsData.find(d => d.id === doctorId);
    if (!doctorInfo) return [];

    const date = new Date(selectedDate);
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[date.getDay()];

    return doctorInfo.schedule[dayName] || [];
  };

  const availableTimes = bookingForm.date ? getAvailableTimes(bookingForm.doctorId, bookingForm.date) : [];

  const handleInputChange = (field, value) => {
    if (field === 'date') {
      setBookingForm({ ...bookingForm, [field]: value, time: '' });
    } else {
      setBookingForm({ ...bookingForm, [field]: value });
    }
  };

  const isFormValid = () => {
    return bookingForm.patientName &&
           bookingForm.email &&
           bookingForm.date &&
           bookingForm.time;
  };

  return (
    <div className="booking-page">
      <div className="container">
        <BackButton onClick={() => setCurrentPage('profile')}>
          Back to Profile
        </BackButton>

        <div className="booking-card">
          <div className="booking-header">
            <h1 className="booking-title">Book Appointment</h1>
            <p className="booking-subtitle">with {doctor?.name}</p>
          </div>

          <div className="booking-form">
            <div className="form-group">
              <label className="form-label">Patient Name *</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" /> 
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={bookingForm.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" /> 
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={bookingForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Date *</label>
              <div className="input-wrapper">
                <FaCalendarAlt className="input-icon" /> 
                <input
                  type="date"
                  className="form-input"
                  min={getCurrentDate()}
                  value={bookingForm.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
            </div>

            {availableTimes.length > 0 && (
              <div className="form-group">
                <label className="form-label">Available Times *</label>
                <div className="time-grid">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`time-btn ${bookingForm.time === time ? 'selected' : ''}`}
                      onClick={() => handleInputChange('time', time)}
                    >
                      <FaClock className="time-icon" /> 
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingForm.date && availableTimes.length === 0 && (
              <div className="no-times-message">
                <p>No available times for the selected date.</p>
              </div>
            )}

            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={!isFormValid()}
              className={`submit-btn ${!isFormValid() ? 'disabled' : ''}`}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;