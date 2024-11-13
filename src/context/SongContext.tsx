import React, { createContext, useContext, useState, useEffect } from 'react';
import { Song, PrompterSettings, SongCategory } from '../types';

interface SongContextType {
  songs: Song[];
  addSong: (song: Omit<Song, 'id'>) => void;
  editSong: (song: Song) => void;
  deleteSong: (id: string) => void;
  getRandomSongByCategory: (category: SongCategory) => Song | null;
  prompterSettings: PrompterSettings;
  updatePrompterSettings: (settings: Partial<PrompterSettings>) => void;
}

const defaultSettings: PrompterSettings = {
  rotationInterval: 120,
  fontSize: 24,
  isDarkMode: true,
  useHighContrast: false,
};

const SongContext = createContext<SongContextType | null>(null);

export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('capoeiraSongs');
    return saved ? JSON.parse(saved) : [];
  });

  const [prompterSettings, setPrompterSettings] = useState<PrompterSettings>(() => {
    const saved = localStorage.getItem('prompterSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('capoeiraSongs', JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem('prompterSettings', JSON.stringify(prompterSettings));
  }, [prompterSettings]);

  const addSong = (song: Omit<Song, 'id'>) => {
    const newSong = { ...song, id: crypto.randomUUID() };
    setSongs(prev => [...prev, newSong]);
  };

  const editSong = (song: Song) => {
    setSongs(prev => prev.map(s => s.id === song.id ? song : s));
  };

  const deleteSong = (id: string) => {
    setSongs(prev => prev.filter(s => s.id !== id));
  };

  const getRandomSongByCategory = (category: SongCategory) => {
    const categorySongs = songs.filter(s => s.category === category);
    if (categorySongs.length === 0) return null;
    return categorySongs[Math.floor(Math.random() * categorySongs.length)];
  };

  const updatePrompterSettings = (settings: Partial<PrompterSettings>) => {
    setPrompterSettings(prev => ({ ...prev, ...settings }));
  };

  return (
    <SongContext.Provider value={{
      songs,
      addSong,
      editSong,
      deleteSong,
      getRandomSongByCategory,
      prompterSettings,
      updatePrompterSettings,
    }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongs = () => {
  const context = useContext(SongContext);
  if (!context) throw new Error('useSongs must be used within a SongProvider');
  return context;
};