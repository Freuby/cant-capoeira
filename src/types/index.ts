export type SongCategory = 'angola' | 'saoBentoPequeno' | 'saoBentoGrande';

export interface Song {
  id: string;
  title: string;
  category: SongCategory;
  mnemonic?: string;
  lyrics?: string;
  mediaLink?: string;
}

export interface PrompterSettings {
  rotationInterval: number;
  fontSize: number;
  isDarkMode: boolean;
  useHighContrast: boolean;
}

export const CATEGORY_COLORS = {
  angola: '#E8DF24',
  saoBentoPequeno: '#03A501',
  saoBentoGrande: '#0467B0',
} as const;