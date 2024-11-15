import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSongs } from '../context/SongContext';

export const Settings = () => {
  const navigate = useNavigate();
  const { prompterSettings, updatePrompterSettings } = useSongs();

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Configuration du prompter</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minuteur (secondes)
          </label>
          <input
            type="number"
            min="30"
            max="300"
            step="30"
            value={prompterSettings.rotationInterval}
            onChange={e => updatePrompterSettings({
              rotationInterval: Number(e.target.value)
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Taille de la police
          </label>
          <input
            type="range"
            min="16"
            max="32"
            value={prompterSettings.fontSize}
            onChange={e => updatePrompterSettings({
              fontSize: Number(e.target.value)
            })}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Petit</span>
            <span>Grand</span>
          </div>
        </div>
      </div>
    </div>
  );
};