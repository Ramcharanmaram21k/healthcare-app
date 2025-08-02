// components/ConfirmationMessage.js
import React from 'react';
import { doctorsData } from '../../doctorsData';
import './ConfirmationMessage.css';

const ConfirmationMessage = ({ bookingForm }) => {
  const doctor = doctorsData.find(d => d.id === bookingForm.doctorId);

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-modal">
        <div className="success-icon">✅</div>
        <h2 className="confirmation-title">Appointment Booked!</h2>
        <p className="confirmation-text">
          Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
        </p>
        <div className="appointment-details">
          <div className="detail-item">
            <strong>Doctor:</strong> {doctor?.name}
          </div>
          <div className="detail-item">
            <strong>Date:</strong> {bookingForm.date}
          </div>
          <div className="detail-item">
            <strong>Time:</strong> {bookingForm.time}
          </div>
          <div className="detail-item">
            <strong>Patient:</strong> {bookingForm.patientName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;