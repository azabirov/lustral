'use client';

import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { merchProducts } from '@/lib/data';
import { Minus, Plus, X, ArrowRight, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, addToCart, totalPrice } = useCart();
  const { products } = useProducts(); // Get dynamic products if needed for validation/updates
  const router = useRouter();
  const [customDonation, setCustomDonation] = useState('');

  // Handle donation as a "product" addition
  const handleDonation = (amount: number) => {
    const donationItem = {
      id: `donation-${amount}`,
      name: 'Пожертвование',
      price: amount,
      category: 'Donation',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800',
      description: 'Поддержка образовательной программы LUSTRAL.',
      isMerch: true,
    };
    addToCart(donationItem);
    setCustomDonation('');
  };

  const handleCustomDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customDonation);
    if (amount > 0) {
      handleDonation(amount);
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-medium text-zinc-900 mb-8">Корзина</h1>

        {items.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-sm shadow-sm">
             <p className="text-zinc-500 text-lg mb-6">Ваша корзина пуста</p>
             <Link href="/catalog" className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-zinc-800 transition-colors">
               Перейти в каталог
             </Link>
           </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            {/* Cart Items */}
            <section className="lg:col-span-7">
              <div className="bg-white shadow-sm rounded-sm overflow-hidden">
                <ul role="list" className="divide-y divide-zinc-100">
                  {items.map((item) => (
                    <li key={item.id} className="p-6 sm:flex sm:items-center">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-zinc-100 sm:h-32 sm:w-32">
                        {item.image ? (
                           <Image
                             src={item.image}
                             alt={item.name}
                             fill
                             className="object-cover object-center"
                           />
                        ) : (
                           <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-xs text-zinc-500">No Image</div>
                        )}
                      </div>

                      <div className="ml-4 flex-1 sm:ml-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-zinc-900">
                              <Link href={`/product/${item.id}`} className="hover:text-zinc-600 font-serif">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-zinc-500">{item.category}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-zinc-500"
                          >
                            <span className="sr-only">Удалить</span>
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-zinc-200 rounded-sm">
                             <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-zinc-50 text-zinc-500 hover:text-black transition-colors disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-10 text-center text-zinc-900 font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-zinc-50 text-zinc-500 hover:text-black transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                          </div>
                          <p className="text-lg font-medium text-zinc-900">
                            {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Merch / Add-ons */}
              <div className="mt-10">
                 <h3 className="text-lg font-medium text-zinc-900 mb-4 font-serif">Дополнить заказ</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {merchProducts.map(product => (
                       <div key={product.id} className="bg-white p-4 rounded-sm shadow-sm flex gap-4 items-start">
                          <div className="relative h-20 w-20 flex-shrink-0 bg-zinc-100 rounded-sm overflow-hidden">
                             <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                             <h4 className="font-medium text-sm text-zinc-900">{product.name}</h4>
                             <p className="text-sm text-zinc-500 mt-1">
                                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(product.price)}
                             </p>
                             <button 
                                onClick={() => addToCart(product)}
                                className="mt-3 text-xs font-semibold text-black border-b border-black pb-0.5 hover:text-zinc-600 hover:border-zinc-600"
                             >
                                Добавить
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Donation */}
              <div className="mt-10 bg-white p-6 rounded-sm shadow-sm border border-gold-100">
                 <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-3 bg-gold-50 rounded-full text-gold-600 flex-shrink-0">
                       <Heart className="h-6 w-6" />
                    </div>
                    <div className="flex-1 w-full">
                       <h3 className="text-lg font-medium text-zinc-900 font-serif">Поддержка молодых мастеров</h3>
                       <p className="text-sm text-zinc-600 mt-1">
                          Мы обучаем студентов художественных вузов работе со светом. Вы можете добавить пожертвование в фонд нашей образовательной программы.
                       </p>
                       <div className="mt-4 flex flex-wrap gap-3">
                          {[500, 1000, 2000].map(amount => (
                             <button 
                                key={amount}
                                onClick={() => handleDonation(amount)}
                                className="px-4 py-2 border border-zinc-200 rounded-sm text-sm font-medium hover:border-gold-400 hover:text-gold-600 transition-colors bg-white"
                             >
                                + {amount} ₽
                             </button>
                          ))}
                          
                          <form onSubmit={handleCustomDonation} className="flex items-center gap-2">
                             <input 
                               type="number" 
                               min="1"
                               placeholder="Другая сумма"
                               value={customDonation}
                               onChange={(e) => setCustomDonation(e.target.value)}
                               className="w-32 px-3 py-2 border border-zinc-200 rounded-sm text-sm focus:border-gold-400 focus:ring-gold-400 outline-none"
                             />
                             <button 
                               type="submit"
                               className="px-4 py-2 bg-black text-white rounded-sm text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                               disabled={!customDonation}
                             >
                                Ок
                             </button>
                          </form>
                       </div>
                    </div>
                 </div>
              </div>
            </section>

            {/* Summary */}
            <section className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="bg-white p-6 sm:p-8 shadow-sm rounded-sm sticky top-24">
                <h2 className="text-lg font-medium text-zinc-900 mb-6 font-serif">Сумма заказа</h2>
                
                <div className="flow-root">
                  <dl className="-my-4 divide-y divide-zinc-100 text-sm">
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-zinc-600">Подытог</dt>
                      <dd className="font-medium text-zinc-900">
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(totalPrice)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-zinc-600">Доставка</dt>
                      <dd className="font-medium text-zinc-900">Рассчитывается далее</dd>
                    </div>
                    <div className="flex items-center justify-between py-4 border-t border-zinc-100">
                      <dt className="text-base font-medium text-zinc-900">Итого</dt>
                      <dd className="text-base font-medium text-zinc-900">
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(totalPrice)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-black border border-transparent px-4 py-4 text-base font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center justify-center gap-2 group"
                  >
                    Перейти к оформлению
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <div className="mt-6 text-center text-sm text-zinc-500">
                    <p>
                      или{' '}
                      <Link href="/catalog" className="font-medium text-black hover:text-zinc-600">
                        продолжить покупки
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
