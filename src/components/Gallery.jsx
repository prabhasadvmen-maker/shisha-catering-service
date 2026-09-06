import React, { useState } from 'react';
import { FaCamera, FaEye, FaXmark } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Grand Royal Wedding Lounge',
      category: 'Weddings',
      image: '/assets/wedding_shisha.png',
      desc: 'Golden crystal shisha lounge setup at Taj Palace Wedding.'
    },
    {
      id: 2,
      title: 'VIP Illuminated Night Bar',
      category: 'Closeups',
      image: '/assets/hero_hookah.png',
      desc: 'LED multi-color base crystal pipes with amber smoke.'
    },
    {
      id: 3,
      title: 'Pool Side VIP Sunset Party',
      category: 'Pool Parties',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      desc: 'Chilled ice hose setups next to luxury infinity pool.'
    },
    {
      id: 4,
      title: 'House Party Shisha Bar',
      category: 'House Parties',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
      desc: 'High energy birthday lounge setup inside private villa.'
    },
    {
      id: 5,
      title: 'Carved Pineapple Fruit Bowl',
      category: 'Closeups',
      image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1000&q=80',
      desc: 'Hand carved fresh pineapple fruit head with mint leaves.'
    },
    {
      id: 6,
      title: 'Corporate Executive Lounge',
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
      desc: 'Discreet and elegant lounge for summit attendees.'
    }
  ];

  const categories = ['All', 'Weddings', 'House Parties', 'Pool Parties', 'Closeups'];

  const filteredItems = filter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <FaCamera className="w-3.5 h-3.5" />
            <span>Event Highlights & Visual Setup Gallery</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
            Experience the <span className="text-gold-gradient">VIP Vibe</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Take a look at our past event setups, luxury glassware, carved fruit heads, and vibrant party atmospheres.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? 'bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] font-extrabold'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden glass-card border border-zinc-800 cursor-pointer aspect-video"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold uppercase">
                  {item.category}
                </span>
                <h3 className="font-serif-luxury text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/40 flex items-center justify-center text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <FaEye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full glass-card rounded-3xl overflow-hidden border border-amber-500/40 p-2.5 shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-zinc-950/90 text-white hover:text-amber-400 border border-zinc-700 flex items-center justify-center shadow-lg"
            >
              <FaXmark className="w-5 h-5" />
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] object-cover rounded-2xl"
            />
            <div className="p-6 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {selectedImage.category}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                {selectedImage.title}
              </h3>
              <p className="text-xs text-zinc-300">
                {selectedImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
