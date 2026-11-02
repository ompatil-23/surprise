import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';

export const LetterPage = () => {
  const {
    data,
    envelopeOpened,
    setEnvelopeOpened,
    updateLetter,
    updateLetterParagraph,
    setActiveChapter,
  } = useSurprise();

  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative w-full max-w-[1180px] mx-auto px-gutter-mobile lg:px-gutter py-space-xl">
      {/* Ambient Orbs */}
      <div className="pointer-events-none absolute -top-10 left-1/3 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-10 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl" />

      {/* Chapter Header */}
      <div className="flex flex-col items-center text-center space-y-space-xs max-w-2xl mx-auto">
        <div className="flex items-center gap-space-xs bg-surface-container-high/80 px-space-md py-1 rounded-full shadow-sm border border-secondary/20">
          <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_stories
          </span>
          <span className="font-label-md text-label-md text-secondary tracking-widest uppercase">
            Chapter IV
          </span>
          <span className="text-outline-variant">•</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Archival Keepsake</span>
        </div>

        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary-fixed tracking-tight pt-space-xs">
          A Letter From My Heart
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
          Written in the quiet hours, straight from the depths of who I am to who you are.
        </p>

        <div className="flex items-center gap-space-sm pt-space-xs opacity-70">
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
          <span className="material-symbols-outlined text-secondary text-[14px]">star</span>
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
        </div>
      </div>

      {/* Letter Stage */}
      <div className="relative mt-space-xl flex flex-col items-center min-h-[640px] justify-center">
        {!envelopeOpened ? (
          /* ============================================== */
          /* STATE 1: THE UNBROKEN PARCHMENT ENVELOPE       */
          /* ============================================== */
          <div className="transition-all duration-700 ease-out transform scale-100 opacity-100 flex flex-col items-center w-full max-w-xl animate-fadeIn">
            {/* Instruction Badge */}
            <div className="mb-space-md flex items-center gap-2 bg-surface-container-highest/90 px-space-md py-1.5 rounded-full shadow-lg border border-secondary/30">
              <span className="material-symbols-outlined text-secondary text-[16px] animate-pulse">
                touch_app
              </span>
              <span className="font-label-md text-label-md text-secondary-fixed">
                Click the wax seal to unveil the letter
              </span>
            </div>

            {/* Envelope Container */}
            <div className="relative w-full aspect-[16/11] bg-surface-container rounded-xl shadow-[0_24px_50px_rgba(18,2,8,0.7)] p-4 flex flex-col justify-between overflow-hidden group border border-secondary/20">
              {/* Shading Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high/90 via-surface-container to-surface-container-lowest opacity-90 rounded-xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(233,195,73,0.08),transparent_70%)]" />

              {/* Envelope Flap Polygonal Shading */}
              <div
                className="absolute top-0 left-0 right-0 h-1/2 bg-surface-container-high/50 pointer-events-none"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 72%)' }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-[52%] bg-surface-container-highest/30 pointer-events-none"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 75%)' }}
              />

              {/* Postal Stamp & Golden Foil Info */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="flex flex-col text-left pl-2 pt-2">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest opacity-80">
                    Midnight Airmail
                  </span>
                  <span className="font-title-md text-title-md text-primary-fixed italic font-light tracking-wide">
                    Constellation No. 7
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant opacity-60">
                    Delivered Across Lightyears
                  </span>
                </div>

                {/* Vintage Stamped Keepsake Seal */}
                <div className="w-16 h-20 bg-surface-container-lowest/80 rounded-lg p-1.5 flex flex-col items-center justify-between shadow-md border border-secondary/20">
                  <div className="w-full h-10 overflow-hidden rounded bg-surface-bright/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[24px]">favorite</span>
                  </div>
                  <span className="font-label-sm text-[9px] text-secondary tracking-widest">SPECIAL</span>
                  <span className="font-label-sm text-[8px] text-on-surface-variant tracking-tighter">OCT 24</span>
                </div>
              </div>

              {/* Inscription */}
              <div className="relative z-10 my-auto text-center px-6">
                <span className="font-label-md text-label-md text-secondary tracking-widest uppercase block mb-1">
                  Strictly Confidential For:
                </span>
                <div className="font-display-lg text-[28px] sm:text-[34px] text-primary-fixed leading-tight font-serif italic drop-shadow-sm">
                  {data.partnerName || 'My Dearest Person in the Universe'}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-xs mx-auto italic">
                  "A little something from my heart. Touch the seal to break the midnight starlight."
                </p>
              </div>

              {/* Bottom Margin */}
              <div className="relative z-10 flex justify-between items-end px-2 pb-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant text-label-sm font-label-sm opacity-60">
                  <span className="material-symbols-outlined text-[14px]">lock_clock</span>
                  <span>Sealed in silence</span>
                </div>
                <div className="flex items-center gap-1 text-secondary opacity-75">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  <span className="font-label-sm text-label-sm">Pure Gold Leaf</span>
                </div>
              </div>

              {/* WAX SEAL BUTTON */}
              <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={handleOpenEnvelope}
                  className="relative group/wax focus:outline-none focus:ring-4 focus:ring-secondary/40 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  type="button"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-on-primary to-surface-container-lowest shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(226,132,158,0.3)] flex items-center justify-center relative border border-primary/40">
                    <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-on-primary-container via-surface-container-high to-on-primary opacity-90 shadow-inner" />
                    <div className="relative w-14 h-14 rounded-full bg-surface-container-low shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-secondary">
                      <span
                        className="material-symbols-outlined text-[26px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        favorite
                      </span>
                      <span className="font-label-sm text-[8px] text-secondary tracking-widest uppercase -mt-0.5">
                        OPEN
                      </span>
                    </div>
                  </div>
                  <div className="absolute -inset-2 rounded-full bg-secondary/20 blur-md opacity-40 group-hover/wax:opacity-90 transition-opacity" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================== */
          /* STATE 2: THE UNFOLDED ARCHIVAL LETTER          */
          /* ============================================== */
          <div className="transition-all duration-700 ease-out transform scale-100 opacity-100 w-full max-w-3xl flex flex-col items-center animate-fadeIn">
            {/* Toolbar Above Stationery */}
            <div className="w-full flex flex-wrap items-center justify-between gap-space-sm mb-space-md px-2">
              <div className="flex items-center gap-space-xs">
                {/* Re-seal Button */}
                <button
                  onClick={() => setEnvelopeOpened(false)}
                  className="flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface px-space-sm py-2 rounded-full shadow-sm transition-colors text-label-md font-label-md border border-surface-container-high"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  <span>Re-seal</span>
                </button>
              </div>

              <div className="flex items-center gap-space-xs">
                {/* Edit Toggle */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-1.5 px-space-sm py-2 rounded-full shadow-sm transition-colors text-label-md font-label-md border border-surface-container-high ${
                    isEditing
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isEditing ? 'done' : 'edit_note'}
                  </span>
                  <span>{isEditing ? 'Done Editing' : 'Edit Letter'}</span>
                </button>

                {/* Print Button */}
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-full shadow-md hover:shadow-[0_0_16px_rgba(255,177,196,0.4)] transition-all text-label-md font-label-md font-medium"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>Print Keepsake Copy</span>
                </button>
              </div>
            </div>

            {/* The Physical Parchment Stationery Paper */}
            <div
              id="printable-stationery"
              className="relative w-full bg-[#fcf8f2] text-[#2c1a1f] rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.65)] p-8 sm:p-14 md:p-16 overflow-hidden border border-[#d9c7b8]"
            >
              {/* Paper Texture Shading */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#f5ede3] via-[#fcf8f2] to-[#eee2d3] opacity-95 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(233,195,73,0.12),transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(77,35,47,0.12)] pointer-events-none" />

              {/* Botanical Pressed Flower Illustration in Top Right Margin */}
              <div className="pointer-events-none absolute top-4 right-6 flex flex-col items-center opacity-85 select-none">
                <svg className="w-16 h-28 text-[#9d5b6c]/60" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 60 110">
                  <path d="M30 100 C30 70 30 40 30 15" strokeLinecap="round" />
                  <path d="M30 75 C18 68 12 55 18 45 C24 55 30 65 30 75" fill="#c88394" fillOpacity="0.35" />
                  <path d="M30 55 C42 48 48 35 42 25 C36 35 30 45 30 55" fill="#c88394" fillOpacity="0.35" />
                  <circle cx="30" cy="15" fill="#af8d11" fillOpacity="0.5" r="7" />
                  <circle cx="30" cy="15" r="12" stroke="#af8d11" strokeDasharray="2 2" strokeOpacity="0.6" />
                </svg>
                <span className="text-[9px] tracking-widest uppercase font-serif text-[#772d45]/70 -mt-2">
                  Pressed Flora
                </span>
              </div>

              {/* Date / Heading Stamp */}
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-baseline mb-8 text-[#5a2e3b] pb-3 border-b border-[#af8d11]/25">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#af8d11] text-[18px]">hourglass_top</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    {data.letter.headerStamp}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-[#772d45] italic mt-1 sm:mt-0">
                  {data.letter.date}
                </span>
              </div>

              {/* Salutation */}
              <div className="relative z-10 mb-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={data.letter.salutation}
                    onChange={(e) => updateLetter('salutation', e.target.value)}
                    className="w-full bg-[#f3e7dc] border border-[#af8d11]/40 rounded px-2 py-1 font-display-lg text-[24px] sm:text-[30px] font-serif text-[#3e011a]"
                  />
                ) : (
                  <h2 className="font-display-lg text-[26px] sm:text-[32px] font-serif italic text-[#3e011a]">
                    {data.letter.salutation}
                  </h2>
                )}
              </div>

              {/* Letter Paragraphs */}
              <div className="relative z-10 space-y-5 font-body-lg text-[16px] sm:text-[18px] leading-relaxed text-[#2c1a1f] font-light">
                {data.letter.paragraphs.map((para, idx) => (
                  <div key={idx}>
                    {isEditing ? (
                      <textarea
                        rows={4}
                        value={para}
                        onChange={(e) => updateLetterParagraph(idx, e.target.value)}
                        className="w-full bg-[#f3e7dc] border border-[#af8d11]/40 rounded p-2 text-body-md font-sans text-[#2c1a1f] leading-relaxed focus:outline-none"
                      />
                    ) : (
                      <p className="indent-6 sm:indent-8">{para}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Signoff */}
              <div className="relative z-10 mt-10 pt-6 border-t border-[#af8d11]/25 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#772d45] block">
                    {data.letter.closing}
                  </span>
                  <span className="font-display-lg text-[22px] sm:text-[26px] font-serif italic text-[#3e011a]">
                    {data.letter.signature}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[#af8d11]">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest">
                    Stamped with Starlight
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setActiveChapter('why-you')}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-container to-surface-bright text-on-surface font-title-md text-title-md hover:shadow-[0_0_25px_rgba(226,132,158,0.5)] transition-all flex items-center gap-2"
              >
                <span>Continue to Chapter 05: Why You</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
