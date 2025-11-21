'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { updateHeroAction } from '@/app/actions/admin';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  images: string[];
}

interface HeroContextType {
  heroData: HeroData;
  updateHeroData: (data: HeroData) => Promise<void>;
  isInitialized: boolean;
}

const defaultHeroData: HeroData = {
  title: 'Скульптура',
  subtitle: 'Света и Формы',
  description: 'Мы исследуем границы возможного, создавая объекты, где технологии 3D-печати встречаются с искусством. Свет как новая форма материи.',
  images: [
    'https://images.unsplash.com/photo-1506158669146-619067262a00?auto=format&fit=crop&q=80&w=2800',
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=2892',
    'https://images.unsplash.com/photo-1540932296774-3ed6d6147032?auto=format&fit=crop&q=80&w=2800'
  ],
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [heroData, setHeroData] = useState<HeroData>(defaultHeroData);
  const [isInitialized, setIsInitialized] = useState(false);

  // Read is public (fine)
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'hero_data')
          .single();

        if (data && data.value) {
          setHeroData({ ...defaultHeroData, ...data.value });
        }
      } catch (e) {
        console.error('Failed to load hero data', e);
      } finally {
        setIsInitialized(true);
      }
    };

    fetchHeroData();
  }, []);

  // Write is secured via Server Action
  const updateHeroData = async (data: HeroData) => {
    try {
      setHeroData(data); // Optimistic update
      await updateHeroAction(data);
    } catch (e) {
      console.error('Failed to save hero data:', e);
      alert('Ошибка сохранения данных. Вы администратор?');
    }
  };

  return (
    <HeroContext.Provider value={{ heroData, updateHeroData, isInitialized }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
}
