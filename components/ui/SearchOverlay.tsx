'use client';

import { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Listen for custom event to open search
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-search', handleOpen);
    return () => window.removeEventListener('open-search', handleOpen);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const filteredResults = query.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl animate-fade-in">
      <div className="mx-auto max-w-4xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="relative">
          <Search className="absolute left-0 top-3.5 h-8 w-8 text-zinc-300" />
          <input
            type="text"
            autoFocus
            placeholder="Поиск товаров..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-16 w-full border-b-2 border-zinc-200 bg-transparent pl-12 text-3xl font-medium text-zinc-900 placeholder:text-zinc-300 focus:border-black focus:outline-none font-serif"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-3.5 p-2 text-zinc-400 hover:text-zinc-900"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <div className="mt-12">
          {query.length > 1 ? (
            <div>
              <h3 className="mb-6 text-sm font-medium text-zinc-500 uppercase tracking-wider">Результаты</h3>
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {filteredResults.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 group"
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-sm bg-zinc-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-zinc-900 group-hover:text-zinc-600">{product.name}</h4>
                        <p className="text-sm text-zinc-500">{product.category}</p>
                        <p className="text-sm font-semibold mt-1">
                          {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500">Ничего не найдено</p>
              )}
            </div>
          ) : (
            <div>
               <h3 className="mb-6 text-sm font-medium text-zinc-500 uppercase tracking-wider">Популярные запросы</h3>
               <div className="flex flex-wrap gap-2">
                  {['Люстры', 'Хрусталь', 'Бра', 'Настольные лампы'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-4 py-2 bg-zinc-50 hover:bg-zinc-100 text-sm rounded-full text-zinc-600 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



