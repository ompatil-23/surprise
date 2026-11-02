import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useSurprise } from '../context/SurpriseContext';

export const BirthdayWishPage = () => {
  const {
    data,
    candleBlown,
    setCandleBlown,
    updateBirthdayWishNote,
    setActiveChapter,
  } = useSurprise();

  const [copied, setCopied] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState(data.birthdayWish.note);

  const handleBlowCandle = () => {
    setCandleBlown(true);

    // Trigger Multi-Stage Romantic Confetti & Stardust Sparks
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#e2849e', '#e9c349', '#ffd9e0', '#ffd7f1', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleRelight = () => {
    setCandleBlown(false);
  };

  const handleCopyNote = () => {
    navigator.clipboard.writeText(noteContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = () => {
    updateBirthdayWishNote(noteContent);
    setIsEditingNote(false);
  };

  return (
    <div className="relative w-full max-w-[1180px] mx-auto px-gutter-mobile lg:px-gutter py-space-lg flex flex-col items-center">
      {/* Chapter Indicator */}
      <div className="flex items-center gap-space-sm mb-space-sm bg-surface-container-high/60 backdrop-blur-md px-space-md py-1.5 rounded-full shadow-sm border border-secondary/20">
        <span
          className="material-symbols-outlined text-secondary text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          cake
        </span>
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">
          Chapter VI • The Celestial Ritual
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping" />
      </div>

      {/* Headings */}
      <div className="text-center max-w-2xl flex flex-col items-center gap-space-xs mb-space-xl">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">
          Make a Birthday Wish, {data.partnerName || 'Apurva'}
        </h1>
        <div className="flex items-center gap-2 flex-wrap justify-center mt-1">
          <span className="text-secondary-fixed text-label-sm font-label-sm bg-surface-container-high px-2.5 py-0.5 rounded-full">
            ✨ Appu
          </span>
          <span className="text-primary-fixed text-label-sm font-label-sm bg-surface-container-high px-2.5 py-0.5 rounded-full">
            🌸 Johnson Baby
          </span>
          <span className="text-tertiary-fixed text-label-sm font-label-sm bg-surface-container-high px-2.5 py-0.5 rounded-full">
            💖 Gangu
          </span>
          <span className="text-secondary-fixed text-label-sm font-label-sm bg-surface-container-high px-2.5 py-0.5 rounded-full">
            🦉 Ghubad
          </span>
        </div>
        <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-xl">
          Close your eyes, breathe in the starlight, and blow out the candle.
        </p>
      </div>

      {/* Centerpiece Stage: Cake & Candle */}
      <div className="relative w-full max-w-4xl flex flex-col items-center">
        {/* Candle Glow Projection Floor */}
        <div
          className={`absolute -top-12 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out ${
            candleBlown ? 'bg-secondary/0' : 'bg-secondary/20'
          }`}
        />

        {/* Stage Container */}
        <div className="relative w-full bg-surface-container-low/75 backdrop-blur-xl rounded-xl p-space-md md:p-space-xl shadow-xl overflow-hidden flex flex-col items-center justify-center min-h-[460px] border border-surface-container-high/60">
          <div className="relative flex flex-col items-center justify-center my-space-md z-10 group">
            {/* Candle Unit */}
            <div className="relative flex flex-col items-center z-10">
              {/* Flame and Smoke */}
              <div className="relative w-12 h-16 flex items-center justify-center transition-all duration-700">
                {!candleBlown ? (
                  /* Active Burning Flame */
                  <div className="relative flex items-center justify-center animate-pulse">
                    <div
                      className="w-4 h-9 bg-secondary-fixed rounded-full shadow-[0_0_24px_rgba(233,195,73,0.9)]"
                      style={{ filter: 'drop-shadow(0 0 12px rgba(255,224,136,0.8))' }}
                    />
                    <div className="absolute w-6 h-11 bg-primary/40 rounded-full blur-xs" />
                    <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white opacity-90 animate-ping" />
                  </div>
                ) : (
                  /* Starry Smoke Puff */
                  <div className="absolute -top-6 flex flex-col items-center pointer-events-none animate-fadeIn">
                    <span className="material-symbols-outlined text-primary-fixed text-[32px] animate-bounce opacity-80">
                      flare
                    </span>
                    <span className="w-2 h-8 bg-gradient-to-t from-primary/30 to-transparent blur-sm rounded-full" />
                  </div>
                )}
              </div>

              {/* Candle Stick */}
              <div className="w-3.5 h-16 bg-gradient-to-b from-primary-fixed-dim via-surface-container to-surface-container-high rounded-t-sm shadow-md flex items-center justify-center relative">
                <div className="absolute -top-2 w-0.5 h-2 bg-on-secondary-fixed" />
                <div className="w-full h-1 bg-secondary/40 my-1" />
                <div className="w-full h-1 bg-secondary/30 my-2" />
              </div>
            </div>

            {/* Artisanal Cake Visual */}
            <div className="relative -mt-2 w-64 md:w-80 h-44 rounded-2xl overflow-hidden shadow-2xl flex items-end justify-center border border-surface-container-high/50">
              <div
                className="bg-cover bg-center w-full h-full absolute inset-0"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1DQckklN2EmG-yuJiGWBthoUeHGp_aVGeQPhgyE5pVwvfdxFy72w6q5fQvgIBKj3TkIcW69Ko1hPFmTUE4I0HZGxASj6UUknRWN6XhY1F0oYWegaM__lTnKzgNbwEPYOFvEk8n6ArcdG0Mok9Zl5tFE4PoF-8-eD7zk4qIswdsjhlVfmzgNU4dgMb-3cmLlB9-zg9PX6dIfF464B7MiOx_pd77nInM5L-Z8kU4PzmQspX1ZSWD35z')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-85" />
              <div className="relative z-10 mb-2 px-space-md py-0.5 rounded-full bg-surface-container-highest/85 backdrop-blur-md shadow-md border border-secondary/20">
                <span className="font-label-sm text-label-sm text-secondary-fixed tracking-widest uppercase">
                  Midnight Ganache & Stardust Confection
                </span>
              </div>
            </div>

            {/* Status Text */}
            <div className="mt-space-sm flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  candleBlown ? 'bg-primary' : 'bg-secondary animate-pulse'
                }`}
              />
              <span className="font-label-md text-label-md text-secondary">
                {candleBlown
                  ? 'Your wish has ascended into the stars ✨'
                  : 'The flame flickers gently awaiting your breath'}
              </span>
            </div>
          </div>

          {/* Action Trigger Button */}
          {!candleBlown ? (
            <div className="relative z-20 mt-space-sm flex flex-col items-center gap-space-xs">
              <button
                onClick={handleBlowCandle}
                id="blow-candle-btn"
                type="button"
                className="group relative px-space-lg py-space-sm rounded-full bg-gradient-to-r from-primary-container via-primary to-primary-container text-on-primary font-title-md text-title-md tracking-wide shadow-[0_0_30px_rgba(226,132,158,0.45)] hover:shadow-[0_0_45px_rgba(233,195,73,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-space-xs font-semibold"
              >
                <span className="material-symbols-outlined text-[20px] text-on-primary transition-transform group-hover:rotate-12">
                  auto_awesome
                </span>
                <span>✨ Make a Wish & Blow Out Candle ✨</span>
              </button>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Tap to send your wish into the cosmos
              </span>
            </div>
          ) : (
            <div className="relative z-20 mt-space-sm flex items-center gap-3">
              <button
                onClick={handleRelight}
                type="button"
                className="px-space-md py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all flex items-center gap-1.5 border border-secondary/30"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Light Candle Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Celebration Announcement Banner */}
        {candleBlown && (
          <div className="w-full flex-col items-center mt-space-lg space-y-space-md transition-all duration-1000 ease-out animate-fadeIn flex">
            <div className="w-full text-center p-space-lg md:p-space-xl rounded-xl bg-surface-container-high/85 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col items-center border border-secondary/30">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
              <div className="absolute -top-20 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />

              <div className="flex items-center justify-center gap-2 mb-space-xs text-secondary">
                <span className="material-symbols-outlined text-[28px] animate-bounce">
                  celebration
                </span>
                <span className="material-symbols-outlined text-[24px] text-primary animate-pulse">
                  favorite
                </span>
                <span
                  className="material-symbols-outlined text-[28px] animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                >
                  celebration
                </span>
              </div>

              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary-fixed mb-space-xs">
                Happy Birthday, {data.partnerName || 'Apurva'}! (Happy Birthday, Appu!) ❤️
              </h2>
              <p className="font-headline-md text-headline-md text-secondary-fixed max-w-2xl font-normal leading-relaxed mb-space-md font-serif italic">
                {data.birthdayWish.subheading}
              </p>

              {/* Celebration Keepsake Photo Trio */}
              <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="bg-[#FAF6F0] p-2.5 pb-3.5 rounded-lg shadow-md transform -rotate-1 hover:rotate-0 transition-transform">
                  <img
                    src="/photos/couple_park_full.jpg"
                    alt="Park memories"
                    className="w-full aspect-[4/3] object-cover rounded"
                  />
                  <span className="font-headline-md text-[13px] text-[#2D161C] italic mt-1.5 block font-serif">
                    Pines & Sunset Skies
                  </span>
                </div>
                <div className="bg-[#FAF6F0] p-2.5 pb-3.5 rounded-lg shadow-md transform rotate-1 hover:rotate-0 transition-transform">
                  <img
                    src="/photos/couple_golden_sunlight.jpg"
                    alt="Golden sunlight"
                    className="w-full aspect-[4/3] object-cover rounded"
                  />
                  <span className="font-headline-md text-[13px] text-[#2D161C] italic mt-1.5 block font-serif">
                    Warmest Birthday Light
                  </span>
                </div>
                <div className="bg-[#FAF6F0] p-2.5 pb-3.5 rounded-lg shadow-md transform -rotate-2 hover:rotate-0 transition-transform">
                  <img
                    src="/photos/couple_heads_together.jpg"
                    alt="Heads together"
                    className="w-full aspect-[4/3] object-cover rounded"
                  />
                  <span className="font-headline-md text-[13px] text-[#2D161C] italic mt-1.5 block font-serif">
                    Forever and Always
                  </span>
                </div>
              </div>

              {/* Customizable Birthday Wish Note Box */}
              <div className="w-full max-w-2xl bg-surface-container-lowest/90 backdrop-blur-md rounded-xl p-space-md md:p-space-lg shadow-xl relative text-left border border-surface-container-high">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      mark_email_read
                    </span>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-secondary-fixed font-semibold">
                      Keepsake Parchment Note
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (isEditingNote) handleSaveNote();
                      else setIsEditingNote(true);
                    }}
                    className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isEditingNote ? 'check' : 'edit'}
                    </span>
                    <span>{isEditingNote ? 'Save' : 'Customize'}</span>
                  </button>
                </div>

                {isEditingNote ? (
                  <textarea
                    rows={4}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-md text-on-surface border border-secondary outline-none leading-relaxed font-light"
                  />
                ) : (
                  <div className="font-title-lg text-body-lg text-on-surface font-light leading-relaxed">
                    {noteContent}
                  </div>
                )}

                {/* Note Footer */}
                <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-surface-container-high">
                  <div className="flex items-center gap-space-xs">
                    <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shadow-md">
                      ★
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant italic">
                      Sealed forever in the cosmic record
                    </span>
                  </div>

                  <button
                    onClick={handleCopyNote}
                    className="px-space-sm py-1 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm transition-all flex items-center gap-1 border border-secondary/20"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    <span>{copied ? 'Copied!' : 'Copy Note'}</span>
                  </button>
                </div>
              </div>

              {/* Navigation CTA */}
              <div className="mt-space-xl flex flex-col sm:flex-row items-center gap-space-md">
                <button
                  onClick={() => setActiveChapter('final-starlight')}
                  className="px-space-xl py-space-sm rounded-full bg-gradient-to-r from-primary-container to-surface-bright text-on-surface font-title-md text-title-md shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-space-sm font-semibold"
                >
                  <span>Continue to Final Starlight</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
