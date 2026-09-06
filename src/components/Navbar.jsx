import React, { useState, useEffect } from 'react';
import { FaFire, FaPhone, FaBars, FaXmark, FaHouse } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Events', href: '#events' },
    { label: 'Services & Flavors', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-amber-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-gradient-to-b from-zinc-950/95 via-zinc-950/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#"
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <FaFire className="w-5 h-5 text-amber-400 group-hover:animate-bounce" />
          </div>
          <div>
            <span className="font-serif-luxury text-xl font-bold tracking-widest text-zinc-100 group-hover:text-amber-400 transition-colors">
              SHISHA<span className="text-amber-500">VIP</span>
            </span>
            <span className="block text-[9px] tracking-widest text-amber-400/90 font-semibold uppercase -mt-1">
              Event Hookah Catering
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Phone Concierge & Book Event Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="tel:+919876543210"
            className="flex items-center space-x-2 text-xs font-semibold text-zinc-300 hover:text-amber-400 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 transition-colors"
          >
            <FaPhone className="w-3 h-3 text-amber-400" />
            <span>+91 98765 43210</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden rounded-xl px-5 py-2.5 bg-gold-gradient font-extrabold text-zinc-950 text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2"
          >
            <HiSparkles className="w-4 h-4" />
            <span>Book Your Event</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800"
          >
            {mobileMenuOpen ? <FaXmark className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-amber-500/30 px-6 py-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-amber-400 text-sm font-semibold uppercase tracking-wider py-1.5 flex items-center space-x-2 border-b border-zinc-900"
              >
                {item.label === 'Home' && <FaHouse className="w-3.5 h-3.5 text-amber-400" />}
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-2 space-y-3">
            <a
              href="tel:+919876543210"
              className="w-full py-2.5 rounded-xl bg-zinc-900 text-amber-400 font-bold text-xs flex items-center justify-center space-x-2 border border-zinc-800"
            >
              <FaPhone className="w-3 h-3" />
              <span>Call Concierge: +91 98765 43210</span>
            </a>

            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-gold-gradient rounded-xl font-extrabold text-zinc-950 text-center uppercase tracking-wider text-xs shadow-lg flex items-center justify-center space-x-2"
            >
              <HiSparkles className="w-4 h-4" />
              <span>Book Your Event Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
