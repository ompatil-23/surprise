import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioSynthesizer } from '../data/audioSynthesizer';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [audioState, setAudioState] = useState(() => audioSynthesizer.getState());

  useEffect(() => {
    const unsubscribe = audioSynthesizer.subscribe((state) => {
      setAudioState({ ...state });
    });
    return unsubscribe;
  }, []);

  const value = {
    ...audioState,
    play: () => audioSynthesizer.play(),
    pause: () => audioSynthesizer.pause(),
    toggle: () => audioSynthesizer.toggle(),
    nextTrack: () => audioSynthesizer.nextTrack(),
    prevTrack: () => audioSynthesizer.prevTrack(),
    setVolume: (val) => audioSynthesizer.setVolume(val),
    seek: (sec) => audioSynthesizer.seek(sec),
    playCelebrationChime: () => audioSynthesizer.playCelebrationChime(),
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
