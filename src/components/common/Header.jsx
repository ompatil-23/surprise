import React, { useState } from 'react';
import { useSurprise } from '../../context/SurpriseContext';

export const Header = () => {
  const { activeChapter, setActiveChapter, data } = useSurprise();
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
            <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors tracking-tight flex items-center gap-1.5">
              <span>To {data.partnerName || 'Apurva'}</span>
              <span className="text-secondary text-[13px] font-normal italic">(Appu)</span>
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

        {/* Right Action: Sweet Badge & Mobile Hamburger */}
        <div className="flex items-center gap-space-sm">
          {/* Profile / Love Icon Badge */}
          <div
            title="For Apurva • Appu • Johnson Baby • Gangu • Ghubad"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-secondary/30 shadow-sm select-none"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">favorite</span>
            <span className="font-label-sm text-label-sm text-secondary-fixed hidden sm:inline">
              Only for Appu
            </span>
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-high/95 backdrop-blur-2xl border-b border-surface-container-highest px-gutter-mobile py-space-md flex flex-col gap-1 shadow-2xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeChapter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all ${
                  isActive
                    ? 'bg-surface-container-highest text-secondary-fixed font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
