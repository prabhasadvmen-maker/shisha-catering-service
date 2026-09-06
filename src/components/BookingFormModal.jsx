import React, { useState, useEffect } from 'react';
import { 
  FaFire, FaXmark, FaUser, FaPhone, FaMapPin, FaCheck, 
  FaArrowRight, FaArrowLeft, FaShieldHalved 
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import { saveBooking } from '../services/bookingStore';

export default function BookingFormModal({ isOpen, onClose, onBookingSubmitted, preselectedEvent = '', preselectedHookahCount = 8 }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    whatsappPhone: '',
    email: '',
    eventType: 'House Party',
    eventDate: '',
    eventTime: '19:30',
    location: '',
    guestCount: 30,
    hookahCount: 8,
    flavors: ['Dubai VIP Mint', 'Paan Supreme'],
    addOns: ['LED Crystal Bases', 'Ice Hose Attachments'],
    budget: '₹20,000 - ₹35,000',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (preselectedEvent) {
      setFormData(prev => ({ ...prev, eventType: preselectedEvent }));
    }
    if (preselectedHookahCount) {
      setFormData(prev => ({ ...prev, hookahCount: preselectedHookahCount }));
    }
    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, eventDate: prev.eventDate || dateStr }));
  }, [preselectedEvent, preselectedHookahCount, isOpen]);

  if (!isOpen) return null;

  const eventTypes = [
    'Wedding', 'Birthday Party', 'House Party', 'Corporate', 
    'Pool Party', 'Engagement', 'Anniversary', 'Private VIP Lounge'
  ];

  const availableFlavors = [
    'Dubai VIP Mint', 'Paan Supreme', 'Citrus Chill', 'Tropical Sunset Ice',
    'Blueberry Freeze', 'Double Apple Reserve', 'Watermelon Frost', 'Spiced Paan Vanilla'
  ];

  const availableAddOns = [
    'LED Crystal Bases', 'Ice Hose Attachments', 'Fresh Pineapple Fruit Bowls', 
    'Extra Mixologist Staff', 'Custom VIP Lounge Setup'
  ];

  const budgetRanges = [
    'Under ₹15,000', '₹15,000 - ₹25,000', '₹25,000 - ₹45,000', '₹45,000 - ₹75,000', '₹75,000+'
  ];

  const handleFlavorToggle = (flavor) => {
    setFormData(prev => {
      const exists = prev.flavors.includes(flavor);
      if (exists) {
        return { ...prev, flavors: prev.flavors.filter(f => f !== flavor) };
      } else {
        return { ...prev, flavors: [...prev.flavors, flavor] };
      }
    });
  };

  const handleAddOnToggle = (addon) => {
    setFormData(prev => {
      const exists = prev.addOns.includes(addon);
      if (exists) {
        return { ...prev, addOns: prev.addOns.filter(a => a !== addon) };
      } else {
        return { ...prev, addOns: [...prev.addOns, addon] };
      }
    });
  };

  const validateStep = () => {
    const errs = {};
    if (step === 1) {
      if (!formData.customerName.trim()) errs.customerName = 'Full Name is required';
      if (!formData.phone.trim()) errs.phone = 'Phone number is required';
      if (!formData.email.trim()) errs.email = 'Email address is required';
    } else if (step === 2) {
      if (!formData.eventDate) errs.eventDate = 'Event Date is required';
      if (!formData.location.trim()) errs.location = 'Venue Address / Location is required';
    } else if (step === 3) {
      if (formData.flavors.length === 0) errs.flavors = 'Please select at least 1 flavor';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const createdBooking = saveBooking(formData);
    onBookingSubmitted(createdBooking);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full glass-card rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-purple-600/10 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <FaFire className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-white">
                Book Event Shisha Catering
              </h2>
              <p className="text-xs text-amber-400 font-semibold">
                Step {step} of 4 — {step === 1 ? 'Contact Details' : step === 2 ? 'Event Info' : step === 3 ? 'Hookah & Flavor Customization' : 'Review & Confirm'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
          >
            <FaXmark className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full bg-zinc-900 h-1.5 flex">
          <div
            className="bg-gold-gradient h-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Contact Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser className="w-3.5 h-3.5 text-amber-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
                {errors.customerName && <p className="text-[11px] text-red-400 mt-1">{errors.customerName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    Phone / Mobile Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="w-3.5 h-3.5 text-amber-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Event Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Select Event Occasion *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, eventType: type })}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                        formData.eventType === type
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)] font-bold'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                  {errors.eventDate && <p className="text-[11px] text-red-400 mt-1">{errors.eventDate}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Venue Location / City / Address *
                </label>
                <div className="relative">
                  <FaMapPin className="w-3.5 h-3.5 text-amber-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Taj Palace Resort, Chanakyapuri, New Delhi"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                {errors.location && <p className="text-[11px] text-red-400 mt-1">{errors.location}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Expected Guests Count: <span className="text-amber-400 font-extrabold">{formData.guestCount} Guests</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 bg-zinc-900"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Shisha Customization */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Number of Hookahs Needed: <span className="text-amber-400 font-extrabold">{formData.hookahCount} Hookahs</span>
                </label>
                <div className="flex items-center space-x-3">
                  {[5, 8, 12, 15, 20, 25].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setFormData({ ...formData, hookahCount: cnt })}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        formData.hookahCount === cnt
                          ? 'bg-amber-500 text-zinc-950 border-amber-500 font-extrabold shadow-md'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-amber-500/40'
                      }`}
                    >
                      {cnt} Pcs
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Select Preferred Flavors (Select 1 or more) *
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {availableFlavors.map((flv) => {
                    const isSelected = formData.flavors.includes(flv);
                    return (
                      <button
                        key={flv}
                        type="button"
                        onClick={() => handleFlavorToggle(flv)}
                        className={`p-2.5 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        <span>{flv}</span>
                        {isSelected && <FaCheck className="w-3 h-3 text-amber-400" />}
                      </button>
                    );
                  })}
                </div>
                {errors.flavors && <p className="text-[11px] text-red-400 mt-1">{errors.flavors}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  VIP Add-ons & Equipment Enhancements
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableAddOns.map((addon) => {
                    const isSelected = formData.addOns.includes(addon);
                    return (
                      <button
                        key={addon}
                        type="button"
                        onClick={() => handleAddOnToggle(addon)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500 font-semibold'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        }`}
                      >
                        {addon} {isSelected ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    Target Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:border-amber-500"
                  >
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    Special Requests / Message
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Theme color matching, special fruit top"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Confirm */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/30 space-y-3">
                <h3 className="font-serif-luxury text-base font-bold text-amber-400 flex items-center space-x-2">
                  <HiSparkles className="w-3.5 h-3.5" />
                  <span>Summary of Event Booking Request</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs border-t border-zinc-800 pt-3">
                  <div>
                    <span className="text-zinc-400 block">Customer Name:</span>
                    <strong className="text-white">{formData.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Phone:</span>
                    <strong className="text-white">{formData.phone}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Event Type:</span>
                    <strong className="text-amber-400">{formData.eventType}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Date & Time:</span>
                    <strong className="text-white">{formData.eventDate} at {formData.eventTime}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-zinc-400 block">Venue Location:</span>
                    <strong className="text-white">{formData.location}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Hookahs & Guests:</span>
                    <strong className="text-amber-400">{formData.hookahCount} Hookahs ({formData.guestCount} Guests)</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Selected Budget:</span>
                    <strong className="text-white">{formData.budget}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800 text-xs">
                  <span className="text-zinc-400 block">Chosen Flavors:</span>
                  <p className="text-zinc-200 font-medium mt-0.5">{formData.flavors.join(', ')}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
                <FaShieldHalved className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Zero Commitment — Our team will contact you within 30 mins to confirm availability & final custom quote.</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center space-x-2"
              >
                <FaArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg"
              >
                <span>Continue</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gold-gradient hover:brightness-110 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center space-x-2"
              >
                <HiSparkles className="w-3.5 h-3.5" />
                <span>Submit Booking Request</span>
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
