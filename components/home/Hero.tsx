'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useHero } from '@/context/HeroContext';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { heroData, isInitialized } = useHero();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isInitialized) {
       setLoaded(true);
    }
  }, [isInitialized]);

  // Auto-rotate images
  useEffect(() => {
    if (!heroData.images || heroData.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroData.images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [heroData.images]);

  const images = heroData.images || [];

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-zinc-900 -mt-16"> 
      {/* Background Image Layer - Carousel */}
      {/* Only render images if initialized to prevent flash of default content */}
      {isInitialized && images.map((src, index) => (
        <div 
          key={src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
           <div className={`absolute inset-0 transition-transform duration-[7s] ease-out ${
             index === currentImageIndex && loaded ? 'scale-105' : 'scale-110'
           }`}>
             <Image
               src={src}
               alt={`Hero Background ${index + 1}`}
               fill
               className="object-cover opacity-80"
               priority={index === 0}
             />
             {/* Overlay Gradient */}
             <div className="absolute inset-0 bg-black/40" />
           </div>
        </div>
      ))}

      {/* Fallback/Loading State */}
      {(!isInitialized || images.length === 0) && (
          <div className="absolute inset-0 bg-zinc-900 z-0" />
      )}

      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-24 pt-16">
        <div className="max-w-4xl">
           <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="mb-6 text-xs font-bold tracking-[0.3em] text-white uppercase">
                 Experimental Light Laboratory
              </p>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-white leading-[0.9] tracking-tight font-serif mb-8">
                 {heroData.title} <br />
                 <span className="text-zinc-400 italic">{heroData.subtitle}</span>
              </h1>
              <p className="max-w-xl text-lg text-zinc-300 font-light leading-relaxed mb-12">
                 {heroData.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                 <Link
                   href="/catalog"
                   className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors min-w-[200px]"
                 >
                   Каталог
                   <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                 </Link>
                 <Link
                   href="/about"
                   className="group inline-flex items-center justify-center gap-3 border border-white/30 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors min-w-[200px]"
                 >
                   О мастерской
                 </Link>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-12 left-6 sm:left-12 lg:left-24 right-6 flex justify-between items-end text-white/60 text-xs uppercase tracking-wider z-10">
         <div className="hidden sm:block">
            Based in Moscow
         </div>
         <div className="flex gap-8">
            {/* Slider Indicators */}
            <div className="flex gap-2 mb-1">
              {isInitialized && images.length > 1 && images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-1 transition-all duration-300 rounded-full ${
                    idx === currentImageIndex ? 'w-8 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
