import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';

export const MemoriesPage = () => {
  const { data, addMemory, toggleMemoryLike } = useSurprise();

  const [selectedYear, setSelectedYear] = useState('all');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [activeLightboxMemory, setActiveLightboxMemory] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newYear, setNewYear] = useState('2024');
  const [newImage, setNewImage] = useState('');

  const filteredMemories = selectedYear === 'all'
    ? data.memories
    : data.memories.filter((m) => m.year === selectedYear);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addMemory({
      title: newTitle,
      caption: newCaption || 'A moment etched in my heart forever.',
      date: newDate || 'Recently',
      location: newLocation || 'Everywhere With You',
      year: newYear,
      rotation: (Math.random() * 4 - 2).toFixed(1),
      tapeColor: ['secondary', 'primary', 'tertiary'][Math.floor(Math.random() * 3)],
      image: newImage || '/photos/couple_1.png',
    });

    setNewTitle('');
    setNewCaption('');
    setNewDate('');
    setNewLocation('');
    setNewImage('');
    setAddModalOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startSlideshow = () => {
    setSlideshowIndex(0);
    setSlideshowOpen(true);
    if (!isPlaying) toggle();
  };

  return (
    <section className="relative w-full overflow-hidden px-gutter-mobile lg:px-gutter py-space-xl">
      <div className="pointer-events-none absolute top-12 left-1/12 w-64 h-64 rounded-full bg-primary-container/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-8 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl" />

      <div className="max-w-[1180px] mx-auto w-full flex flex-col gap-space-xl">
        {/* Header Block */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="font-label-md text-label-md uppercase tracking-widest text-secondary-fixed">
                Chapter 02 • Constellation of Days
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg lg:font-display-lg lg:text-display-lg text-on-surface tracking-tight">
              Little Moments, <br className="hidden sm:inline" />
              <span className="italic font-display-lg text-primary-fixed">Forever Memories</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl pt-2">
              A scrapbook of ordinary days that turned into our greatest adventures. Fleeting glances, spilled coffee, and midnight drives preserved under soft glass.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low/80 backdrop-blur-xl p-1.5 rounded-full shadow-lg border border-surface-container-high/60">
            <button
              onClick={() => setAddModalOpen(true)}
              className="group flex items-center gap-2 px-space-md py-2 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
              <span className="font-label-md text-label-md font-semibold">Add Snapshot</span>
            </button>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="flex items-center gap-1.5 px-space-sm py-2 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all text-label-md font-label-md"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">calendar_month</span>
                <span>
                  {selectedYear === 'all'
                    ? 'All Timelines'
                    : selectedYear === '2024'
                    ? '2024 (Now)'
                    : selectedYear === '2023'
                    ? '2023 (Firsts)'
                    : `${selectedYear} (Origins)`}
                </span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>

              {filterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-surface-container-highest rounded-xl shadow-2xl p-1.5 z-40 border border-secondary/20">
                  {['all', '2024', '2023', '2022'].map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setFilterDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container transition-colors"
                    >
                      {year === 'all'
                        ? 'All Timelines'
                        : year === '2024'
                        ? '2024 (Now)'
                        : year === '2023'
                        ? '2023 (Firsts)'
                        : '2022 (Origins)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Slideshow Trigger */}
            <button
              onClick={startSlideshow}
              className="flex items-center gap-1.5 px-space-sm py-2 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all text-label-md font-label-md"
              title="Launch Slideshow"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">slideshow</span>
              <span className="hidden sm:inline">Play Keepsake</span>
            </button>
          </div>
        </div>

        {/* Polaroid Mosaic Grid */}
        <div className="relative w-full pt-6 pb-12">
          {/* Decorative SVG star flourish */}
          <div className="pointer-events-none absolute -top-4 right-1/4 select-none opacity-40">
            <svg className="text-secondary stroke-current stroke-[1.2]" fill="none" height="84" viewBox="0 0 84 84" width="84">
              <path d="M42 4L44.5 35L76 42L44.5 49L42 80L39.5 49L8 42L39.5 35Z" strokeLinejoin="round" />
              <circle cx="42" cy="42" fill="currentColor" r="3" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10 items-start">
            {filteredMemories.map((memory) => {
              const rot = memory.rotation || 0;
              return (
                <div
                  key={memory.id}
                  onClick={() => setActiveLightboxMemory(memory)}
                  className="memory-card-wrapper group relative cursor-pointer"
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  {/* Washi Tape Strip */}
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 ${
                      memory.tapeColor === 'primary'
                        ? 'bg-primary-container/40'
                        : memory.tapeColor === 'tertiary'
                        ? 'bg-tertiary-container/40'
                        : 'bg-secondary/35'
                    } backdrop-blur-sm shadow-sm rounded-xs z-20 pointer-events-none transform -rotate-1`}
                  />

                  {/* Polaroid Frame */}
                  <div className="relative bg-[#FAF6F0] p-4 pb-6 rounded-lg shadow-2xl transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2 group-hover:shadow-[0_24px_48px_rgba(34,3,13,0.6)]">
                    {/* Photo Container */}
                    <div className="relative w-full aspect-[4/4.2] bg-surface-container overflow-hidden rounded-xs flex flex-col items-center justify-center group-hover:brightness-[1.03] transition-all">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={memory.image}
                        alt={memory.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/60 via-transparent to-transparent opacity-40" />
                    </div>

                    {/* Polaroid Text Area */}
                    <div className="pt-4 flex flex-col gap-1 px-1">
                      <span className="font-headline-md text-[19px] leading-tight text-[#2D161C] italic tracking-tight font-serif line-clamp-2">
                        {memory.title}
                      </span>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#795B64] font-medium truncate max-w-[200px]">
                          {memory.date} • {memory.location}
                        </span>
                        <div className="flex items-center gap-1 text-[#A67C52]">
                          <span className="font-label-sm text-[10px] tracking-widest font-mono">
                            {memory.number || '#01'}
                          </span>
                          {memory.likes > 0 && (
                            <span className="text-[10px] text-primary flex items-center ml-1">
                              ♥ {memory.likes}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Keepsake Stats Banner */}
        <div className="relative w-full bg-surface-container-low/70 backdrop-blur-2xl rounded-xl p-space-md lg:p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md shadow-xl border border-surface-container-high/40">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary shadow-md">
              <span className="material-symbols-outlined text-[26px]">collections_bookmark</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-title-lg text-title-lg text-on-surface">The Constellation Album</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {data.memories.length} etched polaroids • Unlimited memories preserved under starlight
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
            Tap any polaroid to view & read our memories
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter-mobile lg:p-gutter bg-surface-container-lowest/85 backdrop-blur-2xl transition-all duration-300">
          <div className="relative w-full max-w-3xl bg-surface-container-high rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-secondary/30">
            <button
              onClick={() => setActiveLightboxMemory(null)}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-highest transition-colors shadow-lg"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Photo Pane */}
            <div className="w-full md:w-1/2 bg-surface-container-lowest relative flex items-center justify-center min-h-[260px] md:min-h-[420px] p-4">
              <img
                src={activeLightboxMemory.image}
                alt={activeLightboxMemory.title}
                className="max-h-[360px] w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Content Pane */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between text-secondary mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">
                    {activeLightboxMemory.date} • {activeLightboxMemory.location}
                  </span>
                  <span className="font-label-sm font-mono text-secondary-fixed">
                    {activeLightboxMemory.number}
                  </span>
                </div>

                <h3 className="font-headline-md text-headline-md text-primary-fixed mb-3 font-serif italic">
                  {activeLightboxMemory.title}
                </h3>

                <p className="font-body-md text-body-md text-on-surface leading-relaxed italic border-l-2 border-secondary/40 pl-3 my-4">
                  “{activeLightboxMemory.caption}”
                </p>
              </div>

              <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
                <button
                  onClick={() => toggleMemoryLike(activeLightboxMemory.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors font-label-md text-label-md"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                  <span>{activeLightboxMemory.likes || 0} Loves</span>
                </button>

                <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary">lock_clock</span>
                  <span>Cherished Forever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter-mobile bg-surface-container-lowest/80 backdrop-blur-2xl">
          <div className="relative w-full max-w-lg bg-surface-container-high rounded-xl p-space-lg shadow-2xl border border-secondary/30">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <h3 className="font-headline-md text-headline-md text-primary-fixed mb-1 font-serif">
              Add a Cherished Snapshot
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Capture another memory into your infinite constellation album.
            </p>

            <form onSubmit={handleAddSubmit} className="flex flex-col gap-3">
              <div>
                <label className="font-label-sm text-label-sm text-secondary uppercase block mb-1">
                  Memory Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. That spontaneous walk under the stars"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container-highest text-on-surface focus:border-secondary outline-none text-body-sm"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-secondary uppercase block mb-1">
                  Heartfelt Caption
                </label>
                <textarea
                  rows={3}
                  placeholder="What made this moment so special..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container-highest text-on-surface focus:border-secondary outline-none text-body-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-label-sm text-label-sm text-secondary uppercase block mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. October 2024"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container-highest text-on-surface focus:border-secondary outline-none text-body-sm"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-secondary uppercase block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kyoto Cafe"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container-highest text-on-surface focus:border-secondary outline-none text-body-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-secondary uppercase block mb-1">
                  Upload Photo or Paste URL
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-label-sm text-on-surface-variant file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-surface-container file:text-primary file:font-semibold"
                />
                <input
                  type="url"
                  placeholder="Or paste an image URL here..."
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full mt-2 bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-surface-container-highest text-on-surface focus:border-secondary outline-none text-body-sm"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-primary-container to-surface-bright text-on-surface font-title-md text-title-md hover:shadow-lg transition-all font-semibold"
              >
                Save to Album ✨
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Slideshow Modal */}
      {slideshowOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/95 backdrop-blur-2xl">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button
              onClick={() => setSlideshowOpen(false)}
              className="absolute top-2 right-2 z-30 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            {data.memories[slideshowIndex] && (
              <div className="flex flex-col items-center text-center animate-fadeIn">
                <div className="bg-[#FAF6F0] p-4 pb-8 rounded-xl shadow-2xl max-w-md w-full">
                  <img
                    src={data.memories[slideshowIndex].image}
                    alt={data.memories[slideshowIndex].title}
                    className="w-full aspect-square object-cover rounded"
                  />
                  <h4 className="font-headline-md text-headline-md text-[#2D161C] italic mt-4 font-serif">
                    {data.memories[slideshowIndex].title}
                  </h4>
                  <p className="font-body-sm text-[#795B64] mt-1 italic">
                    {data.memories[slideshowIndex].caption}
                  </p>
                  <span className="font-label-sm text-[#A67C52] uppercase mt-2 block">
                    {data.memories[slideshowIndex].date} • {data.memories[slideshowIndex].location}
                  </span>
                </div>

                {/* Slideshow Navigation Buttons */}
                <div className="flex items-center gap-6 mt-6">
                  <button
                    onClick={() =>
                      setSlideshowIndex(
                        (slideshowIndex - 1 + data.memories.length) % data.memories.length
                      )
                    }
                    className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:scale-110 transition-transform shadow-lg"
                  >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                  </button>
                  <span className="font-label-md text-secondary-fixed">
                    {slideshowIndex + 1} / {data.memories.length}
                  </span>
                  <button
                    onClick={() =>
                      setSlideshowIndex((slideshowIndex + 1) % data.memories.length)
                    }
                    className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:scale-110 transition-transform shadow-lg"
                  >
                    <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
