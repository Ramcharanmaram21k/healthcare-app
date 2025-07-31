// App.js
import React, { useState } from 'react';
import LandingPage from './components/LandingPage/';
import DoctorProfile from './components/DoctorProfile/';
import DoctorCard from './components/DoctorCard/'
import BookingForm from './components/BookingForm/';
import ConfirmationMessage from './components/ConfirmationMessage';
import { doctorsData } from './components/doctorsData';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    email: '',
    date: '',
    time: '',
    doctorId: null
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const filteredDoctors = doctorsData.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentPage('profile');
  };

  const handleBookAppointment = (doctor) => {
    setBookingForm({ ...bookingForm, doctorId: doctor.id });
    setCurrentPage('booking');
  };

  const handleFormSubmit = () => {
    if (!bookingForm.patientName || !bookingForm.email || !bookingForm.date || !bookingForm.time) {
      return;
    }
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setCurrentPage('landing');
      setBookingForm({
        patientName: '',
        email: '',
        date: '',
        time: '',
        doctorId: null
      });
    }, 3000);
  };

  const appProps = {
    currentPage,
    setCurrentPage,
    selectedDoctor,
    setSelectedDoctor,
    searchTerm,
    setSearchTerm,
    bookingForm,
    setBookingForm,
    showConfirmation,
    setShowConfirmation,
    filteredDoctors,
    handleDoctorClick,
    handleBookAppointment,
    handleFormSubmit,
    doctorsData
  };

  return (
    <div className="app">
      {currentPage === 'landing' && <LandingPage {...appProps} />}
      {currentPage === 'profile' && selectedDoctor && <DoctorProfile {...appProps} />}
      {currentPage === 'booking' && <BookingForm {...appProps} />}
      {showConfirmation && <ConfirmationMessage {...appProps} />}
    </div>
  );
};

export default App;