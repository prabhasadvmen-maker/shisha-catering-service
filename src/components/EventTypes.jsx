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
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      popularFlavors: ['Tropical Sunset Ice', 'Blueberry Freeze', 'Double Apple']
    },
    {
      id: 'Birthday Party',
      title: 'Birthday Celebrations',
      icon: FaCakeCandles,
      badge: 'Special Gift',
      tagline: 'Light Up Your Special Year With Smoke & Glow',
      description: 'Multi-color LED base hookahs with custom flavor menus customized for the birthday star and guests.',
      image: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&w=800&q=80',
      popularFlavors: ['Vanilla Ice', 'Watermelon Chill', 'Exotic Paan']
    },
    {
      id: 'Corporate',
      title: 'Corporate VIP Galas',
      icon: FaBuilding,
      badge: 'Executive',
      tagline: 'Sophisticated Lounge Networking Experience',
      description: 'Ultra-clean, odor-controlled, smokeless coconut charcoal technology designed for high-profile business summits and executive galas.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      popularFlavors: ['Gentleman Reserve', 'Citrus Chill', 'Mint Supreme']
    },
    {
      id: 'Pool Party',
      title: 'Pool & Beach Parties',
      icon: FaWater,
      badge: 'Cool Vibe',
      tagline: 'Chilled Ice Hose Attachments by the Water',
      description: 'Heavy stable bases with waterproof LED lighting and frozen handle attachments for scorching summer pool celebrations.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      popularFlavors: ['Ice Mint Blast', 'Mango Passion', 'Berry Chill']
    },
    {
      id: 'Private Party',
      title: 'Private VIP Lounges',
      icon: FaWineGlass,
      badge: 'Exclusive',
      tagline: 'Bespoke Butler Service & Imported Tobaccos',
      description: 'Exclusive 1-on-1 mixologist butler service with rare imported dark leaf blends and custom crafted pineapple fruit bowls.',
      image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80',
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
                className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group border border-zinc-800 hover:border-amber-500/40 relative"
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md text-amber-400 text-[10px] font-extrabold tracking-wider uppercase border border-amber-500/30">
                    {evt.badge}
                  </span>

                  {/* Icon floating */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-amber-500/20 backdrop-blur-md border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400/90 mt-0.5">
                      {evt.tagline}
                    </p>
                    <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  {/* Popular Flavors Tags */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                    <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Top Event Flavors:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {evt.popularFlavors.map((flv) => (
                        <span key={flv} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 text-[10px] font-medium border border-zinc-800">
                          {flv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => onSelectEventType(evt.id)}
                    className="w-full py-2.5 mt-2 rounded-xl bg-zinc-900 hover:bg-amber-500 text-amber-400 hover:text-zinc-950 text-xs font-bold uppercase tracking-wider border border-amber-500/30 hover:border-amber-500 transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
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
