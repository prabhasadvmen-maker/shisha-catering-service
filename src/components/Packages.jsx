import React from 'react';
import { FaCheck, FaArrowRight } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function Packages({ onSelectPackage }) {
  const packages = [
    {
      id: 'silver',
      name: 'Silver House Party',
      tagline: 'Perfect for intimate house gatherings & small birthdays',
      price: '₹18,500',
      period: 'up to 30 guests',
      hookahCount: 8,
      popular: false,
      features: [
        '8 Premium German Stainless Steel Hookahs',
        '4 Artisan Flavor Selections',
        '4 Hours On-Site Service Duration',
        '1 Uniformed Mixologist Attendant',
        'Smokeless Coconut Charcoals & Refills',
        'Sealed Hygienic Mouthpiece Tips for Guests',
        'Ice Hose Attachments Included'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Lounge Package',
      tagline: 'Our most popular setup for high vibe parties & galas',
      price: '₹34,000',
      period: 'up to 80 guests',
      hookahCount: 15,
      popular: true,
      badge: 'Most Popular',
      features: [
        '15 German LED Crystal Glass Hookahs',
        '8 Exotic Flavor Selections',
        '6 Hours On-Site Service Duration',
        '2 Certified Mixologist Attendants',
        'Fresh Hand-Carved Pineapple Fruit Bowls (4x)',
        'Frozen Ice Hose Handle Attachments',
        'Ambient LED Base Lounge Lighting',
        'Continuous Charcoal Refills & Flavor Shifts'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum Royal VIP Gala',
      tagline: 'Ultimate luxury experience for Weddings & Grand Galas',
      price: '₹65,000+',
      period: '100+ guests',
      hookahCount: 25,
      popular: false,
      features: [
        '25+ Custom Gold & Crystal Shisha Towers',
        'Unlimited Refills & Complete Flavor Bar',
        '8 Hours On-Site Full Event Service',
        '3 Master Mixologists & Dedicated Butler',
        'Fresh Carved Pineapple, Watermelon & Grapefruit Bowls',
        'Custom Velvet VIP Lounge Seating (Optional add-on)',
        'Live Artisan Flavor Blending Bar',
        'Priority Setup & Dedicated Event Director'
      ]
    }
  ];

  return (
    <section id="packages" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <HiSparkles className="w-3.5 h-3.5" />
            <span>Transparent Event Packages</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
            Choose Your <span className="text-gold-gradient">Catering Package</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Select a package that fits your event size or request a completely customized quote with custom hookah quantities and flavor menus.
          </p>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                pkg.popular
                  ? 'border-2 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.35)] bg-gradient-to-b from-[#18122c] to-[#0a0714] transform hover:-translate-y-2'
                  : 'border border-amber-500/30 hover:border-amber-500/60 bg-[#090714]/80 hover:-translate-y-1'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gold-gradient text-zinc-950 font-extrabold text-[11px] uppercase tracking-widest shadow-xl flex items-center space-x-1.5 border border-amber-300">
                  <HiSparkles className="w-3.5 h-3.5" />
                  <span>{pkg.badge}</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-2xl font-extrabold text-white">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-zinc-300 font-light mt-1">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="py-4 border-t border-b border-amber-500/20 flex items-baseline justify-between">
                  <div>
                    <span className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-gold-gradient drop-shadow">
                      {pkg.price}
                    </span>
                    <span className="text-[11px] text-zinc-400 block font-medium mt-0.5">
                      Est. Package Starting Price
                    </span>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#141024] text-amber-300 text-xs font-semibold border border-amber-500/30">
                    {pkg.period}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-amber-400">Package Inclusions:</p>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start space-x-3 text-xs text-zinc-200">
                        <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/50 shadow-sm">
                          <FaCheck className="w-2.5 h-2.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 ${
                    pkg.popular
                      ? 'bg-gold-gradient hover:brightness-110 text-zinc-950 shadow-[0_0_30px_rgba(245,158,11,0.5)]'
                      : 'bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-zinc-950 border border-amber-500/40'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <FaArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Event Banner */}
        <div className="glass-card rounded-2xl p-8 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-amber-500/10 via-zinc-950 to-purple-600/10">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              Need a Custom Event Plan or Mega VIP Setup?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Have 200+ guests or special venue requirements? We customize hookah counts, flavor themes, and mixologist teams for any scale.
            </p>
          </div>
          <button
            onClick={() => onSelectPackage({ name: 'Custom Package', hookahCount: 20 })}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex-shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
          >
            Get Custom Event Quote
          </button>
        </div>

      </div>
    </section>
  );
}
