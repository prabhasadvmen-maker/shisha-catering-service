import React from 'react';
import { FaFire, FaPhone, FaEnvelope, FaLocationDot, FaInstagram } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <FaFire className="w-4 h-4" />
              </div>
              <span className="font-serif-luxury text-xl font-bold tracking-widest text-zinc-100">
                SHISHA<span className="text-amber-500">VIP</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              India's Premier Event Shisha Catering Service. Bringing bespoke German stainless steel hookahs, illuminated lounge setups, and master mixologists to your celebrations.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#events" className="hover:text-amber-400 transition-colors">Event Occasions</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Services & Flavor Menu</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">Catering Packages</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How Booking Works</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Visual Gallery</a></li>
            </ul>
          </div>

          {/* Col 3: Service Locations */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Locations Served
            </h4>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-center space-x-2">
                <FaLocationDot className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span>Delhi NCR & Lutyens Delhi</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaLocationDot className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span>Gurgaon Golf Course & CyberHub</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaLocationDot className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span>Noida & Greater Noida West</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaLocationDot className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span>Destination Weddings (Goa, Jaipur, Udaipur)</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaLocationDot className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span>Private Farmhouses & VIP Resorts</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Booking */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Concierge & Booking
            </h4>
            <div className="space-y-2 text-zinc-300">
              <a href="tel:+919876543210" className="flex items-center space-x-2 hover:text-amber-400 transition-colors">
                <FaPhone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:events@shishavipcatering.com" className="flex items-center space-x-2 hover:text-amber-400 transition-colors">
                <FaEnvelope className="w-3.5 h-3.5 text-amber-400" />
                <span>events@shishavipcatering.com</span>
              </a>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-zinc-950 font-extrabold uppercase tracking-wider text-[11px] shadow-md hover:brightness-110 transition-all flex items-center justify-center space-x-2"
            >
              <HiSparkles className="w-3.5 h-3.5" />
              <span>Book Event Now</span>
            </button>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} SHISHA VIP Event Catering. All Rights Reserved.</p>
          <p className="text-zinc-400">Pure Herbal & Exotic Artisan Tobacco Catering Services</p>
        </div>

      </div>
    </footer>
  );
}
