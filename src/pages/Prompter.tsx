import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSongs } from '../context/SongContext';
import { Song, CATEGORY_COLORS } from '../types';

const PrompterSong: React.FC<{
  song: Song | null;
  onClick: () => void;
}> = ({ song, onClick }) => {
  if (!song) return null;

  return (
    <div
      onClick={onClick}
      className="flex-1 p-6 rounded-lg m-2 cursor-pointer"
      style={{
        backgroundColor: CATEGORY_COLORS[song.category],
        minHeight: '30vh',
      }}
    >
      <div className="h-full flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold mb-2 text-black">
          {song.mnemonic || song.title}
        </h2>
      </div>
    </div>
  );
};

export const Prompter = () => {
  const { getRandomSongByCategory, prompterSettings } = useSongs();
  const [songs, setSongs] = useState<(Song | null)[]>([]);
  const [showLyrics, setShowLyrics] = useState<Song | null>(null);
  const [timeLeft, setTimeLeft] = useState(prompterSettings.rotationInterval);

  const generateSongs = useCallback(() => {
    setSongs([
      getRandomSongByCategory('angola'),
      getRandomSongByCategory('saoBentoPequeno'),
      getRandomSongByCategory('saoBentoGrande'),
    ]);
    setTimeLeft(prompterSettings.rotationInterval);
  }, [getRandomSongByCategory, prompterSettings.rotationInterval]);

  useEffect(() => {
    generateSongs();
  }, [generateSongs]);

  useEffect(() => {
    const wakeLock = async () => {
      try {
        await navigator.wakeLock.request('screen');
      } catch (err) {
        console.error('Wake Lock error:', err);
      }
    };
    wakeLock();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          generateSongs();
          return prompterSettings.rotationInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [generateSongs, prompterSettings.rotationInterval]);

  if (showLyrics) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <button
          onClick={() => setShowLyrics(null)}
          className="mb-6 text-white"
        >
          ← Back to Prompter
        </button>
        <h2 className="text-2xl font-bold mb-4">{showLyrics.title}</h2>
        <pre className="whitespace-pre-wrap font-sans">
          {showLyrics.lyrics || 'No lyrics available'}
        </pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={generateSongs}
            className="p-2 hover:bg-gray-800 rounded-full"
          >
            <RotateCcw size={24} />
          </button>
          <Link to="/settings" className="p-2 hover:bg-gray-800 rounded-full">
            <Settings size={24} />
          </Link>
        </div>
      </div>

      <div className="flex flex-col h-[calc(100vh-80px)]">
        {songs.map((song, index) => (
          <PrompterSong
            key={song?.id || index}
            song={song}
            onClick={() => song && setShowLyrics(song)}
          />
        ))}
      </div>
    </div>
  );
};