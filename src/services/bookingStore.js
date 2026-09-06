// LocalStorage Booking Data Store & Mock API Service for Shisha Catering

const STORAGE_KEY = 'shisha_vip_catering_bookings';

// Default initial mock bookings for instant rich admin & client demonstration
const INITIAL_BOOKINGS = [
  {
    id: 'SHISHA-BK-94821',
    customerName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.s@example.com',
    eventType: 'Wedding',
    eventDate: '2026-09-18',
    eventTime: '19:00',
    location: 'Taj Palace Resort, Grand Ballroom, New Delhi',
    guestCount: 150,
    hookahCount: 20,
    flavors: ['Dubai VIP Mint', 'Paan Supreme', 'Citrus Chill', 'Blueberry Freeze'],
    addOns: ['LED Crystal Bases', 'Ice Hose Attachments', 'Fresh Pineapple Fruit Bowls', '2 Mixologists'],
    budget: '₹45,000 - ₹60,000',
    notes: 'Please arrange LED golden lounge setups matching the wedding theme.',
    status: 'Confirmed', // Options: New, Contacted, Quote Sent, Confirmed, Completed, Cancelled
    quote: {
      amount: 52000,
      breakdown: '20 Premium Hookahs + 2 On-Site Mixologists + Fresh Fruit Heads + Transport',
      sentAt: '2026-09-02T14:30:00Z'
    },
    createdAt: '2026-09-01T10:15:00Z'
  },
  {
    id: 'SHISHA-BK-94822',
    customerName: 'Aanya Kapoor',
    phone: '+91 99887 76655',
    email: 'aanya.k@example.com',
    eventType: 'Birthday Party',
    eventDate: '2026-09-12',
    eventTime: '20:30',
    location: 'Villa 14, Golf Links, Gurgaon',
    guestCount: 45,
    hookahCount: 8,
    flavors: ['Dubai VIP Mint', 'Tropical Sunset Ice', 'Double Apple Reserve'],
    addOns: ['LED Crystal Bases', 'Ice Hose Attachments'],
    budget: '₹20,000 - ₹30,000',
    notes: '21st Birthday bash, need high vibe smoke effects near pool side.',
    status: 'Quote Sent',
    quote: {
      amount: 24500,
      breakdown: '8 LED Hookahs + 1 Mixologist + Premium Ice Hoses',
      sentAt: '2026-09-05T09:00:00Z'
    },
    createdAt: '2026-09-04T18:20:00Z'
  },
  {
    id: 'SHISHA-BK-94823',
    customerName: 'Vikramaditya Verma',
    phone: '+91 91234 56789',
    email: 'vikram.v@corporate.com',
    eventType: 'Corporate',
    eventDate: '2026-09-25',
    eventTime: '18:00',
    location: 'DLF CyberHub Roof Top Lounge, Gurgaon',
    guestCount: 200,
    hookahCount: 25,
    flavors: ['Paan Supreme', 'Citrus Chill', 'Vanilla Ice', 'Dubai VIP Mint'],
    addOns: ['Custom Lounge Furniture', '3 Mixologists', 'Fresh Pineapple Fruit Bowls'],
    budget: '₹75,000+',
    notes: 'Annual tech company leadership gala. Require discreet and ultra-clean charcoal management.',
    status: 'Contacted',
    quote: null,
    createdAt: '2026-09-06T11:45:00Z'
  },
  {
    id: 'SHISHA-BK-94824',
    customerName: 'Sameer Khan',
    phone: '+91 98111 22334',
    email: 'sameer.k@example.com',
    eventType: 'House Party',
    eventDate: '2026-09-08',
    eventTime: '21:00',
    location: 'Sector 50, Noida',
    guestCount: 25,
    hookahCount: 6,
    flavors: ['Double Apple Reserve', 'Dubai VIP Mint'],
    addOns: ['Ice Hose Attachments'],
    budget: '₹12,000 - ₹18,000',
    notes: 'Late night chill session with friends.',
    status: 'New',
    quote: null,
    createdAt: '2026-09-06T16:00:00Z'
  }
];

export const getBookings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse bookings from localStorage', err);
    return INITIAL_BOOKINGS;
  }
};

export const getBookingById = (id) => {
  const bookings = getBookings();
  return bookings.find(b => b.id === id) || null;
};

export const saveBooking = (newBookingData) => {
  const bookings = getBookings();
  
  // Generate Booking ID
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const bookingId = `SHISHA-BK-${randomNum}`;

  const booking = {
    id: bookingId,
    ...newBookingData,
    status: 'New',
    quote: null,
    createdAt: new Date().toISOString()
  };

  const updatedBookings = [booking, ...bookings];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  return booking;
};

export const updateBookingStatus = (id, newStatus) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(b => {
    if (b.id === id) {
      return { ...b, status: newStatus };
    }
    return b;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  return updatedBookings;
};

export const saveQuote = (id, quoteAmount, breakdownNotes) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(b => {
    if (b.id === id) {
      return {
        ...b,
        status: b.status === 'New' || b.status === 'Contacted' ? 'Quote Sent' : b.status,
        quote: {
          amount: parseFloat(quoteAmount),
          breakdown: breakdownNotes,
          sentAt: new Date().toISOString()
        }
      };
    }
    return b;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  return updatedBookings;
};

export const deleteBooking = (id) => {
  const bookings = getBookings();
  const updatedBookings = bookings.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  return updatedBookings;
};

export const getStats = () => {
  const bookings = getBookings();
  const totalBookings = bookings.length;
  const newBookings = bookings.filter(b => b.status === 'New').length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const totalQuotedRevenue = bookings.reduce((sum, b) => sum + (b.quote ? b.quote.amount : 0), 0);

  return {
    totalBookings,
    newBookings,
    confirmedBookings,
    totalQuotedRevenue
  };
};
