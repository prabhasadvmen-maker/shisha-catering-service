import React from 'react';
import { 
  FaHeart, FaHouse, FaCakeCandles, FaBuilding, FaWater, FaWineGlass, 
  FaChevronRight, FaCrown 
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function EventTypes({ onSelectEventType }) {
  const events = [
    {
      id: 'Wedding',
      title: 'Weddings & Engagements',
      icon: FaHeart,
      badge: 'Most Popular',
      tagline: 'Royal Lounge Setup for Your Special Day',
      description: 'Elegant gold shisha towers, hand-carved fruit heads, and dedicated lounge mixologist staff matching your wedding aesthetic.',
      image: '/assets/wedding_shisha.png',
      popularFlavors: ['Dubai VIP Mint', 'Paan Supreme', 'Citrus Chill']
    },
    {
      id: 'House Party',
      title: 'House & Backyard Parties',
      icon: FaHouse,
      badge: 'High Vibe',
      tagline: 'Turn Your Home Into a Private VIP Lounge',
      description: 'Compact yet powerful LED shisha setups, ice hoses, and quick ember management so you host effortlessly.',
      image: '/assets/house_party_hookah.png',
      popularFlavors: ['Tropical Sunset Ice', 'Blueberry Freeze', 'Double Apple']
    },
    {
      id: 'Birthday Party',
      title: 'Birthday Celebrations',
      icon: FaCakeCandles,
      badge: 'Special Gift',
      tagline: 'Light Up Your Special Year With Smoke & Glow',
      description: 'Multi-color LED base hookahs with custom flavor menus customized for the birthday star and guests.',
      image: '/assets/birthday_party_hookah.png',
      popularFlavors: ['Vanilla Ice', 'Watermelon Chill', 'Exotic Paan']
    },
    {
      id: 'Corporate',
      title: 'Corporate VIP Galas',
      icon: FaBuilding,
      badge: 'Executive',
      tagline: 'Sophisticated Lounge Networking Experience',
      description: 'Ultra-clean, odor-controlled, smokeless coconut charcoal technology designed for high-profile business summits and executive galas.',
      image: '/gallery/images/imge10.png',
      popularFlavors: ['Gentleman Reserve', 'Citrus Chill', 'Mint Supreme']
    },
    {
      id: 'Pool Party',
      title: 'Pool & Beach Parties',
      icon: FaWater,
      badge: 'Cool Vibe',
      tagline: 'Chilled Ice Hose Attachments by the Water',
      description: 'Heavy stable bases with waterproof LED lighting and frozen handle attachments for scorching summer pool celebrations.',
      image: '/gallery/images/img8.png',
      popularFlavors: ['Ice Mint Blast', 'Mango Passion', 'Berry Chill']
    },
    {
      id: 'Private Party',
      title: 'Private VIP Lounges',
      icon: FaWineGlass,
      badge: 'Exclusive',
      tagline: 'Bespoke Butler Service & Imported Tobaccos',
      description: 'Exclusive 1-on-1 mixologist butler service with rare imported dark leaf blends and custom crafted pineapple fruit bowls.',
      image: '/gallery/images/img3.png',
      popularFlavors: ['Dark Leaf Reserve', 'Spiced Paan', 'Royal Gold Mint']
    }
  ];

  return (
    <section id="events" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <HiSparkles className="w-4 h-4" />
            <span>Tailored Catering For Every Occasion</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
            We Service All Types of <span className="text-gold-gradient">Events & Parties</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Select your occasion to get specialized hookahs, customized flavor bars, and dedicated mixologist attendants tailored for your venue.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((evt) => {
            const Icon = evt.icon;
            return (
              <div
                key={evt.id}
                className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between group border border-amber-500/30 hover:border-amber-500/70 relative shadow-2xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]"
              >
                {/* Image Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0811] via-[#0a0811]/40 to-transparent opacity-90" />
                  
                  {/* Badge */}
                  <span className="absolute top-3.5 right-3.5 px-3.5 py-1 rounded-full bg-[#040407]/90 backdrop-blur-md text-amber-400 text-[10px] font-extrabold tracking-widest uppercase border border-amber-500/40 shadow-lg">
                    {evt.badge}
                  </span>

                  {/* Icon floating */}
                  <div className="absolute bottom-3.5 left-4 w-11 h-11 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-500/60 flex items-center justify-center text-amber-400 shadow-xl group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-[#080612]/60">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400/90 mt-1">
                      {evt.tagline}
                    </p>
                    <p className="text-xs text-zinc-300 mt-3 leading-relaxed font-light">
                      {evt.description}
                    </p>
                  </div>

                  {/* Popular Flavors Tags */}
                  <div className="space-y-2 pt-3 border-t border-amber-500/20">
                    <p className="text-[10px] uppercase font-extrabold text-amber-400/80 tracking-widest">Signature Flavors:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {evt.popularFlavors.map((flv) => (
                        <span key={flv} className="px-2.5 py-1 rounded-lg bg-[#141022] text-amber-300 text-[10px] font-semibold border border-amber-500/20">
                          {flv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => onSelectEventType(evt.id)}
                    className="w-full py-3 mt-2 rounded-xl bg-amber-500/15 hover:bg-gold-gradient text-amber-400 hover:text-zinc-950 text-xs font-extrabold uppercase tracking-wider border border-amber-500/40 hover:border-amber-400 transition-all duration-300 flex items-center justify-center space-x-2 group/btn shadow-md hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  >
                    <span>Book {evt.title}</span>
                    <FaChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
