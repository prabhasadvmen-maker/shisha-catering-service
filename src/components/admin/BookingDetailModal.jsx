import React, { useState } from 'react';
import { X, Phone, MessageSquare, Mail, Calendar, MapPin, Users, Flame, DollarSign, CheckCircle2, ShieldAlert } from 'lucide-react';
import { updateBookingStatus } from '../../services/bookingStore';

export default function BookingDetailModal({ booking, onClose, onStatusChanged }) {
  if (!booking) return null;

  const statuses = ['New', 'Contacted', 'Quote Sent', 'Confirmed', 'Completed', 'Cancelled'];

  const handleStatusChange = (newStatus) => {
    const updated = updateBookingStatus(booking.id, newStatus);
    onStatusChanged(updated);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello ${booking.customerName}! 💨 This is SHISHA VIP Event Catering regarding your ${booking.eventType} booking request (${booking.id}).`
  );
  const whatsappUrl = `https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full glass-card rounded-3xl border border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="font-serif-luxury text-xl font-bold text-amber-400">
                {booking.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                {booking.status}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Received on: {new Date(booking.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Workflow Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
            Update Booking Workflow Status:
          </label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  booking.status === st
                    ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md font-extrabold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs">
          <div className="space-y-1">
            <span className="text-zinc-400 block font-medium">Customer Name:</span>
            <strong className="text-white text-sm">{booking.customerName}</strong>
          </div>

          <div className="space-y-1">
            <span className="text-zinc-400 block font-medium">Phone Number:</span>
            <div className="flex items-center space-x-2">
              <strong className="text-amber-400">{booking.phone}</strong>
              <a href={`tel:${booking.phone}`} className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white">
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-1 rounded bg-emerald-600/30 text-emerald-400 hover:text-emerald-300">
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-zinc-400 block font-medium">Email:</span>
            <span className="text-zinc-200">{booking.email}</span>
          </div>

          <div className="space-y-1">
            <span className="text-zinc-400 block font-medium">Target Budget:</span>
            <span className="text-amber-400 font-bold">{booking.budget}</span>
          </div>
        </div>

        {/* Event Specification */}
        <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3 text-xs">
          <h3 className="font-serif-luxury text-sm font-bold text-white border-b border-zinc-800 pb-2">
            Event Specifications
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-zinc-400 block">Occasion:</span>
              <strong className="text-amber-400">{booking.eventType}</strong>
            </div>
            <div>
              <span className="text-zinc-400 block">Date & Time:</span>
              <strong className="text-white">{booking.eventDate} at {booking.eventTime}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-zinc-400 block">Venue Location:</span>
              <span className="text-zinc-200">{booking.location}</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Hookahs Required:</span>
              <strong className="text-white">{booking.hookahCount} Pcs ({booking.guestCount} Guests)</strong>
            </div>
            <div>
              <span className="text-zinc-400 block">Flavors Requested:</span>
              <span className="text-amber-300">{booking.flavors.join(', ')}</span>
            </div>
          </div>

          {booking.notes && (
            <div className="pt-2 border-t border-zinc-800">
              <span className="text-zinc-400 block">Special Customer Notes:</span>
              <p className="text-zinc-200 italic mt-0.5">"{booking.notes}"</p>
            </div>
          )}
        </div>

        {/* Existing Quote Info */}
        {booking.quote && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
            <span className="font-bold text-amber-400 block uppercase">Current Quote Details:</span>
            <p className="text-sm font-extrabold text-white">₹{booking.quote.amount.toLocaleString('en-IN')}</p>
            <p className="text-zinc-300">{booking.quote.breakdown}</p>
          </div>
        )}

      </div>
    </div>
  );
}
