import React, { useState } from 'react';
import SmokeCanvas from './components/SmokeCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventTypes from './components/EventTypes';
import ServicesMenu from './components/ServicesMenu';
import Packages from './components/Packages';
import HowItWorks from './components/HowItWorks';
import Gallery from './components/Gallery';
import BookingFormModal from './components/BookingFormModal';
import BookingConfirmation from './components/BookingConfirmation';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'confirmation'
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedEvent, setPreselectedEvent] = useState('');
  const [preselectedHookahCount, setPreselectedHookahCount] = useState(8);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const handleOpenBooking = (eventCategory = '', hookahCount = 8) => {
    setPreselectedEvent(eventCategory);
    setPreselectedHookahCount(hookahCount);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmitted = (booking) => {
    setIsBookingModalOpen(false);
    setSubmittedBooking(booking);
    setCurrentView('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative selection:bg-amber-500 selection:text-zinc-950">
      
      {/* 3D WebGL Smoke & Ember Canvas Engine */}
      <SmokeCanvas />

      {/* Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* VIEW 1: Client Landing Page */}
      {currentView === 'landing' && (
        <main>
          <Hero onOpenBooking={() => handleOpenBooking()} />
          
          <EventTypes
            onSelectEventType={(evtId) => handleOpenBooking(evtId)}
          />
          
          <ServicesMenu />
          
          <Packages
            onSelectPackage={(pkg) => handleOpenBooking('', pkg.hookahCount)}
          />
          
          <HowItWorks />
          
          <Gallery />
          
          <Footer
            onOpenBooking={() => handleOpenBooking()}
          />
        </main>
      )}

      {/* VIEW 2: Booking Confirmation Screen */}
      {currentView === 'confirmation' && (
        <BookingConfirmation
          booking={submittedBooking}
          onBackHome={() => setCurrentView('landing')}
        />
      )}

      {/* Multi-Step Booking Wizard Modal */}
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSubmitted={handleBookingSubmitted}
        preselectedEvent={preselectedEvent}
        preselectedHookahCount={preselectedHookahCount}
      />

    </div>
  );
}
