'use client';

import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product, className }: { product: Product, className?: string }) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className={className || "flex max-w-xs flex-1 items-center justify-center border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full transition-colors"}
    >
      Добавить в корзину
    </button>
  );
}



