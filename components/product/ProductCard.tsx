'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    addToCart(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white/90 backdrop-blur text-black py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            В корзину
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-zinc-500 mb-1">{product.category}</p>
          <h3 className="text-sm font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">
            {product.name}
          </h3>
        </div>
        <p className="text-sm font-semibold text-zinc-900">
          {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(product.price)}
        </p>
      </div>
    </Link>
  );
}
