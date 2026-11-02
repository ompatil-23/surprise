import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSurpriseData } from '../data/defaultData';

const SurpriseContext = createContext(null);

export const SurpriseProvider = ({ children }) => {
  const [activeChapter, setActiveChapter] = useState('welcome');
  
  // Persistent data stored in localStorage so customizations survive reloads
  const DATA_VERSION = 'romantic_surprise_data_v4';
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(DATA_VERSION);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved surprise data', e);
    }
    return initialSurpriseData;
  });

  const [waxSealBroken, setWaxSealBroken] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(DATA_VERSION, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save surprise data', e);
    }
  }, [data]);

  const updatePartnerName = (name) => {
    setData((prev) => ({ ...prev, partnerName: name }));
  };

  const updateLetter = (field, value) => {
    setData((prev) => ({
      ...prev,
      letter: {
        ...prev.letter,
        [field]: value
      }
    }));
  };

  const updateLetterParagraph = (index, value) => {
    setData((prev) => {
      const newParagraphs = [...prev.letter.paragraphs];
      newParagraphs[index] = value;
      return {
        ...prev,
        letter: {
          ...prev.letter,
          paragraphs: newParagraphs
        }
      };
    });
  };

  const updateReasonNote = (id, newNote) => {
    setData((prev) => ({
      ...prev,
      reasons: prev.reasons.map((r) => (r.id === id ? { ...r, note: newNote } : r))
    }));
  };

  const addMemory = (newMemory) => {
    setData((prev) => ({
      ...prev,
      memories: [
        {
          ...newMemory,
          id: String(Date.now()),
          number: `#0${prev.memories.length + 1}`,
          likes: 0
        },
        ...prev.memories
      ]
    }));
  };

  const toggleMemoryLike = (id) => {
    setData((prev) => ({
      ...prev,
      memories: prev.memories.map((m) =>
        m.id === id ? { ...m, likes: (m.likes || 0) + 1 } : m
      )
    }));
  };

  const updateBirthdayWishNote = (note) => {
    setData((prev) => ({
      ...prev,
      birthdayWish: {
        ...prev.birthdayWish,
        note
      }
    }));
  };

  const updateFinalNote = (note) => {
    setData((prev) => ({
      ...prev,
      finalStarlight: {
        ...prev.finalStarlight,
        editableNote: note
      }
    }));
  };

  const resetAllData = () => {
    setData(initialSurpriseData);
    setWaxSealBroken(false);
    setEnvelopeOpened(false);
    setCandleBlown(false);
    localStorage.removeItem('romantic_surprise_data');
  };

  const navigateToChapter = (chapterId) => {
    setActiveChapter(chapterId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SurpriseContext.Provider
      value={{
        activeChapter,
        setActiveChapter: navigateToChapter,
        data,
        updatePartnerName,
        updateLetter,
        updateLetterParagraph,
        updateReasonNote,
        addMemory,
        toggleMemoryLike,
        updateBirthdayWishNote,
        updateFinalNote,
        resetAllData,
        waxSealBroken,
        setWaxSealBroken,
        envelopeOpened,
        setEnvelopeOpened,
        candleBlown,
        setCandleBlown
      }}
    >
      {children}
    </SurpriseContext.Provider>
  );
};

export const useSurprise = () => {
  const context = useContext(SurpriseContext);
  if (!context) {
    throw new Error('useSurprise must be used within a SurpriseProvider');
  }
  return context;
};
