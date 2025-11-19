'use client';

import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/product/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const categories = ["Все", "Люстры", "Подвесные светильники", "Настенные бра", "Настольные лампы", "Аксессуары"];

export default function CatalogPage() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = products
    .filter(p => selectedCategory === "Все" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-zinc-50 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-medium text-zinc-900 sm:text-5xl">Каталог</h1>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Выберите идеальное освещение для вашего дома из нашей эксклюзивной коллекции.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="text-sm font-medium text-zinc-900 mb-4 uppercase tracking-wider">Категории</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`hover:text-black transition-colors ${selectedCategory === cat ? 'text-black font-semibold' : ''}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
             <div>
              <h3 className="text-sm font-medium text-zinc-900 mb-4 uppercase tracking-wider">Сортировка</h3>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-sm border-zinc-200 text-sm focus:border-black focus:ring-black"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters Bar */}
          <div className="lg:hidden flex items-center justify-between pb-6 border-b border-zinc-100 mb-6">
             <span className="text-sm font-medium">{filteredProducts.length} товаров</span>
             <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm font-medium border-none focus:ring-0 bg-transparent"
             >
               {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-zinc-500">
                В данной категории пока нет товаров.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
