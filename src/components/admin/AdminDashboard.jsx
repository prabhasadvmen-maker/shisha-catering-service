import React, { useState, useEffect } from 'react';
import { 
  Flame, LayoutDashboard, Calendar, Search, Filter, Phone, MessageSquare, 
  Send, Eye, RefreshCw, TrendingUp, CheckCircle, Clock, DollarSign, PlusCircle 
} from 'lucide-react';
import { getBookings, updateBookingStatus, getStats } from '../../services/bookingStore';
import QuoteModal from './QuoteModal';
import BookingDetailModal from './BookingDetailModal';
import AdminCalendar from './AdminCalendar';

export default function AdminDashboard({ onNewBookingClick, onReturnLanding }) {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'calendar'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [selectedQuoteBooking, setSelectedQuoteBooking] = useState(null);
  const [selectedDetailBooking, setSelectedDetailBooking] = useState(null);

  const reloadData = () => {
    setBookings(getBookings());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const stats = getStats();

  const statuses = ['All', 'New', 'Contacted', 'Quote Sent', 'Confirmed', 'Completed', 'Cancelled'];

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      !searchTerm ||
      b.customerName.toLowerCase().includes(searchLower) ||
      b.phone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchLower) ||
      b.eventType.toLowerCase().includes(searchLower) ||
      b.location.toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id, newStatus) => {
    const updated = updateBookingStatus(id, newStatus);
    setBookings(updated);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-8">
      
      {/* Top Admin Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin Booking Control Center</span>
          </div>
          <h1 className="font-serif-luxury text-3xl font-extrabold text-white">
            Shisha Event Catering <span className="text-gold-gradient">Dashboard</span>
          </h1>
          <p className="text-xs text-zinc-400">
            Manage incoming event catering requests, send custom price quotes, and coordinate mixologist calendar schedules.
          </p>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={onReturnLanding}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold uppercase tracking-wider"
          >
            ← Client View
          </button>
          
          <button
            onClick={onNewBookingClick}
            className="px-4 py-2.5 rounded-xl bg-gold-gradient text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Booking</span>
          </button>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Requests</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif-luxury text-3xl font-bold text-white">
            {stats.totalBookings}
          </p>
          <span className="text-[11px] text-zinc-400">All recorded event inquiries</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>New Action Required</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <p className="font-serif-luxury text-3xl font-bold text-blue-400">
            {stats.newBookings}
          </p>
          <span className="text-[11px] text-zinc-400">Awaiting initial review</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Confirmed Events</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-serif-luxury text-3xl font-bold text-emerald-400">
            {stats.confirmedBookings}
          </p>
          <span className="text-[11px] text-zinc-400">Ready for on-site delivery</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Estimated Revenue</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif-luxury text-2xl font-bold text-amber-400">
            ₹{stats.totalQuotedRevenue.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-zinc-400">From active event quotes</span>
        </div>
      </div>

      {/* Main View Switcher & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-zinc-800">
        
        {/* View Toggle */}
        <div className="flex space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 border transition-all ${
              activeTab === 'list'
                ? 'bg-amber-500 text-zinc-950 border-amber-500 font-extrabold shadow-md'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Bookings Table</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 border transition-all ${
              activeTab === 'calendar'
                ? 'bg-amber-500 text-zinc-950 border-amber-500 font-extrabold shadow-md'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events Calendar</span>
          </button>
        </div>

        {/* Search Input */}
        {activeTab === 'list' && (
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search Name, Phone, ID or Location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Tab 1: Bookings List */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          
          {/* Status Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                  statusFilter === st
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="glass-card rounded-3xl overflow-hidden border border-zinc-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/90 text-zinc-400 font-bold uppercase tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="p-4">Booking ID / Client</th>
                    <th className="p-4">Event Occasion & Date</th>
                    <th className="p-4">Location & Specs</th>
                    <th className="p-4">Flavors</th>
                    <th className="p-4">Quote / Status</th>
                    <th className="p-4 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-zinc-400">
                        No bookings found matching filter standard.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((bk) => (
                      <tr key={bk.id} className="hover:bg-zinc-900/50 transition-colors">
                        
                        {/* ID & Client */}
                        <td className="p-4">
                          <span className="font-serif-luxury font-bold text-amber-400 block text-sm">
                            {bk.id}
                          </span>
                          <span className="font-semibold text-white block">{bk.customerName}</span>
                          <span className="text-zinc-400 text-[11px]">{bk.phone}</span>
                        </td>

                        {/* Event & Date */}
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-zinc-900 text-amber-300 font-bold border border-zinc-800 inline-block mb-1">
                            {bk.eventType}
                          </span>
                          <span className="text-zinc-200 block">{bk.eventDate} at {bk.eventTime}</span>
                        </td>

                        {/* Location & Specs */}
                        <td className="p-4">
                          <span className="text-zinc-300 truncate max-w-xs block" title={bk.location}>
                            {bk.location}
                          </span>
                          <span className="text-amber-400 font-medium text-[11px]">
                            {bk.hookahCount} Hookahs ({bk.guestCount} Guests)
                          </span>
                        </td>

                        {/* Flavors */}
                        <td className="p-4 max-w-xs">
                          <span className="text-zinc-300 truncate block">
                            {bk.flavors.join(', ')}
                          </span>
                          {bk.addOns && bk.addOns.length > 0 && (
                            <span className="text-[10px] text-purple-300 block">
                              + {bk.addOns.join(', ')}
                            </span>
                          )}
                        </td>

                        {/* Quote & Status Selector */}
                        <td className="p-4 space-y-1">
                          <select
                            value={bk.status}
                            onChange={(e) => handleStatusChange(bk.id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-amber-500/40 text-amber-300 text-xs font-bold focus:outline-none"
                          >
                            {statuses.filter(s => s !== 'All').map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>

                          {bk.quote ? (
                            <span className="text-emerald-400 font-bold block text-xs">
                              ₹{bk.quote.amount.toLocaleString('en-IN')}
                            </span>
                          ) : (
                            <span className="text-zinc-400 text-[10px] italic block">No quote sent</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <a
                              href={`tel:${bk.phone}`}
                              title="Call Client"
                              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => setSelectedQuoteBooking(bk)}
                              title="Send / Edit Quote"
                              className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setSelectedDetailBooking(bk)}
                              title="Inspect Full Booking Details"
                              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Admin Calendar View */}
      {activeTab === 'calendar' && (
        <AdminCalendar
          bookings={bookings}
          onSelectBooking={(bk) => setSelectedDetailBooking(bk)}
        />
      )}

      {/* Quote Generator Modal */}
      {selectedQuoteBooking && (
        <QuoteModal
          booking={selectedQuoteBooking}
          onClose={() => setSelectedQuoteBooking(null)}
          onQuoteSent={(updated) => {
            setBookings(updated);
            setSelectedQuoteBooking(null);
          }}
        />
      )}

      {/* Booking Detail Modal */}
      {selectedDetailBooking && (
        <BookingDetailModal
          booking={selectedDetailBooking}
          onClose={() => setSelectedDetailBooking(null)}
          onStatusChanged={(updated) => {
            setBookings(updated);
          }}
        />
      )}

    </div>
  );
}
