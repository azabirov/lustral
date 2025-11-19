'use client';

import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/context/ProductContext";

export default function FeaturedProducts() {
  const { products } = useProducts();

  // Show first 6 products as featured
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">Популярные модели</h2>
          <p className="mt-2 text-zinc-500">Выбор наших дизайнеров</p>
        </div>
        <a href="/catalog" className="hidden text-sm font-medium text-zinc-600 hover:text-black sm:block">
          Смотреть все &rarr;
        </a>
      </div>
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="mt-10 text-center sm:hidden">
        <a href="/catalog" className="text-sm font-medium text-zinc-600 hover:text-black">
          Смотреть все &rarr;
        </a>
      </div>
    </section>
  );
}

