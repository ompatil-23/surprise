import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';

export const FinalStarlightPage = () => {
  const { data, updateFinalNote, setActiveChapter } = useSurprise();
  const [vowModalOpen, setVowModalOpen] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState(data.finalStarlight.editableNote);
  const [copyToast, setCopyToast] = useState(false);
  const [bookDownloaded, setBookDownloaded] = useState(false);

  const handleSaveNote = () => {
    updateFinalNote(noteContent);
    setIsEditingNote(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  const handleDownloadBook = () => {
    const bookText = `
==================================================
           A UNIVERSE MADE FOR YOU
           To My Favorite Person: ${data.partnerName}
==================================================

CHAPTER I • THE GENESIS
"Someone has made a little world just for you."

CHAPTER II • CONSTELLATION OF DAYS
${data.memories.map((m) => `• [${m.date} - ${m.location}] ${m.title}: "${m.caption}"`).join('\n')}

CHAPTER III • OUR STORY TIMELINE
Days Entwined: ${data.anniversaryDays}
Midnight Whispers: ${data.midnightCalls}
Shared Umbrellas: ${data.sharedUmbrellas}
${data.timelineMilestones.map((t) => `\n[${t.date}] ${t.title} (${t.location})\n"${t.quote}"\n${t.note}`).join('\n')}

CHAPTER IV • HANDWRITTEN TRUTHS
${data.letter.salutation}

${data.letter.paragraphs.join('\n\n')}

${data.letter.closing}
${data.letter.signature}

CHAPTER V • WHY YOU ARE MY WORLD
${data.reasons.map((r) => `${r.number} (${r.title}):\n"${r.note}"`).join('\n\n')}

CHAPTER VI • BIRTHDAY WISH
"${data.birthdayWish.note}"

CHAPTER VII • THE FINAL HORIZON
"${data.finalStarlight.heroQuote}"
"${data.finalStarlight.editableNote}"

"${data.finalStarlight.vowHeading}"
${data.finalStarlight.vowSubheading}

==================================================
        Forever & Always • Infinite Resonance
==================================================
`;

    const blob = new Blob([bookText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Birthday-Keepsake-For-${(data.partnerName || 'You').replace(/\s+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setBookDownloaded(true);
    setTimeout(() => setBookDownloaded(false), 3000);
  };

  return (
    <div className="relative w-full overflow-hidden px-gutter-mobile lg:px-gutter py-space-xl lg:py-20 flex flex-col items-center justify-center">
      {/* Background Nebulae */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[720px] h-[720px] rounded-full bg-surface-container-high/30 blur-[130px] -top-24 -left-32" />
        <div className="w-[600px] h-[600px] rounded-full bg-primary-container/15 blur-[120px] top-1/3 -right-20" />
        <div className="w-[850px] h-[850px] rounded-full bg-surface-container-lowest/70 blur-[90px] bottom-0" />
      </div>

      <div className="relative z-10 max-w-[1040px] w-full flex flex-col items-center text-center">
        {/* Top Chapter Tag */}
        <div className="flex items-center gap-space-sm mb-space-md">
          <span className="w-8 h-[1px] bg-secondary/40" />
          <span className="font-label-md text-label-md text-secondary tracking-[0.25em] uppercase">
            Chapter VII • The Final Horizon
          </span>
          <span className="w-8 h-[1px] bg-secondary/40" />
        </div>

        <span className="font-headline-lg text-headline-lg text-primary-fixed mb-space-lg tracking-tight">
          Written in the Midnight Sky
        </span>

        {/* Hero Quote */}
        <div className="relative max-w-4xl mx-auto my-space-lg px-space-md">
          <span className="absolute -top-10 -left-6 md:-left-12 font-display-lg text-[100px] leading-none text-secondary/15 select-none pointer-events-none">
            “
          </span>
          <h1 className="font-display-lg text-display-lg md:text-[58px] md:leading-[70px] text-on-surface font-normal italic tracking-tight drop-shadow-[0_8px_30px_rgba(34,3,13,0.9)]">
            {data.finalStarlight.heroQuote}
          </h1>
          <span className="absolute -bottom-16 -right-4 md:-right-8 font-display-lg text-[100px] leading-none text-secondary/15 select-none pointer-events-none">
            ”
          </span>
        </div>

        {/* Customizable Celestial Keepsake Box */}
        <div className="w-full max-w-3xl mt-space-xl relative">
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-secondary/20 via-primary/25 to-tertiary/20 blur-xl opacity-75" />
          <div className="relative bg-surface-container-high/60 backdrop-blur-2xl rounded-xl p-space-md md:p-space-lg shadow-xl border border-secondary/30">
            <div className="flex items-center justify-between gap-space-sm mb-space-sm">
              <div className="flex items-center gap-space-xs text-secondary">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase font-semibold">
                  Celestial Keepsake
                </span>
              </div>
              <button
                onClick={() => {
                  if (isEditingNote) handleSaveNote();
                  else setIsEditingNote(true);
                }}
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {isEditingNote ? 'check' : 'edit'}
                </span>
                <span>{isEditingNote ? 'Save Note' : 'Personalize Note'}</span>
              </button>
            </div>

            <div className="min-h-[80px] flex items-center justify-center py-space-xs">
              {isEditingNote ? (
                <textarea
                  rows={3}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full bg-surface-container px-3 py-2 rounded-lg text-title-md text-primary-fixed border border-secondary outline-none italic text-center font-serif"
                />
              ) : (
                <p className="font-title-lg text-title-lg text-primary-fixed italic font-normal tracking-wide font-serif">
                  {noteContent}
                </p>
              )}
            </div>

            <div className="mt-space-sm pt-space-xs flex items-center justify-center gap-space-xs text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="font-label-sm text-label-sm tracking-wider uppercase opacity-75">
                Immutable Starlight Archive • Eternity Stamp
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            </div>
          </div>
        </div>

        {/* Read One Last Thing Button */}
        <div className="mt-space-xl flex flex-col items-center">
          <button
            onClick={() => setVowModalOpen(true)}
            id="openVowBtn"
            type="button"
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-primary-container via-primary to-inverse-primary text-on-primary font-title-md text-title-md shadow-xl shadow-primary-container/30 hover:shadow-primary-container/60 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-space-sm font-semibold"
          >
            <span className="material-symbols-outlined text-[22px] text-on-primary group-hover:rotate-12 transition-transform">
              favorite
            </span>
            <span className="tracking-wide">Read One Last Thing ✦</span>
          </button>
          <span className="font-label-sm text-label-sm text-secondary-fixed mt-space-xs opacity-75">
            Click to unseal our sealed constellation
          </span>
        </div>
      </div>

      {/* 3 Navigation Action Cards */}
      <div className="relative z-10 w-full max-w-5xl mt-space-xl pt-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Card 1: Restart */}
          <div className="relative group rounded-xl overflow-hidden bg-surface-container-low/70 backdrop-blur-md p-space-md shadow-lg hover:-translate-y-1 transition-all border border-surface-container-high/40 text-left">
            <div className="flex items-center gap-space-sm mb-space-xs">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">history_edu</span>
              </div>
              <span className="font-title-md text-title-md text-on-surface">Beginning of Time</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Journey back to our very first memory and walk through every chapter under the starlight again.
            </p>
            <button
              onClick={() => setActiveChapter('welcome')}
              className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-secondary-fixed transition-colors"
            >
              <span>Restart Our Story from Chapter 1</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: Save Link */}
          <div className="relative group rounded-xl overflow-hidden bg-surface-container-low/70 backdrop-blur-md p-space-md shadow-lg hover:-translate-y-1 transition-all border border-surface-container-high/40 text-left">
            <div className="flex items-center gap-space-sm mb-space-xs">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">share_location</span>
              </div>
              <span className="font-title-md text-title-md text-on-surface">Eternal Link</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Save this unique sky coordinate URL to keep this romantic safe-haven accessible anytime.
            </p>
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors"
            >
              <span>{copyToast ? 'URL Copied to Clipboard!' : 'Save Keepsake URL'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {copyToast ? 'check' : 'link'}
              </span>
            </button>
          </div>

          {/* Card 3: Download Memory Book */}
          <div className="relative group rounded-xl overflow-hidden bg-surface-container-low/70 backdrop-blur-md p-space-md shadow-lg hover:-translate-y-1 transition-all border border-surface-container-high/40 text-left">
            <div className="flex items-center gap-space-sm mb-space-xs">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </div>
              <span className="font-title-md text-title-md text-on-surface">Parchment Archive</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Preserve all 7 chapters, captured moments, and sealed letters as an illustrated digital keepsake.
            </p>
            <button
              onClick={handleDownloadBook}
              className="inline-flex items-center gap-1 font-label-md text-label-md text-tertiary hover:text-tertiary-fixed transition-colors"
            >
              <span>{bookDownloaded ? 'Memory Book Downloaded!' : 'Download Memory Book'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {bookDownloaded ? 'check' : 'download'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Constellation Coordinates */}
      <div className="relative z-10 mt-space-xl flex flex-col items-center text-center max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping" />
          <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-widest">
            Constellation Coordinates: 45° 19' N, 9° 12' E
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          This realm was woven by hand exclusively for your birthday. Every pixel holds an echo of gratitude.
        </p>
      </div>

      {/* Eternal Vow Modal */}
      {vowModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/85 backdrop-blur-2xl transition-all duration-500">
          <div className="relative max-w-2xl w-full bg-surface-container-low rounded-xl p-space-md md:p-space-lg shadow-2xl border border-secondary/40 overflow-hidden animate-fadeIn">
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container-high">
              <div className="flex items-center gap-space-xs text-secondary">
                <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                  Sealed Eternal Vow
                </span>
              </div>
              <button
                onClick={() => setVowModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-surface-container-lowest/85 rounded-lg p-space-lg md:p-space-xl my-space-xs text-center relative shadow-inner border border-secondary/20">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-secondary/50 shadow-[0_0_24px_rgba(233,195,73,0.4)]">
                <img
                  src="/photos/couple_heads_together.jpg"
                  alt="Forever Together"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface italic font-normal tracking-tight mb-space-md font-serif">
                "{data.finalStarlight.vowHeading}"
              </h3>

              <div className="w-16 h-[1px] bg-secondary/40 mx-auto my-space-md" />

              <p className="font-title-lg text-title-lg text-secondary-fixed italic font-medium">
                {data.finalStarlight.vowSubheading}
              </p>

              <span className="inline-block mt-space-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                Forever & Always • Infinite Resonance
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
