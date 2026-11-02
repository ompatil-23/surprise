import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { useAudio } from '../context/AudioContext';

export const WelcomePage = () => {
  const { data, updatePartnerName, setActiveChapter, waxSealBroken, setWaxSealBroken } = useSurprise();
  const { isPlaying, toggle } = useAudio();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(data.partnerName);

  const handleOpenSurprise = () => {
    setWaxSealBroken(true);
    setModalOpen(true);
    if (!isPlaying) {
      toggle();
    }
  };

  const handleNameSave = () => {
    if (tempName.trim()) {
      updatePartnerName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div className="relative w-full overflow-hidden px-gutter-mobile lg:px-gutter py-space-xl flex flex-col items-center justify-center">
      {/* Background Starry Orbitals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-primary-container/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/3 w-[420px] h-[420px] bg-secondary-container/10 rounded-full blur-[110px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-surface-container-high/40 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-[1080px] w-full mx-auto flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/70 backdrop-blur-md shadow-md mb-space-lg border border-surface-container-highest/60">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
          <span className="font-label-md text-label-md text-secondary-fixed tracking-widest uppercase">
            Secret Edition • Chapter I
          </span>
          <span className="text-on-surface-variant font-label-sm text-label-sm px-1.5 py-0.5 rounded-full bg-surface-container-highest">
            Only For Your Eyes
          </span>
        </div>

        {/* Hero Title with Customizable Girlfriend Name */}
        <div className="flex flex-col items-center gap-space-xs max-w-3xl">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary-fixed tracking-tight drop-shadow-[0_4px_24px_rgba(226,132,158,0.25)]">
              Hey,{' '}
              {isEditingName ? (
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleNameSave}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                  autoFocus
                  className="bg-surface-container px-2 py-0.5 rounded-lg border border-secondary text-secondary-fixed text-center italic outline-none w-48 sm:w-64"
                />
              ) : (
                <span
                  onClick={() => setIsEditingName(true)}
                  title="Click to edit name"
                  className="italic text-secondary-fixed cursor-pointer hover:underline decoration-secondary/50 underline-offset-8"
                >
                  {data.partnerName}
                </span>
              )}
              <span className="inline-block text-primary align-middle ml-2 select-none">
                <span
                  className="material-symbols-outlined text-[36px] md:text-[44px] animate-pulse"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
              </span>
            </h1>
          </div>

          <p className="font-headline-md text-headline-md text-on-surface-variant italic max-w-xl">
            “Someone has made a little world just for you.”
          </p>
        </div>

        {/* Celestial Gift Box with Wax Seal */}
        <div className="relative w-full max-w-[540px] my-space-lg flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-80 h-80 rounded-full bg-secondary/15 blur-3xl animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            <div className="w-64 h-64 rounded-full bg-primary/20 blur-2xl" />
          </div>

          <div
            onClick={handleOpenSurprise}
            id="celestialGift"
            className="relative group cursor-pointer transition-transform duration-700 ease-out hover:scale-[1.03] active:scale-[0.99] select-none"
          >
            <div className="relative w-[340px] sm:w-[420px] h-[260px] sm:h-[290px] rounded-xl bg-surface-container-high/90 backdrop-blur-2xl shadow-[0_24px_64px_-8px_rgba(18,2,8,0.9)] p-space-md flex flex-col justify-between overflow-hidden border border-secondary/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary-container/10 via-transparent to-primary-container/20 pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-secondary/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-secondary/20 backdrop-blur-sm pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-secondary/20 backdrop-blur-sm pointer-events-none" />

              {/* Parcel Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">auto_awesome</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">
                    Cosmic Parcel No. 01
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest/80 px-2.5 py-0.5 rounded-full border border-surface-container-high">
                  {waxSealBroken ? 'Unsealed With Love' : 'Sealed with Love'}
                </span>
              </div>

              {/* Wax Seal Center Button */}
              <div className="relative z-20 flex flex-col items-center justify-center my-auto">
                <div className="relative group/seal">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-container via-surface-bright to-surface-container-lowest flex items-center justify-center shadow-[0_0_24px_rgba(226,132,158,0.55)] transition-all duration-300 group-hover:shadow-[0_0_36px_rgba(233,195,73,0.7)] group-hover:scale-105 border border-primary/40">
                    <div className="w-14 h-14 rounded-full bg-surface-container-lowest/80 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-secondary text-[28px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {waxSealBroken ? 'lock_open' : 'favorite'}
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute -inset-1 rounded-full bg-secondary/25 blur-sm pointer-events-none animate-ping"
                    style={{ animationDuration: '2.6s' }}
                  />
                </div>
                <span className="mt-3 font-title-md text-title-md text-primary-fixed tracking-wide">
                  {waxSealBroken ? 'Unsealed • Touch to reopen' : 'Touch to break the wax seal'}
                </span>
              </div>

              {/* Parcel Footer */}
              <div className="relative z-10 flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-label-sm">Destination: Her Heart</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="flex flex-col items-center gap-space-md w-full max-w-md">
          <button
            onClick={handleOpenSurprise}
            id="openSurpriseBtn"
            type="button"
            className="group relative w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-primary-container via-surface-bright to-primary-container text-on-surface rounded-xl shadow-[0_0_30px_rgba(226,132,158,0.45)] hover:shadow-[0_0_45px_rgba(233,195,73,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-space-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
            <span className="material-symbols-outlined text-secondary text-[22px] group-hover:rotate-12 transition-transform duration-300">
              stars
            </span>
            <span className="font-title-md text-title-md text-on-surface tracking-wider uppercase font-semibold">
              Open Your Surprise
            </span>
            <span className="material-symbols-outlined text-on-surface text-[20px] group-hover:translate-x-1 transition-transform duration-200">
              arrow_forward
            </span>
          </button>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-space-xs text-on-surface-variant">
            <button
              onClick={() => setActiveChapter('memories')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="font-label-sm text-label-sm text-on-surface">6 Memory Capsules</span>
            </button>
            <button
              onClick={() => setActiveChapter('a-letter')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-label-sm text-label-sm text-on-surface">A Sealed Love Letter</span>
            </button>
            <button
              onClick={() => setActiveChapter('birthday-wish')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              <span className="font-label-sm text-label-sm text-on-surface">The Candle Wish</span>
            </button>
          </div>

          {/* Audio hint */}
          <div className="flex items-center justify-center gap-space-sm px-space-md py-2 rounded-full bg-surface-container-low/60 backdrop-blur-sm mt-space-xs border border-surface-container-high/40">
            <div className="flex items-center gap-1.5 text-secondary">
              <span className="material-symbols-outlined text-[18px]">headphones</span>
              <div className={`sound-bars-indicator flex items-end gap-0.5 h-3 px-0.5 ${isPlaying ? 'is-playing' : 'is-paused'}`}>
                <span className="w-0.5 bg-secondary rounded-full sound-bar-1" />
                <span className="w-0.5 bg-primary rounded-full sound-bar-2" />
                <span className="w-0.5 bg-secondary rounded-full sound-bar-3" />
              </div>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Best experienced with your headphones on
            </span>
          </div>

          <button
            onClick={toggle}
            className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors text-label-sm font-label-sm px-space-sm py-1 rounded-lg"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">
              {isPlaying ? 'pause_circle' : 'play_circle'}
            </span>
            <span>
              {isPlaying ? 'Ambient Melody: Playing (Click to Pause)' : 'Ambient Melody: Nocturne in Rose (Click to Play)'}
            </span>
          </button>
        </div>
      </div>

      {/* Chapter Overview Vignettes */}
      <div className="w-full max-w-[1080px] grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-xl pt-space-lg">
        {/* Card 1: Memories */}
        <div
          onClick={() => setActiveChapter('memories')}
          className="group relative bg-surface-container-low/70 hover:bg-surface-container-high/80 backdrop-blur-xl rounded-xl p-space-md transition-all duration-300 shadow-md flex flex-col justify-between cursor-pointer border border-surface-container-high/50 hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">photo_library</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary-fixed">Chapter 02</span>
            </div>
            <h2 className="font-title-lg text-title-lg text-on-surface mb-1">Treasured Vault</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Revisit the candid smiles, midnight talks, and starlit journeys we have shared together.
            </p>
          </div>
          <div className="mt-space-md overflow-hidden rounded-lg shadow-sm">
            <img
              className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Our memories together"
              src="/photos/couple_mirror_smile.jpg"
            />
          </div>
        </div>

        {/* Card 2: Letter */}
        <div
          onClick={() => setActiveChapter('a-letter')}
          className="group relative bg-surface-container-low/70 hover:bg-surface-container-high/80 backdrop-blur-xl rounded-xl p-space-md transition-all duration-300 shadow-md flex flex-col justify-between cursor-pointer border border-surface-container-high/50 hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary-fixed">Chapter 04</span>
            </div>
            <h2 className="font-title-lg text-title-lg text-on-surface mb-1">Handwritten Truths</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Unfold a slow, tender parchment letter recounting every silent thought I have kept for you.
            </p>
          </div>
          <div className="mt-space-md overflow-hidden rounded-lg shadow-sm">
            <img
              className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Vintage parchment letter"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb3FS4O1WpLVhRdA-CtxcO7uQU9RJR8BWz-vmjp5a5BJve1ssPp7Ypf931ClHdx7ibiOKAVA-ZjJiaRKNZav1Oerjy7hvzxHQ0eZ9qN_A-DYN4-FiraRcUsB1b2jJyF5fwrh6XKSVJtbJIOLBokX0b_tSWEUqzZHIQhm9IalDq45HwDM4QdZ4JHiQCOmfaEaVvYetB5b5tFTPxA5jmmrXCqWgrpR3TLNSi7P0ke0tno1cckrgBQ9mZ"
            />
          </div>
        </div>

        {/* Card 3: Cake & Candle */}
        <div
          onClick={() => setActiveChapter('birthday-wish')}
          className="group relative bg-surface-container-low/70 hover:bg-surface-container-high/80 backdrop-blur-xl rounded-xl p-space-md transition-all duration-300 shadow-md flex flex-col justify-between cursor-pointer border border-surface-container-high/50 hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                <span className="material-symbols-outlined text-[20px]">cake</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary-fixed">Chapter 06</span>
            </div>
            <h2 className="font-title-lg text-title-lg text-on-surface mb-1">The Birthday Candle</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              A real interactive flame for you to make a silent birthday wish and blow it into the cosmos.
            </p>
          </div>
          <div className="mt-space-md overflow-hidden rounded-lg shadow-sm">
            <img
              className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Birthday candle and cake"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq07hjxulAX7Gj9IFN4VRdLONyVL8HIl8wRB6UCRJ2SR57qQxtc1IUL8v3oiWFCD46_IHHECxi9AU12NCL8QIVwrdYMjwCxH9jo5Cvn5K2I39269jtAe8vhOIomclp9ZVAYr_v_9T0II_QNXzlEkp1IRna6kc5N4ZssMTp56rUc_NIBcbtIsCvCZvRQj-6hKHqcFXGZ7uolKk2mUDXOy-VI0D_hZMJ-M9wNnQPEivbSmMDxRl4iXgO"
            />
          </div>
        </div>
      </div>

      {/* Unseal Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter-mobile bg-surface-container-lowest/80 backdrop-blur-2xl transition-opacity duration-300">
          <div className="relative w-full max-w-lg bg-surface-container-high rounded-xl p-space-lg shadow-[0_24px_64px_-8px_rgba(0,0,0,0.85)] flex flex-col items-center text-center border border-secondary/30 animate-fadeIn">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-space-sm border-2 border-secondary/50 shadow-[0_0_20px_rgba(233,195,73,0.4)]">
              <img src="/photos/couple_1.png" alt="Couple" className="w-full h-full object-cover" />
            </div>

            <span className="font-label-md text-label-md text-secondary-fixed uppercase tracking-widest mb-1">
              Wax Seal Broken
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
              Welcome to Your Galaxy
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-space-lg">
              Take your time, breathe in, and turn your sound on. Every star in this universe was put here to celebrate your birthday.
            </p>

            <div className="w-full flex flex-col sm:flex-row items-center gap-space-sm justify-center">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setActiveChapter('memories');
                }}
                className="w-full sm:w-auto px-space-lg py-2.5 bg-gradient-to-r from-primary-container to-surface-bright text-on-surface rounded-lg font-title-md text-title-md hover:shadow-[0_0_20px_rgba(226,132,158,0.5)] transition-all font-semibold"
                type="button"
              >
                Begin the Journey ✨
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="w-full sm:w-auto px-space-md py-2.5 bg-surface-container-low text-on-surface-variant hover:text-on-surface rounded-lg font-title-md text-title-md transition-colors"
                type="button"
              >
                Keep Looking Here
              </button>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
