import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';

export const AudioPlayer = () => {
  const {
    isPlaying,
    currentTrack,
    playheadSeconds,
    durationSeconds,
    volume,
    toggle,
    nextTrack,
    prevTrack,
    setVolume,
    seek,
  } = useAudio();

  const [isLooping, setIsLooping] = useState(true);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  const progressPercent = durationSeconds > 0
    ? (playheadSeconds / durationSeconds) * 100
    : 0;

  const handleProgressBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seek(ratio * durationSeconds);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setVolume(ratio);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[760px] bg-surface-container-lowest/85 backdrop-blur-xl rounded-full p-2 px-4 shadow-[0_0_35px_rgba(226,132,158,0.45)] border border-primary/25 flex items-center justify-between gap-3 text-on-surface select-none transition-all duration-300">
      {/* Left: Track Information */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggle}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high text-secondary flex-shrink-0 shadow-[0_0_16px_rgba(233,195,73,0.25)] hover:scale-105 active:scale-95 transition-all"
        >
          <span className={`material-symbols-outlined text-[20px] ${isPlaying ? 'animate-pulse' : ''}`}>
            {isPlaying ? 'music_note' : 'play_arrow'}
          </span>
          {isPlaying && (
            <span
              className="absolute -inset-0.5 rounded-full border border-secondary/40 animate-ping"
              style={{ animationDuration: '3s' }}
            />
          )}
        </button>

        <div className="flex flex-col min-w-0 text-left">
          <div className="flex items-center gap-2">
            <span className="font-title-md text-label-md text-primary-fixed truncate">
              {currentTrack?.title || 'Nocturne in Rose'}
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-label-sm text-[10px] uppercase tracking-wider flex-shrink-0">
              {currentTrack?.tag || 'Birthday Song'}
            </span>
          </div>
          <span className="font-body-sm text-[12px] text-on-surface-variant flex items-center gap-1.5 truncate">
            <span>{currentTrack?.subtitle || 'Gentle Piano Melody'}</span>
            <span className="w-1 h-1 rounded-full bg-secondary" />
            <span className="text-secondary-fixed">
              {isPlaying ? 'Playing in starlight' : 'Touch play to listen'}
            </span>
          </span>
        </div>
      </div>

      {/* Center: Controls & Scrubber (Desktop) */}
      <div className="hidden md:flex flex-col items-center gap-1 w-48 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={prevTrack}
            title="Previous melody"
            className="text-on-surface-variant hover:text-secondary transition-colors p-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">skip_previous</span>
          </button>

          <button
            onClick={toggle}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-container to-surface-bright text-on-surface flex items-center justify-center shadow-[0_0_16px_rgba(226,132,158,0.55)] hover:scale-105 active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={nextTrack}
            title="Next melody"
            className="text-on-surface-variant hover:text-secondary transition-colors p-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">skip_next</span>
          </button>

          <button
            onClick={() => setIsLooping(!isLooping)}
            title={isLooping ? 'Looping enabled' : 'Loop disabled'}
            className={`p-1 transition-colors ${
              isLooping ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">repeat</span>
          </button>
        </div>

        {/* Progress Bar & Timers */}
        <div className="w-full flex items-center gap-2 text-[10px] text-on-surface-variant">
          <span className="font-label-sm w-7 text-right">{formatTime(playheadSeconds)}</span>
          <div
            onClick={handleProgressBarClick}
            className="relative w-full h-1 bg-surface-container-high rounded-full overflow-hidden cursor-pointer group"
          >
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-label-sm w-7">{formatTime(durationSeconds)}</span>
        </div>
      </div>

      {/* Right: Volume & Sound Wave Indicator */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Volume controls (Desktop) */}
        <div className="hidden sm:flex items-center gap-1.5 text-on-surface-variant">
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.75)}
            className="hover:text-secondary transition-colors flex items-center"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">
              {volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
            </span>
          </button>
          <div
            onClick={handleVolumeClick}
            className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden cursor-pointer relative"
          >
            <div
              className="h-full bg-secondary rounded-full transition-all"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>

        {/* Mobile Play Button */}
        <button
          onClick={toggle}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="md:hidden w-8 h-8 rounded-full bg-gradient-to-r from-primary-container to-surface-bright text-on-surface flex items-center justify-center shadow-[0_0_16px_rgba(226,132,158,0.55)] active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Animated Sound Bars Indicator */}
        <div className={`sound-bars-indicator flex items-end gap-0.5 h-3 px-1 ${isPlaying ? 'is-playing' : 'is-paused'}`}>
          <span className="w-0.5 bg-secondary rounded-full sound-bar-1" />
          <span className="w-0.5 bg-primary rounded-full sound-bar-2" />
          <span className="w-0.5 bg-secondary rounded-full sound-bar-3" />
        </div>
      </div>
    </div>
  );
};
