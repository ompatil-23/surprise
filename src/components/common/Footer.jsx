import React from 'react';
import { useSurprise } from '../../context/SurpriseContext';

export const Footer = () => {
  const { setActiveChapter, data } = useSurprise();

  return (
    <footer className="relative z-10 w-full bg-surface-container-lowest/85 backdrop-blur-md py-space-lg border-t border-surface-container-high/40 mt-space-xl">
      <div className="max-w-[1180px] mx-auto px-gutter-mobile lg:px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
        <div className="flex flex-col gap-0.5">
          <span className="font-headline-md text-headline-md text-primary-fixed">
            Written in the Stars for {data.partnerName || 'You'}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Handcrafted with timeless love, velvet plum warmth, and midnight stardust
          </span>
        </div>

        <div className="flex items-center gap-space-md">
          <button
            onClick={() => setActiveChapter('welcome')}
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-wider"
          >
            Back to Chapter 1
          </button>
          <span className="text-outline-variant">•</span>
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
            <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">
              Our Universe Is Endless
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
