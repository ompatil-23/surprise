import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';

export const WhyYouPage = () => {
  const { data, updateReasonNote, setActiveChapter } = useSurprise();
  const [flippedCards, setFlippedCards] = useState({});
  const [editingCardId, setEditingCardId] = useState(null);
  const [editNoteText, setEditNoteText] = useState('');

  const toggleCard = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const startEdit = (e, reason) => {
    e.stopPropagation();
    setEditingCardId(reason.id);
    setEditNoteText(reason.note);
  };

  const saveEdit = (e, id) => {
    e.stopPropagation();
    updateReasonNote(id, editNoteText);
    setEditingCardId(null);
  };

  const revealedCount = Object.values(flippedCards).filter(Boolean).length;

  return (
    <div className="relative w-full overflow-hidden pb-space-xl">
      {/* Background Nebulae */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-gradient-to-b from-primary-container/15 via-secondary/10 to-transparent blur-3xl opacity-60" />
      <div className="pointer-events-none absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-surface-bright/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-tertiary-container/15 blur-3xl" />

      <div className="max-w-[1180px] mx-auto px-gutter-mobile lg:px-gutter relative z-10">
        {/* Curated Header */}
        <div className="pt-6 pb-space-lg flex flex-col items-center text-center relative">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high/60 backdrop-blur-md shadow-sm mb-space-sm border border-secondary/20">
            <span
              className="material-symbols-outlined text-[16px] text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
            <span className="font-label-md text-label-md text-secondary tracking-widest uppercase">
              Chapter 05 • The Celestial Ledger
            </span>
          </div>

          <div className="relative max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              A Few Reasons Why You Are My World
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs font-light">
              Out of eight billion people, here is why it is always you.
            </p>
          </div>

          {/* Interactive Instruction Pill with Revealed Counter */}
          <div className="mt-space-md inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest/70 backdrop-blur-md shadow-md border border-surface-container-high/60">
            <span className="material-symbols-outlined text-[18px] text-primary animate-pulse">
              touch_app
            </span>
            <span className="font-body-sm text-body-sm text-on-surface tracking-wide">
              Tap each keepsake card to unfold the words written for your heart
            </span>
            <div className="flex items-center gap-1 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="font-label-sm text-label-sm text-secondary-fixed">
                {revealedCount} / {data.reasons.length} Revealed
              </span>
            </div>
          </div>
        </div>

        {/* 3D Bento Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md pt-space-xs">
          {data.reasons.map((reason) => {
            const isFlipped = Boolean(flippedCards[reason.id]);
            const isEditingThis = editingCardId === reason.id;

            return (
              <div
                key={reason.id}
                onClick={() => !isEditingThis && toggleCard(reason.id)}
                className="group relative perspective-1000 min-h-[360px] cursor-pointer"
              >
                <div
                  className={`card-inner relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 rounded-xl bg-surface-container/60 backdrop-blur-xl p-space-lg flex flex-col justify-between shadow-xl [backface-visibility:hidden] overflow-hidden group-hover:-translate-y-1 transition-all duration-300 border border-surface-container-high/60">
                    <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-primary-container/20 blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between z-10">
                      <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">
                        {reason.number}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-surface-container-high/80 flex items-center justify-center text-primary shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">{reason.icon}</span>
                      </div>
                    </div>

                    <div className="my-auto py-space-sm z-10">
                      <h3 className="font-title-lg text-title-lg text-primary-fixed mb-2 font-serif">
                        {reason.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                        {reason.preview}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-space-xs z-10">
                      <span className="font-label-sm text-label-sm text-secondary opacity-75">
                        Touch to Unfold
                      </span>
                      <span className="material-symbols-outlined text-[20px] text-secondary transition-transform group-hover:scale-125">
                        lock_open
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE (REVEALED NOTE) */}
                  <div className="absolute inset-0 rounded-xl bg-surface-container-high/90 backdrop-blur-2xl p-space-lg flex flex-col justify-between shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden border border-secondary/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="material-symbols-outlined text-[16px] text-secondary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">
                          Cherished Note
                        </span>
                      </div>
                      <button
                        onClick={(e) =>
                          isEditingThis ? saveEdit(e, reason.id) : startEdit(e, reason)
                        }
                        className="text-on-surface-variant hover:text-primary transition-colors p-1"
                        title={isEditingThis ? 'Save note' : 'Personalize note'}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isEditingThis ? 'check' : 'edit_note'}
                        </span>
                      </button>
                    </div>

                    <div className="my-auto py-space-sm">
                      {isEditingThis ? (
                        <textarea
                          rows={4}
                          value={editNoteText}
                          onChange={(e) => setEditNoteText(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full bg-surface-container-lowest px-2 py-1 rounded text-body-sm text-on-surface focus:border-secondary outline-none border border-surface-container-highest"
                        />
                      ) : (
                        <p className="font-headline-md text-headline-md text-on-surface italic font-light leading-relaxed font-serif">
                          {reason.note}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-space-xs">
                      <span className="font-label-sm text-label-sm text-primary">
                        {reason.tag}
                      </span>
                      <span
                        className="material-symbols-outlined text-[18px] text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        favorite
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Chapter 6 */}
        <div className="mt-space-xl flex justify-center">
          <button
            onClick={() => setActiveChapter('birthday-wish')}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-container to-surface-bright text-on-surface font-title-md text-title-md hover:shadow-[0_0_25px_rgba(226,132,158,0.5)] transition-all flex items-center gap-2"
          >
            <span>Proceed to Chapter 06: The Birthday Candle</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
