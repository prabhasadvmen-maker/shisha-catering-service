import React, { useState } from 'react';
import { FaXmark, FaPaperPlane, FaWhatsapp, FaCircleCheck } from 'react-icons/fa6';
import { saveQuote } from '../../services/bookingStore';

export default function QuoteModal({ booking, onClose, onQuoteSent }) {
  const [quoteAmount, setQuoteAmount] = useState(booking?.quote?.amount || 25000);
  const [notes, setNotes] = useState(
    booking?.quote?.breakdown || 
    `${booking?.hookahCount || 8} Premium LED Hookahs + ${booking?.flavors?.length || 3} Exotic Flavors + On-Site Mixologist Staff + Charcoal Management + Transport Setup.`
  );

  if (!booking) return null;

  const handleSendQuote = (e) => {
    e.preventDefault();
    const updatedBookings = saveQuote(booking.id, quoteAmount, notes);
    onQuoteSent(updatedBookings);
  };

  const whatsappQuoteMsg = encodeURIComponent(
    `Hello ${booking.customerName}!\n` +
    `Here is your official custom quote for *${booking.eventType}* Shisha Catering:\n\n` +
    `Booking ID: ${booking.id}\n` +
    `Event Date: ${booking.eventDate} (${booking.eventTime})\n` +
    `Hookah Quantity: ${booking.hookahCount} Pcs\n` +
    `Estimated Quote Amount: ₹${parseFloat(quoteAmount).toLocaleString('en-IN')}\n\n` +
    `Inclusions: ${notes}\n\n` +
    `Reply CONFIRM to lock your event date!`
  );

  const whatsappUrl = `https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=${whatsappQuoteMsg}`;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full glass-card rounded-3xl border border-amber-500/40 p-6 shadow-2xl space-y-6">
        
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h2 className="font-serif-luxury text-xl font-bold text-white">
              Send Official Quote
            </h2>
            <p className="text-xs text-amber-400 font-medium">
              Booking ID: {booking.id} — {booking.customerName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center"
          >
            <FaXmark className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSendQuote} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Total Quote Amount (₹ INR) *
            </label>
            <div className="relative">
              <span className="text-amber-400 absolute left-3.5 top-3 text-sm font-bold">₹</span>
              <input
                type="number"
                required
                value={quoteAmount}
                onChange={(e) => setQuoteAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold text-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Quote Inclusions & Itemized Breakdown *
            </label>
            <textarea
              rows={4}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full sm:flex-1 py-3 rounded-xl bg-gold-gradient hover:brightness-110 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <FaPaperPlane className="w-3.5 h-3.5" />
              <span>Save & Update Quote</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </a>
          </div>
        </form>

      </div>
    </div>
  );
}
