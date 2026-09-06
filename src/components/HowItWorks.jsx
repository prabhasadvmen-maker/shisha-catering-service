import React from 'react';
import { FaCalendarDays, FaSliders, FaFileInvoice, FaCircleCheck } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Submit Event Details',
      desc: 'Tell us your event date, venue location, guest count, and estimated hookah quantity needed.',
      icon: FaCalendarDays
    },
    {
      num: '02',
      title: 'Customize Flavor & Setup',
      desc: 'Choose your favorite flavor blends, LED base colors, and optional fresh fruit carved heads.',
      icon: FaSliders
    },
    {
      num: '03',
      title: 'Get Quote & Booking ID',
      desc: 'Receive an instant itemized price quote and a unique Booking ID to track your event status.',
      icon: FaFileInvoice
    },
    {
      num: '04',
      title: 'VIP On-Site Service',
      desc: 'Our uniformed mixologist crew arrives 1 hour early for complete setup, coal management & clean teardown.',
      icon: HiSparkles
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/80 relative z-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <FaCircleCheck className="w-3.5 h-3.5" />
            <span>Hassle-Free Event Booking Process</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
            How Shisha Event Catering <span className="text-gold-gradient">Works</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            From initial booking to full on-site mixologist service, we handle everything seamlessly so you can enjoy your party.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="glass-card p-6 rounded-2xl border border-zinc-800 space-y-4 relative group hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif-luxury text-3xl font-extrabold text-zinc-700 group-hover:text-amber-500/60 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
