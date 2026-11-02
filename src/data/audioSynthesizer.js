// Web Audio API ambient synthesizer for romantic celestial chimes and melodies
class AmbientAudioSynthesizer {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.masterFilter = null;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.sequenceTimer = null;
    this.playheadSeconds = 0;
    this.durationSeconds = 225; // 3:45
    this.volume = 0.75;
    this.listeners = new Set();

    this.tracks = [
      {
        id: "nocturne",
        title: "Nocturne in Rose",
        subtitle: "Gentle Piano Melody",
        tag: "Birthday Theme",
        duration: 225,
        progression: [
          [277.18, 415.30, 554.37, 830.61], // C#m9
          [329.63, 493.88, 659.25, 987.77], // Emaj7
          [369.99, 554.37, 659.25, 830.61], // F#m11
          [415.30, 622.25, 830.61, 987.77], // G#m7
          [277.18, 369.99, 554.37, 659.25], // Soft resolve
          [329.63, 415.30, 622.25, 830.61]  // Sparkle cadence
        ]
      },
      {
        id: "starlight",
        title: "Starlight Lullaby",
        subtitle: "Ethereal Music Box",
        tag: "Midnight Chimes",
        duration: 198,
        progression: [
          [523.25, 659.25, 783.99, 1046.50], // C major
          [440.00, 523.25, 659.25, 880.00],  // A minor
          [349.23, 440.00, 523.25, 698.46],  // F major
          [392.00, 493.88, 587.33, 783.99]   // G major
        ]
      },
      {
        id: "birthday_hymn",
        title: "Birthday Wish Melodia",
        subtitle: "Harmonic Celestial Waltz",
        tag: "Special Moment",
        duration: 210,
        progression: [
          [261.63, 329.63, 392.00, 523.25],
          [293.66, 369.99, 440.00, 587.33],
          [329.63, 415.30, 493.88, 659.25],
          [261.63, 392.00, 523.25, 783.99]
        ]
      }
    ];
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.getState()));
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.tracks[this.currentTrackIndex],
      currentTrackIndex: this.currentTrackIndex,
      playheadSeconds: this.playheadSeconds,
      durationSeconds: this.tracks[this.currentTrackIndex].duration,
      volume: this.volume
    };
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      this.audioCtx = new AudioContextClass();

      this.masterFilter = this.audioCtx.createBiquadFilter();
      this.masterFilter.type = "lowpass";
      this.masterFilter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);
      this.masterFilter.Q.setValueAtTime(1.2, this.audioCtx.currentTime);

      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.28 * this.volume, this.audioCtx.currentTime);

      this.masterFilter.connect(this.masterGain);
      this.masterGain.connect(this.audioCtx.destination);
    }

    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  playNote(freq, delay = 0, isBass = false) {
    if (!this.audioCtx || !this.isPlaying) return;
    const startTime = this.audioCtx.currentTime + delay;

    // Primary oscillator
    const osc1 = this.audioCtx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, startTime);

    // Warm body harmonic oscillator
    const osc2 = this.audioCtx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * (isBass ? 0.5 : 2.003), startTime);

    const noteGain = this.audioCtx.createGain();
    const noteFilter = this.audioCtx.createBiquadFilter();
    noteFilter.type = "lowpass";
    noteFilter.frequency.setValueAtTime(isBass ? 450 : 2200, startTime);

    const peakVolume = (isBass ? 0.16 : 0.12 + Math.random() * 0.06) * this.volume;
    const attackDuration = 0.04 + Math.random() * 0.03;
    const releaseDuration = (isBass ? 3.2 : 2.4) + Math.random() * 0.8;

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(peakVolume, startTime + attackDuration);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + releaseDuration);

    osc1.connect(noteFilter);
    osc2.connect(noteFilter);
    noteFilter.connect(noteGain);
    noteGain.connect(this.masterFilter);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + releaseDuration);
    osc2.stop(startTime + releaseDuration);
  }

  playChordArpeggio(notes, rootDelay = 0) {
    if (!this.isPlaying) return;
    this.playNote(notes[0] * 0.5, rootDelay, true); // Deep root bass

    notes.forEach((freq, idx) => {
      const staggeredDelay = rootDelay + (idx * 0.32) + (Math.random() * 0.08);
      this.playNote(freq, staggeredDelay, false);
      if (Math.random() > 0.45) {
        this.playNote(freq * 2, staggeredDelay + 0.48, false); // Shimmer octave
      }
    });
  }

  startSequence() {
    const track = this.tracks[this.currentTrackIndex];
    let stepIndex = 0;

    const tick = () => {
      if (!this.isPlaying) return;
      const chords = track.progression;
      const currentChord = chords[stepIndex % chords.length];
      this.playChordArpeggio(currentChord, 0);

      stepIndex++;
      this.playheadSeconds = (this.playheadSeconds + 2) % track.duration;
      this.notify();

      this.sequenceTimer = setTimeout(tick, 2200 + Math.random() * 600);
    };

    tick();
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startSequence();
    this.notify();
  }

  pause() {
    this.isPlaying = false;
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  nextTrack() {
    const wasPlaying = this.isPlaying;
    this.pause();
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.playheadSeconds = 0;
    if (wasPlaying) {
      this.play();
    } else {
      this.notify();
    }
  }

  prevTrack() {
    const wasPlaying = this.isPlaying;
    this.pause();
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.playheadSeconds = 0;
    if (wasPlaying) {
      this.play();
    } else {
      this.notify();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(0.28 * this.volume, this.audioCtx.currentTime);
    }
    this.notify();
  }

  seek(seconds) {
    const track = this.tracks[this.currentTrackIndex];
    this.playheadSeconds = Math.max(0, Math.min(track.duration, seconds));
    this.notify();
  }

  // Play celebratory birthday chime fanfar
  playCelebrationChime() {
    this.init();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(this.masterGain || this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 1.2);
      }, idx * 120);
    });
  }
}

export const audioSynthesizer = new AmbientAudioSynthesizer();
