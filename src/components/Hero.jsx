import React, { useRef, useState } from 'react';
import { 
  FaFire, FaArrowRight, FaCrown, FaStar, FaShieldHalved, 
  FaPlay, FaPause, FaVolumeHigh, FaVolumeXmark, FaCheck, FaGem 
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function Hero({ onOpenBooking }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      
      {/* 🎬 FULL HERO BACKGROUND VIDEO 🎬 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover scale-105"
          src="/assets/hero_video.mp4"
        />
        
        {/* Dark Royal Luxury Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040407] via-[#080612]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040407] via-transparent to-[#040407]/90" />
      </div>

      {/* Floating Sound & Video Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-3 bg-zinc-950/80 backdrop-blur-xl border border-amber-500/40 p-2 rounded-2xl shadow-2xl">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-zinc-950 border border-amber-500/40 flex items-center justify-center transition-all duration-300"
          title={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4 pl-0.5" />}
        </button>

        <button
          onClick={toggleMute}
          className="px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-zinc-950 border border-amber-500/40 flex items-center space-x-2 text-xs font-bold transition-all duration-300"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <>
              <FaVolumeXmark className="w-4 h-4 text-amber-400" />
              <span>Unmute Sound</span>
            </>
          ) : (
            <>
              <FaVolumeHigh className="w-4 h-4 text-amber-400" />
              <span>Sound On</span>
            </>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Column - Main Copy */}
        <div className="lg:col-span-8 space-y-8 text-center lg:text-left">
          
          {/* VIP Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.25)]">
            <FaFire className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Exclusive Event Hookah Catering Service</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>

          {/* Headline */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Transform Your Event With <br className="hidden sm:block" />
            <span className="text-gold-gradient drop-shadow-[0_4px_35px_rgba(245,158,11,0.45)]">
              Luxury Shisha Lounge Catering
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-zinc-300 text-base sm:text-xl max-w-3xl mx-auto lg:mx-0 font-light leading-relaxed drop-shadow">
            We bring the full VIP lounge experience directly to your venue. German stainless steel hookahs, illuminated LED crystal bases, certified master mixologists, and fresh hand-carved fruit heads for <strong className="text-white font-semibold">Weddings, Birthdays, House Parties & Corporate VIP Galas</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-9 py-4.5 bg-gold-gradient hover:brightness-110 font-extrabold text-zinc-950 rounded-xl text-xs uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-3 group"
            >
              <HiSparkles className="w-4 h-4" />
              <span>Book Your Event Now</span>
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#packages"
              className="w-full sm:w-auto px-8 py-4.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 hover:border-amber-500/50 rounded-xl text-xs font-extrabold uppercase tracking-wider text-center transition-all duration-300 backdrop-blur-md flex items-center justify-center space-x-2"
            >
              <span>Explore Event Packages</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 border-t border-zinc-800/80 grid grid-cols-3 gap-6 text-center lg:text-left max-w-2xl">
            <div>
              <p className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-amber-400">500+</p>
              <p className="text-xs text-zinc-300 font-semibold mt-1">VIP Events Catered</p>
            </div>
            <div>
              <p className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-amber-400">100%</p>
              <p className="text-xs text-zinc-300 font-semibold mt-1">On-Site Mixologists</p>
            </div>
            <div>
              <p className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-amber-400">40+</p>
              <p className="text-xs text-zinc-300 font-semibold mt-1">Exotic Flavor Blends</p>
            </div>
          </div>

        </div>

        {/* Right Column - Floating Feature Cards over Video */}
        <div className="lg:col-span-4 space-y-4 hidden lg:block">
          
          {/* Card 1: German LED Hookahs */}
          <div className="p-5 rounded-2xl glass-card border border-amber-500/30 space-y-2 backdrop-blur-xl shadow-2xl hover:border-amber-500/60 transition-all transform hover:-translate-x-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <FaCrown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
                  German LED Glass Towers
                </h3>
                <p className="text-[11px] text-amber-400 font-semibold">100% Medical Grade Stainless Steel</p>
              </div>
            </div>
          </div>

          {/* Card 2: Fresh Carved Fruit Bowls */}
          <div className="p-5 rounded-2xl glass-card border border-amber-500/30 space-y-2 backdrop-blur-xl shadow-2xl hover:border-amber-500/60 transition-all transform hover:-translate-x-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <HiSparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
                  Carved Fruit Bowls & Ice Hoses
                </h3>
                <p className="text-[11px] text-amber-400 font-semibold">Fresh Pineapple, Watermelon & Mint</p>
              </div>
            </div>
          </div>

          {/* Card 3: 100% Hygienic Tips */}
          <div className="p-5 rounded-2xl glass-card border border-amber-500/30 space-y-2 backdrop-blur-xl shadow-2xl hover:border-amber-500/60 transition-all transform hover:-translate-x-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <FaShieldHalved className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
                  Sealed Disposable Mouthpieces
                </h3>
                <p className="text-[11px] text-amber-400 font-semibold">100% Hygiene & Safety Guaranteed</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
