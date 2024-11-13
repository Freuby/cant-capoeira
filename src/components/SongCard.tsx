import React from 'react';
import { Music, Edit } from 'lucide-react';
import { Song, CATEGORY_COLORS } from '../types';
import { Link } from 'react-router-dom';

interface SongCardProps {
  song: Song;
  showActions?: boolean;
}

export const SongCard: React.FC<SongCardProps> = ({ song, showActions = true }) => {
  const bgColor = CATEGORY_COLORS[song.category];

  return (
    <div 
      className="rounded-lg shadow-md p-4 mb-4"
      style={{ backgroundColor: `${bgColor}15` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{song.title}</h3>
          {song.mnemonic && (
            <p className="text-sm text-gray-600 mt-1">{song.mnemonic}</p>
          )}
        </div>
        {showActions && (
          <Link
            to={`/edit/${song.id}`}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Edit size={20} className="text-gray-600" />
          </Link>
        )}
      </div>
      {song.mediaLink && (
        <a
          href={song.mediaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-blue-600 mt-2"
        >
          <Music size={16} className="mr-1" />
          View Media
        </a>
      )}
    </div>
  );
};