import React, { useState } from 'react';
import { 
  FaFire, FaShieldHalved, FaUsers, FaCircleCheck, FaWind, 
  FaGlassWater, FaLemon, FaCheck 
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function ServicesMenu() {
  const [activeTab, setActiveTab] = useState('flavors');

  const flavors = [
    { name: 'Dubai VIP Mint', category: 'Ice & Fresh', desc: 'Ultra-chilled icy peppermint with sweet Arabic herbal notes.', tag: 'Bestseller' },
    { name: 'Paan Supreme', category: 'Traditional Luxury', desc: 'Rich Betel leaf infused with saffron, rose petal preserve & cardamom.', tag: 'Signature' },
    { name: 'Tropical Sunset Ice', category: 'Exotic Fruit', desc: 'Crushed passion fruit, juicy mango, and frozen papaya blast.', tag: 'Party Favorite' },
    { name: 'Citrus Chill', category: 'Citrus Blast', desc: 'Tart grapefruit, key lime, and orange zest with a cool menthol finish.', tag: 'Popular' },
    { name: 'Blueberry Freeze', category: 'Berry Fusion', desc: 'Sweet wild blueberries crushed with icy cooling crystal burst.', tag: 'Trending' },
    { name: 'Double Apple Reserve', category: 'Classic Vintage', desc: 'Rich anise and caramelized green-red apple fusion for connoisseurs.', tag: 'Classic' },
    { name: 'Watermelon Frost', category: 'Exotic Fruit', desc: 'Juicy summer watermelon served with fresh ice hose attachment.', tag: 'Fresh' },
    { name: 'Spiced Paan Vanilla', category: 'Dessert & Cream', desc: 'Velvety vanilla cream blended with aromatic royal paan notes.', tag: 'VIP Exclusive' }
  ];

  const features = [
    {
      title: 'German Stainless Steel Pipes',
      desc: '100% rust-proof medical grade steel hookahs for clean smoke airflow and luxury appearance.',
      icon: FaShieldHalved
    },
    {
      title: 'Multi-Color LED Crystal Bases',
      desc: 'Wireless LED lights integrated into hookah bases to light up your event venue atmosphere.',
      icon: HiSparkles
    },
    {
      title: 'Fresh Carved Fruit Bowls',
      desc: 'Hand-crafted Pineapple, Watermelon, or Grapefruit fruit heads for enhanced flavor smoothness.',
      icon: FaLemon
    },
    {
      title: 'On-Site Mixologist Staff',
      desc: 'Uniformed shisha masters handling bowl packing, continuous charcoal management & clean teardown.',
      icon: FaUsers
    },
    {
      title: '100% Hygienic Service',
      desc: 'Individual sealed disposable mouthpiece tips provided for every guest at your event.',
      icon: FaCircleCheck
    },
    {
      title: 'Smokeless Coconut Coals',
      desc: 'Eco-friendly organic coconut charcoals with zero smell, zero ash mess, and long burning duration.',
      icon: FaWind
    }
  ];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/60 relative z-10 border-t border-b border-zinc-900">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <FaFire className="w-3.5 h-3.5" />
            <span>Premium On-Site Catering Standard</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
            World-Class Hookah Setups & <span className="text-gold-gradient">Exotic Flavor Menu</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            We don't just deliver hookahs—we create an unforgettable VIP lounge setup at your venue with top-tier equipment and gourmet tobacco blends.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('flavors')}
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'flavors'
                ? 'bg-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] font-extrabold'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
            }`}
          >
            Exotic Flavor Blends Menu
          </button>
          <button
            onClick={() => setActiveTab('setup')}
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'setup'
                ? 'bg-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] font-extrabold'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
            }`}
          >
            VIP Equipment & Service Standards
          </button>
        </div>

        {/* Tab 1: Flavors Menu */}
        {activeTab === 'flavors' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flavors.map((flv) => (
              <div
                key={flv.name}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-zinc-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      {flv.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[9px] font-extrabold">
                      {flv.tag}
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white mt-2">
                    {flv.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {flv.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Smoke Density:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className={`w-2 h-2 rounded-full ${i <= 4 ? 'bg-amber-400' : 'bg-zinc-800'}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: VIP Equipment & Setup */}
        {activeTab === 'setup' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="glass-card p-6 rounded-2xl border border-zinc-800 space-y-4 hover:border-amber-500/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
