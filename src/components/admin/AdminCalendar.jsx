import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Flame, MapPin, Phone, Users } from 'lucide-react';

export default function AdminCalendar({ bookings, onSelectBooking }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateBookings, setSelectedDateBookings] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Days in month calculation
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Group bookings by date string YYYY-MM-DD
  const bookingsByDate = {};
  bookings.forEach(b => {
    if (b.eventDate) {
      if (!bookingsByDate[b.eventDate]) {
        bookingsByDate[b.eventDate] = [];
      }
      bookingsByDate[b.eventDate].push(b);
    }
  });

  const calendarCells = [];
  // Empty padding cells for previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }
  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  const handleDayClick = (day) => {
    if (!day) return;
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month + 1).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

    const dateBookings = bookingsByDate[dateStr] || [];
    setSelectedDateBookings({ date: dateStr, list: dateBookings });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex items-center justify-between glass-card p-4 rounded-2xl border border-zinc-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif-luxury text-xl font-bold text-white">
              {monthNames[month]} {year}
            </h2>
            <p className="text-xs text-amber-400 font-medium">
              Event Catering Schedule Calendar
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/40"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Calendar View */}
        <div className="lg:col-span-8 glass-card p-6 rounded-3xl border border-zinc-800 space-y-4">
          
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-zinc-400 uppercase tracking-wider pb-2 border-b border-zinc-800">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="h-24 bg-zinc-950/40 rounded-xl opacity-30" />;
              }

              const formattedDay = String(day).padStart(2, '0');
              const formattedMonth = String(month + 1).padStart(2, '0');
              const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

              const dayEvents = bookingsByDate[dateStr] || [];
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year;

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => handleDayClick(day)}
                  className={`h-24 p-2 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                    dayEvents.length > 0
                      ? 'bg-amber-500/10 border-amber-500/50 hover:bg-amber-500/20'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-800/80'
                  } ${isToday ? 'ring-2 ring-amber-400' : ''}`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${isToday ? 'text-amber-400' : 'text-zinc-300'}`}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 font-extrabold text-[10px] flex items-center justify-center">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((evt) => (
                      <div
                        key={evt.id}
                        className="px-1.5 py-0.5 rounded bg-zinc-950/90 text-amber-300 text-[9px] font-semibold truncate border border-amber-500/30"
                      >
                        {evt.eventType} - {evt.customerName.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Inspector Drawer */}
        <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-zinc-800 space-y-4">
          <h3 className="font-serif-luxury text-lg font-bold text-white border-b border-zinc-800 pb-3 flex items-center justify-between">
            <span>Scheduled Events</span>
            <span className="text-xs text-amber-400 font-sans">
              {selectedDateBookings ? selectedDateBookings.date : 'Click a date'}
            </span>
          </h3>

          {!selectedDateBookings ? (
            <p className="text-xs text-zinc-400 italic py-8 text-center">
              Select any date on the calendar to inspect event bookings and mixologist schedules.
            </p>
          ) : selectedDateBookings.list.length === 0 ? (
            <p className="text-xs text-zinc-400 py-8 text-center">
              No events scheduled for {selectedDateBookings.date}.
            </p>
          ) : (
            <div className="space-y-3">
              {selectedDateBookings.list.map((bk) => (
                <div
                  key={bk.id}
                  onClick={() => onSelectBooking(bk)}
                  className="p-4 rounded-2xl bg-zinc-900 border border-amber-500/30 space-y-2 cursor-pointer hover:border-amber-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif-luxury text-sm font-bold text-amber-400">
                      {bk.eventType}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      {bk.status}
                    </span>
                  </div>

                  <p className="text-xs text-white font-semibold">{bk.customerName}</p>
                  
                  <div className="text-[11px] text-zinc-400 space-y-1">
                    <p className="flex items-center space-x-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>{bk.hookahCount} Hookahs ({bk.guestCount} Guests)</span>
                    </p>
                    <p className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span className="truncate">{bk.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
