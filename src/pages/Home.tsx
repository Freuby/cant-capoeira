import React from 'react';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSongs } from '../context/SongContext';
import { SongCard } from '../components/SongCard';
import { CATEGORY_COLORS, SongCategory } from '../types';

const CategorySection: React.FC<{
  title: string;
  category: SongCategory;
  color: string;
}> = ({ title, category, color }) => {
  const { songs } = useSongs();
  const categorySongs = songs.filter(song => song.category === category);

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold" style={{ color }}>
          {title}
        </h2>
        <span className="text-sm text-gray-500">
          {categorySongs.length} chant(s)
        </span>
      </div>
      <div className="space-y-4">
        {categorySongs.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cantigas Capoeira</h1>
        <Link
          to="/settings"
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Settings size={24} className="text-gray-600" />
        </Link>
      </div>

      <CategorySection
        title="Angola"
        category="angola"
        color={CATEGORY_COLORS.angola}
      />
      <CategorySection
        title="São Bento Pequeno"
        category="saoBentoPequeno"
        color={CATEGORY_COLORS.saoBentoPequeno}
      />
      <CategorySection
        title="São Bento Grande"
        category="saoBentoGrande"
        color={CATEGORY_COLORS.saoBentoGrande}
      />
    </div>
  );
};