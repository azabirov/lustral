'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  images: string[];
}

interface HeroContextType {
  heroData: HeroData;
  updateHeroData: (data: HeroData) => void;
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
  const [isMounted, setIsMounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem('lustral-hero');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Migration for old format if needed
        if (!parsed.images && parsed.imageUrl) {
          parsed.images = [parsed.imageUrl];
        }
        // Merge with defaults to ensure structure
        setHeroData({ ...defaultHeroData, ...parsed });
      } catch (e) {
        console.error('Failed to parse hero data', e);
      }
    }
    setIsInitialized(true);
  }, []);

  const updateHeroData = (data: HeroData) => {
    setHeroData(data);
    if (isMounted) {
      localStorage.setItem('lustral-hero', JSON.stringify(data));
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
