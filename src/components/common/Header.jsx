import React, { useState } from 'react';
import { useSurprise } from '../../context/SurpriseContext';
import { useAudio } from '../../context/AudioContext';

export const Header = () => {
  const { activeChapter, setActiveChapter, data } = useSurprise();
  const { isPlaying, toggle } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'memories', label: 'Memories' },
    { id: 'our-story', label: 'Our Story' },
    { id: 'a-letter', label: 'A Letter' },
    { id: 'why-you', label: 'Why You' },
    { id: 'birthday-wish', label: 'Birthday Wish' },
    { id: 'final-starlight', label: 'Final Starlight' },
  ];

  const handleNavClick = (id) => {
    setActiveChapter(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(34,3,13,0.5)] border-b border-surface-container-high/40 transition-colors">
      <div className="h-20 max-w-[1180px] mx-auto px-gutter-mobile lg:px-gutter flex items-center justify-between gap-space-sm">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('welcome')}
          className="flex items-center gap-space-sm text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-secondary shadow-[0_0_16px_rgba(233,195,73,0.2)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <div className="flex flex-col">
            <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors tracking-tight">
              To {data.partnerName || 'My Favorite Person'}
            </span>
            <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase opacity-85">
              A Universe Made For You
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-surface-container-low/70 px-space-xs py-1 rounded-full backdrop-blur-md border border-surface-container-high/50">
          {navItems.map((item) => {
            const isActive = activeChapter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-space-sm py-1.5 rounded-full font-label-md transition-all duration-300 text-label-md ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface shadow-[0_0_20px_rgba(233,195,73,0.25)] font-semibold border border-secondary/30'
                    : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Ambient Music Quick Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-space-sm">
          {/* Audio Quick Pill Button */}
          <div className="group relative">
            <button
              onClick={toggle}
              aria-label={isPlaying ? 'Pause ambient melody' : 'Play ambient melody'}
              className="flex items-center gap-2 px-space-sm py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all border border-surface-container-high/40 shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">
                {isPlaying ? 'graphic_eq' : 'headphones'}
              </span>
              <div className={`sound-bars-indicator flex items-end gap-0.5 h-3.5 px-0.5 ${isPlaying ? 'is-playing' : 'is-paused'}`}>
                <span className="w-0.5 bg-secondary rounded-full sound-bar-1" />
                <span className="w-0.5 bg-primary rounded-full sound-bar-2" />
                <span className="w-0.5 bg-secondary rounded-full sound-bar-3" />
              </div>
            </button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
              <div className="bg-surface-container-highest px-space-sm py-1 rounded-lg shadow-xl whitespace-nowrap">
                <span className="font-label-sm text-label-sm text-on-surface">
                  {isPlaying ? 'Click to pause celestial melody' : 'Click to play ambient celestial melody 🎧'}
                </span>
              </div>
            </div>
          </div>

          {/* Profile / Love Icon Badge */}
          <div
            title="Sealed with Love"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-container to-surface-bright flex items-center justify-center shadow-md select-none"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">favorite</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="xl:hidden w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest/95 backdrop-blur-2xl border-b border-surface-container-high/60 px-4 py-4 flex flex-col gap-1.5 shadow-2xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeChapter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-label-md text-body-md flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-surface-container-high text-secondary-fixed font-semibold shadow-inner'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
