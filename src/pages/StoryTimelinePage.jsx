import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { useAudio } from '../context/AudioContext';

export const StoryTimelinePage = () => {
  const { data, setActiveChapter } = useSurprise();
  const { isPlaying, toggle, playCelebrationChime } = useAudio();
  const [playingMilestoneAudio, setPlayingMilestoneAudio] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);

  const toggleMilestoneAudio = (milestoneId) => {
    if (playingMilestoneAudio === milestoneId) {
      setPlayingMilestoneAudio(null);
    } else {
      setPlayingMilestoneAudio(milestoneId);
      if (!isPlaying) {
        toggle();
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden pb-space-xl">
      <div className="relative z-10 max-w-[1180px] mx-auto px-gutter-mobile lg:px-gutter">
        {/* Header Block */}
        <div className="pt-space-lg pb-space-xl flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high/70 backdrop-blur-md shadow-md mb-space-sm border border-secondary/30">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
            <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
              Chapter III • Celestial Chronology
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg text-primary-fixed tracking-tight max-w-3xl">
            The Constellation of Us
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-space-xs font-light">
            Every single step that brought me closer to you.
          </p>

          {/* Metric Accent Pill Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm mt-space-lg w-full max-w-2xl">
            <div className="bg-surface-container/60 backdrop-blur-md rounded-xl p-space-sm flex flex-col items-center shadow-lg border border-surface-container-high/40">
              <span className="font-headline-md text-headline-md text-secondary">
                {data.anniversaryDays || '1,460'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Days Entwined
              </span>
            </div>
            <div className="bg-surface-container/60 backdrop-blur-md rounded-xl p-space-sm flex flex-col items-center shadow-lg border border-surface-container-high/40">
              <span className="font-headline-md text-headline-md text-primary">
                {data.midnightCalls || '3,820+'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Midnight Whispers
              </span>
            </div>
            <div className="bg-surface-container/60 backdrop-blur-md rounded-xl p-space-sm flex flex-col items-center shadow-lg border border-surface-container-high/40">
              <span className="font-headline-md text-headline-md text-tertiary">
                {data.sharedUmbrellas || '1'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Shared Umbrella
              </span>
            </div>
            <div className="bg-surface-container/60 backdrop-blur-md rounded-xl p-space-sm flex flex-col items-center shadow-lg border border-surface-container-high/40">
              <span className="font-headline-md text-headline-md text-secondary-fixed">
                Infinite
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Wishes Ahead
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Spine Container */}
        <div className="relative w-full mt-space-md">
          {/* Vertical Glowing Stardust Trail */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-12 -translate-x-1/2 w-0.5 bg-gradient-to-b from-secondary via-primary to-secondary-fixed shadow-[0_0_12px_rgba(233,195,73,0.5)] pointer-events-none" />

          {/* Render Milestones */}
          {data.timelineMilestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            const isToday = milestone.id === '4';
            const isAudioActive = playingMilestoneAudio === milestone.id;

            return (
              <div
                key={milestone.id}
                className="relative flex flex-col md:flex-row items-center justify-between mb-space-xl group"
              >
                {/* Desktop Left Balancer or Card */}
                {isEven ? (
                  <div className="w-full md:w-[46%] pl-12 md:pl-0 md:pr-space-md order-2 md:order-1">
                    <MilestoneCard
                      milestone={milestone}
                      isAudioActive={isAudioActive}
                      onToggleAudio={() => toggleMilestoneAudio(milestone.id)}
                      onZoom={() => setZoomImage(milestone.image)}
                    />
                  </div>
                ) : (
                  <div className="hidden md:flex md:w-[46%] order-1 justify-end pr-space-lg">
                    <div className="text-right opacity-60 flex flex-col justify-center">
                      <span className="font-display-lg text-display-lg text-surface-container-highest select-none font-bold">
                        {milestone.number}
                      </span>
                      <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">
                        {milestone.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Central Glowing Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center order-1 md:order-2 z-20">
                  <div
                    className={`w-11 h-11 rounded-full ${
                      isToday
                        ? 'bg-secondary-container/50 shadow-[0_0_32px_rgba(233,195,73,0.85)] animate-pulse'
                        : 'bg-surface-container-highest shadow-[0_0_24px_rgba(233,195,73,0.4)]'
                    } flex items-center justify-center border border-secondary/30`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full ${
                        isToday
                          ? 'bg-secondary text-on-secondary'
                          : milestone.accent === 'primary'
                          ? 'bg-primary text-on-primary'
                          : milestone.accent === 'tertiary'
                          ? 'bg-tertiary text-on-tertiary'
                          : 'bg-secondary text-on-secondary'
                      } flex items-center justify-center animate-subtle-glow`}
                    >
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {isToday
                          ? 'cake'
                          : milestone.accent === 'primary'
                          ? 'nightlight'
                          : milestone.accent === 'tertiary'
                          ? 'cloudy_snowing'
                          : 'star'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Right Balancer or Card */}
                {isEven ? (
                  <div className="hidden md:flex md:w-[46%] order-3 justify-start pl-space-lg">
                    <div className="text-left opacity-60 flex flex-col justify-center">
                      <span className="font-display-lg text-display-lg text-surface-container-highest select-none font-bold">
                        {milestone.number}
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                        {milestone.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full md:w-[46%] pl-12 md:pl-space-md order-2 md:order-3">
                    <MilestoneCard
                      milestone={milestone}
                      isAudioActive={isAudioActive}
                      isToday={isToday}
                      onToggleAudio={() => toggleMilestoneAudio(milestone.id)}
                      onZoom={() => setZoomImage(milestone.image)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to next chapter */}
        <div className="mt-space-lg flex justify-center">
          <button
            onClick={() => setActiveChapter('a-letter')}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-container to-surface-bright text-on-surface font-title-md text-title-md hover:shadow-[0_0_25px_rgba(226,132,158,0.5)] transition-all flex items-center gap-2"
          >
            <span>Proceed to Chapter 04: A Letter From My Heart</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Image Zoom Lightbox */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/90 backdrop-blur-2xl cursor-pointer"
        >
          <div className="relative max-w-3xl w-full">
            <img src={zoomImage} alt="Zoomed milestone" className="w-full rounded-xl shadow-2xl" />
            <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Milestone Card Subcomponent
const MilestoneCard = ({ milestone, isAudioActive, isToday, onToggleAudio, onZoom }) => {
  return (
    <div
      className={`rounded-xl p-space-md shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        isToday
          ? 'bg-gradient-to-br from-surface-container via-surface-container-high to-surface-container-lowest border-2 border-secondary/50 shadow-[0_24px_50px_rgba(233,195,73,0.18)]'
          : 'bg-surface-container/85 backdrop-blur-xl border border-surface-container-high/50 hover:shadow-[0_20px_48px_-12px_rgba(233,195,73,0.18)]'
      }`}
    >
      {/* Top Foil Tag Bar */}
      <div className="flex items-center justify-between gap-space-xs mb-space-sm flex-wrap">
        <span
          className={`px-space-xs py-0.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider font-semibold shadow-sm ${
            isToday
              ? 'bg-secondary text-on-secondary'
              : 'bg-surface-container-highest text-secondary-fixed'
          }`}
        >
          {milestone.badge || `Milestone ${milestone.number}`}
        </span>
        <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
          {milestone.date}
        </span>
      </div>

      <h2
        className={`font-headline-md text-headline-md mb-1 ${
          isToday ? 'text-secondary-fixed font-bold' : 'text-primary-fixed'
        }`}
      >
        {milestone.title}
      </h2>

      <span className="font-label-md text-label-md text-secondary flex items-center gap-1 mb-space-sm">
        <span className="material-symbols-outlined text-[15px]">location_on</span>
        {milestone.location}
      </span>

      {/* Keepsake Photo */}
      {milestone.image && (
        <div className="relative w-full h-56 rounded-lg overflow-hidden my-space-sm shadow-md bg-surface-container-lowest group/img">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
            src={milestone.image}
            alt={milestone.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface/90 italic tracking-wide">
              {milestone.location.split('•')[0]}
            </span>
            <button
              onClick={onZoom}
              type="button"
              className="w-7 h-7 rounded-full bg-surface/80 backdrop-blur-md text-secondary flex items-center justify-center hover:bg-surface-container-high transition-colors"
              title="View full photo"
            >
              <span className="material-symbols-outlined text-[16px]">zoom_in</span>
            </button>
          </div>
        </div>
      )}

      {/* Quote Vignette */}
      <div className="bg-surface-container-high/60 rounded-lg p-space-sm my-space-sm border-l-2 border-primary/50">
        <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
          "{milestone.quote}"
        </p>
      </div>

      {/* Audio Snippet Controller */}
      {milestone.audioNote && (
        <div className="mt-space-sm pt-space-xs flex items-center justify-between bg-surface-container-lowest/85 rounded-full px-space-sm py-1.5 border border-surface-container-high/50">
          <div className="flex items-center gap-space-xs">
            <button
              onClick={onToggleAudio}
              type="button"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isAudioActive ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                Voice memo from that day
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate max-w-[200px]">
                {milestone.audioNote}
              </span>
            </div>
          </div>

          {/* Mini Waveform */}
          <div className={`flex items-end gap-1 h-4 px-2 ${isAudioActive ? 'is-playing' : 'is-paused'}`}>
            <span className="w-1 bg-secondary rounded-full sound-bar-1" />
            <span className="w-1 bg-primary rounded-full sound-bar-2" />
            <span className="w-1 bg-tertiary rounded-full sound-bar-3" />
            <span className="w-1 bg-secondary rounded-full sound-bar-2" />
          </div>
        </div>
      )}

      {/* Handwritten Keepsake Note */}
      {milestone.note && (
        <div className="mt-space-sm flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm italic">
          <span className="material-symbols-outlined text-secondary text-[16px]">edit_note</span>
          <span>{milestone.note}</span>
        </div>
      )}
    </div>
  );
};
