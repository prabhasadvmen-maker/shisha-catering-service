import React, { useState, useRef } from 'react';
import { 
  FaCamera, FaVideo, FaEye, FaXmark, FaPlay, FaPause, 
  FaVolumeHigh, FaVolumeXmark, FaImage, FaFilm, FaHeart, 
  FaWineGlass, FaCrown 
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  // Lightbox video controls state
  const modalVideoRef = useRef(null);
  const [modalIsPlaying, setModalIsPlaying] = useState(true);
  const [modalIsMuted, setModalIsMuted] = useState(false);

  const galleryItems = [
    // --- 5 VIDEOS ---
    {
      id: 'v1',
      title: 'Royal Wedding Shisha Lounge Experience',
      category: 'Weddings',
      type: 'video',
      url: '/gallery/videos/gal1.mp4',
      desc: 'Live coverage of golden LED hookah catering at Taj Palace wedding reception.'
    },
    {
      id: 'v2',
      title: 'VIP Outdoor Lawn Party Atmosphere',
      category: 'Parties',
      type: 'video',
      url: '/gallery/videos/gal2.mp4',
      desc: 'High vibe night party with continuous charcoal refills & master mixologists.'
    },
    {
      id: 'v3',
      title: 'Illuminated LED Crystal Shisha Setup',
      category: 'VIP Setups',
      type: 'video',
      url: '/gallery/videos/gal3.mp4',
      desc: 'Multi-color wireless LED glass bases lighting up the party lounge.'
    },
    {
      id: 'v4',
      title: 'Poolside Sunset Shisha Lounge',
      category: 'Parties',
      type: 'video',
      url: '/gallery/videos/gal4.mp4',
      desc: 'Chilled ice hose handle attachments by the poolside cabana.'
    },
    {
      id: 'v5',
      title: 'Artisan Carved Fruit Head Preparation',
      category: 'VIP Setups',
      type: 'video',
      url: '/gallery/videos/gal5.mp4',
      desc: 'Master mixologist preparing fresh carved pineapple fruit bowls on-site.'
    },

    // --- 12 PHOTOS ---
    {
      id: 'p1',
      title: 'Gold Shisha Tower & Pineapple Fruit Bowl',
      category: 'VIP Setups',
      type: 'image',
      url: '/gallery/images/img1.png',
      desc: 'German medical grade stainless steel shisha with carved fruit top.'
    },
    {
      id: 'p2',
      title: 'Luxury Velvet Sofa Lounge Seating',
      category: 'Weddings',
      type: 'image',
      url: '/gallery/images/img2.png',
      desc: 'Tailored VIP lounge furniture setup matching wedding decor.'
    },
    {
      id: 'p3',
      title: 'Exotic Fresh Carved Fruit Shisha Bowl',
      category: 'VIP Setups',
      type: 'image',
      url: '/gallery/images/img3.png',
      desc: 'Fresh pineapple bowl packed with Dubai VIP Mint and berries.'
    },
    {
      id: 'p4',
      title: 'Night Birthday Bash Shisha Lounge',
      category: 'Parties',
      type: 'image',
      url: '/gallery/images/Img4.png',
      desc: 'Glowing LED hookahs and smoke atmosphere at birthday celebration.'
    },
    {
      id: 'p5',
      title: 'LED Base Crystal Glass Display',
      category: 'VIP Setups',
      type: 'image',
      url: '/gallery/images/imag5.png',
      desc: 'Crystal glass bases with wireless ambient color control.'
    },
    {
      id: 'p6',
      title: 'Destination Wedding Lawn Catering',
      category: 'Weddings',
      type: 'image',
      url: '/gallery/images/img6.png',
      desc: 'Outdoor royal lawn setup at luxury resort wedding in Goa.'
    },
    {
      id: 'p7',
      title: 'Master Mixologist Charcoal Heat Service',
      category: 'VIP Setups',
      type: 'image',
      url: '/gallery/images/img7.png',
      desc: 'Uniformed attendant managing organic coconut charcoals.'
    },
    {
      id: 'p8',
      title: 'Poolside Party VIP Lounge Cabana',
      category: 'Parties',
      type: 'image',
      url: '/gallery/images/img8.png',
      desc: 'Exclusive pool party setup with ice hose handles.'
    },
    {
      id: 'p9',
      title: 'Exotic Mint & Paan Flavor Bowl',
      category: 'VIP Setups',
      type: 'image',
      url: '/gallery/images/img9.png',
      desc: 'Hand-blended premium Paan Supreme tobacco with saffron.'
    },
    {
      id: 'p10',
      title: 'Corporate VIP Summit Lounge',
      category: 'Parties',
      type: 'image',
      url: '/gallery/images/imge10.png',
      desc: 'Discreet, clean, smokeless charcoal setup for networking.'
    },
    {
      id: 'p11',
      title: 'Golden Royal Shisha Setup at Night',
      category: 'Weddings',
      type: 'image',
      url: '/gallery/images/img11.png',
      desc: 'Full wedding shisha bar lit up under fairy lights.'
    },
    {
      id: 'p12',
      title: 'Chilled Ice Hose Attachment Set',
      category: 'VIP Setups',
      type: 'image',
      url: '/gallery/images/img12.png',
      desc: 'Frozen handle tubes for ultimate smooth smoke cooling.'
    }
  ];

  const filterTabs = [
    { label: 'All (17)', value: 'All', icon: FaCamera },
    { label: 'Videos (5)', value: 'Videos', icon: FaVideo },
    { label: 'Photos (12)', value: 'Photos', icon: FaImage },
    { label: 'Weddings', value: 'Weddings', icon: FaHeart },
    { label: 'Parties', value: 'Parties', icon: FaWineGlass },
    { label: 'VIP Setups', value: 'VIP Setups', icon: HiSparkles }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Videos') return item.type === 'video';
    if (filter === 'Photos') return item.type === 'image';
    return item.category === filter;
  });

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalIsPlaying) {
      modalVideoRef.current.pause();
      setModalIsPlaying(false);
    } else {
      modalVideoRef.current.play();
      setModalIsPlaying(true);
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalIsMuted;
    setModalIsMuted(!modalIsMuted);
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <FaCamera className="w-3.5 h-3.5 text-amber-400" />
            <span>Event Showcase • 12 Photos & 5 Videos</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
            Live Event <span className="text-gold-gradient">Gallery & Videos</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Explore photos and live video recordings from our past wedding catering setups, VIP house parties, LED glassware, and artisan carved fruit heads.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 ${
                  filter === tab.value
                    ? 'bg-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] font-extrabold scale-105'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-amber-500/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedMedia(item);
                setModalIsPlaying(true);
                setModalIsMuted(false);
              }}
              className="group relative rounded-2xl overflow-hidden glass-card border border-zinc-800 hover:border-amber-500/50 cursor-pointer aspect-video transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              {item.type === 'video' ? (
                <div className="relative w-full h-full bg-zinc-950">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.url}
                  />
                  
                  {/* Floating Video Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-amber-500 text-zinc-950 font-extrabold text-[10px] uppercase tracking-wider flex items-center space-x-1 shadow-md z-10">
                    <FaVideo className="w-3 h-3" />
                    <span>Live Video</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Floating Photo Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-700 text-amber-400 font-bold text-[10px] uppercase tracking-wider flex items-center space-x-1 shadow-md z-10">
                    <FaImage className="w-3 h-3" />
                    <span>Photo</span>
                  </div>
                </div>
              )}

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Title & Details */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1 z-10">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-serif-luxury text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  {item.title}
                </h3>
              </div>

              {/* Inspect / Play Icon Overlay */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/40 flex items-center justify-center text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10">
                {item.type === 'video' ? <FaPlay className="w-3.5 h-3.5 pl-0.5" /> : <FaEye className="w-3.5 h-3.5" />}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 🚀 PERFECTED MEDIA LIGHTBOX POPUP MODAL (NO EMOJIS & CLEAN CLOSE) 🚀 */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          
          <div className="relative max-w-4xl w-full bg-zinc-900/90 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border border-amber-500/30">
            
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/60">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                  {selectedMedia.type === 'video' ? <FaVideo className="w-4 h-4" /> : <FaImage className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block">
                    {selectedMedia.category} • {selectedMedia.type === 'video' ? 'Live Video Recording' : 'High-Resolution Photo'}
                  </span>
                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white leading-tight">
                    {selectedMedia.title}
                  </h3>
                </div>
              </div>

              {/* Prominent Close X Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="w-10 h-10 rounded-full bg-zinc-800/90 text-zinc-300 hover:text-amber-400 border border-zinc-700 flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                title="Close Modal"
              >
                <FaXmark className="w-5 h-5" />
              </button>
            </div>

            {/* Media Player Viewport */}
            <div className="relative w-full bg-zinc-950 aspect-video flex items-center justify-center overflow-hidden">
              {selectedMedia.type === 'video' ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={modalVideoRef}
                    autoPlay
                    loop
                    muted={modalIsMuted}
                    playsInline
                    className="w-full h-full object-contain"
                    src={selectedMedia.url}
                  />

                  {/* Floating Video Controls */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 z-20 bg-zinc-950/85 backdrop-blur-md p-2 rounded-xl border border-zinc-800 shadow-xl">
                    <button
                      onClick={toggleModalPlay}
                      className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition-colors border border-amber-500/30"
                      title={modalIsPlaying ? 'Pause' : 'Play'}
                    >
                      {modalIsPlaying ? <FaPause className="w-3.5 h-3.5" /> : <FaPlay className="w-3.5 h-3.5 pl-0.5" />}
                    </button>

                    <button
                      onClick={toggleModalMute}
                      className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-300 hover:text-white flex items-center space-x-2 text-xs font-bold border border-zinc-800 transition-colors"
                    >
                      {modalIsMuted ? <FaVolumeXmark className="w-3.5 h-3.5 text-amber-400" /> : <FaVolumeHigh className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{modalIsMuted ? 'Unmute Sound' : 'Sound On'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain bg-zinc-950"
                />
              )}
            </div>

            {/* Modal Description Footer */}
            <div className="p-4 sm:p-5 bg-zinc-950/80 border-t border-zinc-800/80">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedMedia.desc}
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
