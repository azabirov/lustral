'use client';

import { useProducts } from '@/context/ProductContext';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, Truck, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AddToCartButton from '@/components/product/AddToCartButton';
import { use, useEffect, useState } from 'react';
import { Product } from '@/lib/data';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products } = useProducts();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    setProduct(found);
    setIsLoading(false);
  }, [id, products]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
         <h2 className="text-2xl font-bold">Товар не найден</h2>
         <Link href="/catalog" className="text-black underline">Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumbs / Back */}
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-zinc-500 hover:text-black transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться в каталог
        </Link>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Image Gallery */}
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 rounded-sm lg:aspect-[4/5]">
          {product.image ? (
             <Image
               src={product.image}
               alt={product.name}
               fill
               className="object-cover"
               priority
             />
          ) : (
             <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-500">No Image</div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{product.name}</h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl tracking-tight text-zinc-900">
              {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(product.price)}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="space-y-6 text-base text-zinc-600">{product.description}</p>
          </div>

          {/* Specs (Static for now) */}
          <div className="mt-8 border-t border-zinc-200 pt-8">
            <h3 className="text-sm font-medium text-zinc-900">Характеристики</h3>
            <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="border-t border-gray-100 pt-4">
                <dt className="text-sm text-zinc-500">Материал</dt>
                <dd className="mt-1 text-sm text-zinc-900">Металл, Стекло</dd>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <dt className="text-sm text-zinc-500">Цоколь</dt>
                <dd className="mt-1 text-sm text-zinc-900">E27 / LED</dd>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <dt className="text-sm text-zinc-500">Стиль</dt>
                <dd className="mt-1 text-sm text-zinc-900">{product.category}</dd>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <dt className="text-sm text-zinc-500">Бренд</dt>
                <dd className="mt-1 text-sm text-zinc-900">Lustral Design</dd>
              </div>
            </dl>
          </div>

          {/* Add to Cart */}
          <div className="mt-10 flex">
            <AddToCartButton product={product} />
            <button
              type="button"
              className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500"
            >
               {/* Favorite icon placeholder */}
               <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
               </svg>
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
             <div className="flex items-center gap-3 text-sm text-zinc-600">
                <Check className="h-5 w-5 text-green-600" />
                <span>В наличии на складе</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-zinc-600">
                <Truck className="h-5 w-5" />
                <span>Бесплатная доставка</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-zinc-600">
                <Shield className="h-5 w-5" />
                <span>Гарантия 24 месяца</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
