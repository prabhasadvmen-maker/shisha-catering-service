import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FaCircleCheck, FaCopy, FaWhatsapp, FaArrowRight } from 'react-icons/fa6';

export default function BookingConfirmation({ booking, onBackHome }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#a855f7', '#ffffff']
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }
  }, []);

  if (!booking) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello SHISHA VIP Catering team! I just placed a booking request for my ${booking.eventType}.\n\n` +
    `📌 *Booking ID:* ${booking.id}\n` +
    `👤 *Name:* ${booking.customerName}\n` +
    `📅 *Event Date:* ${booking.eventDate} at ${booking.eventTime}\n` +
    `📍 *Location:* ${booking.location}\n` +
    `💨 *Hookah Quantity:* ${booking.hookahCount} Pcs (${booking.guestCount} Guests)\n` +
    `🌿 *Flavors:* ${booking.flavors.join(', ')}\n\n` +
    `Please send me the custom quote & confirm availability.`
  );

  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
      <div className="max-w-2xl w-full glass-card rounded-3xl p-6 sm:p-10 border border-amber-500/50 shadow-2xl space-y-8 text-center">
        
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-bounce">
          <FaCircleCheck className="w-10 h-10" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
            Booking Received Successfully
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
            Thank You, {booking.customerName}!
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm max-w-lg mx-auto">
            Your event hookah catering request has been received! Our Event Director will reach out within 30 minutes to confirm your setup details & final quote.
          </p>
        </div>

        {/* Booking ID Box */}
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-md mx-auto">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Your Unique Booking Reference ID</span>
            <span className="font-serif-luxury text-xl font-extrabold text-amber-400 tracking-wider">
              {booking.id}
            </span>
          </div>

          <button
            onClick={handleCopyId}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-semibold flex items-center space-x-1.5 border border-zinc-700 transition-colors"
          >
            <FaCopy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied ID!' : 'Copy ID'}</span>
          </button>
        </div>

        {/* Booking Details Summary */}
        <div className="text-left p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-4">
          <h3 className="font-serif-luxury text-base font-bold text-white border-b border-zinc-800 pb-2 flex items-center justify-between">
            <span>Event Catering Details</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
              STATUS: CONFIRMED RECEIVED
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-zinc-400 block">Occasion & Date:</span>
              <strong className="text-amber-400 text-sm block font-serif-luxury">
                {booking.eventType}
              </strong>
              <span className="text-zinc-200">{booking.eventDate} at {booking.eventTime}</span>
            </div>

            <div className="space-y-1">
              <span className="text-zinc-400 block">Hookahs & Guests:</span>
              <strong className="text-white text-sm block">
                {booking.hookahCount} Hookahs for ~{booking.guestCount} Guests
              </strong>
              <span className="text-zinc-400">Target Budget: {booking.budget}</span>
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-1">
              <span className="text-zinc-400 block">Venue Address:</span>
              <span className="text-zinc-200">{booking.location}</span>
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-1">
              <span className="text-zinc-400 block">Selected Artisan Flavors:</span>
              <span className="text-amber-300 font-medium">{booking.flavors.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Send Confirmation via WhatsApp</span>
          </a>

          <button
            onClick={onBackHome}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
          >
            <span>Book Another Event</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
