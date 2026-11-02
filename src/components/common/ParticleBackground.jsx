import React from 'react';

export const ParticleBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Ambient Radial Color Nebulae */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-surface-bright/20 blur-3xl animate-subtle-glow" />
      <div
        className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl animate-subtle-glow"
        style={{ animationDelay: '2s' }}
      />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-secondary-container/10 blur-3xl" />

      {/* Twinkling Star Points */}
      <div className="twinkle-point absolute top-12 left-[16%] w-1 h-1 rounded-full bg-secondary-fixed opacity-60" />
      <div
        className="twinkle-point absolute top-28 right-1/4 w-1.5 h-1.5 rounded-full bg-primary-fixed opacity-70"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="twinkle-point absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-tertiary-fixed opacity-50"
        style={{ animationDelay: '0.7s' }}
      />
      <div
        className="twinkle-point absolute bottom-32 right-12 w-1.5 h-1.5 rounded-full bg-secondary-fixed opacity-80"
        style={{ animationDelay: '2.2s' }}
      />
      <div
        className="twinkle-point absolute top-1/4 left-[8%] w-1.5 h-1.5 rounded-full bg-secondary-fixed opacity-75"
        style={{ animationDelay: '3.1s' }}
      />
      <div
        className="twinkle-point absolute bottom-1/3 right-[32%] w-1 h-1 rounded-full bg-primary-fixed opacity-65"
        style={{ animationDelay: '1.8s' }}
      />

      {/* SVG Constellation Dust Backdrop */}
      <svg className="absolute inset-0 w-full h-full opacity-35 mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient cx="50%" cy="50%" id="bgStarGlow" r="50%">
            <stop offset="0%" stopColor="#ffe088" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffe088" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="12%" cy="18%" fill="#ffd9e0" r="1.5" />
        <circle cx="28%" cy="12%" fill="url(#bgStarGlow)" r="2" />
        <circle cx="84%" cy="22%" fill="url(#bgStarGlow)" r="2.5" />
        <circle cx="76%" cy="40%" fill="#ffd9e0" r="1" />
        <circle cx="18%" cy="65%" fill="#e6bad8" r="1.5" />
        <circle cx="88%" cy="75%" fill="url(#bgStarGlow)" r="2" />
        <circle cx="34%" cy="82%" fill="#ffd9e0" r="1" />
        <path
          d="M 120 180 Q 240 120 360 210 T 600 150"
          fill="none"
          opacity="0.35"
          stroke="#e2849e"
          strokeDasharray="3,7"
          strokeWidth="0.6"
        />
        <path
          d="M 720 110 Q 860 190 980 130 T 1140 220"
          fill="none"
          opacity="0.3"
          stroke="#e9c349"
          strokeDasharray="4,8"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
};
