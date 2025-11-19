'use client';

import { Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { products } from '@/lib/data';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 mb-8 md:mb-0 flex-shrink-0">
          <div className="bg-zinc-50 p-6 rounded-sm">
            <div className="mb-6 text-center">
               <div className="h-20 w-20 bg-zinc-200 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-serif text-zinc-500 uppercase">
                  {user.firstName[0]}
               </div>
               <h2 className="font-semibold text-zinc-900">{user.firstName} {user.lastName}</h2>
               <p className="text-sm text-zinc-500">{user.email}</p>
            </div>
            <nav className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm font-medium bg-white shadow-sm text-black rounded-sm">
                Мои заказы
              </button>
              <button className="w-full text-left px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-sm">
                Избранное
              </button>
              <button className="w-full text-left px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-sm">
                Настройки
              </button>
              <button 
                onClick={() => { logout(); router.push('/'); }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-sm mt-4"
              >
                Выйти
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-2xl font-serif font-bold text-zinc-900 mb-8">История заказов</h1>
          
          <div className="space-y-6">
            {/* Order Item Mock */}
            <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden">
              <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">Заказ от</p>
                  <p className="font-medium text-zinc-900">15 Ноября 2025</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Номер заказа</p>
                  <p className="font-medium text-zinc-900">#LUS-8823</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Итого</p>
                  <p className="font-medium text-zinc-900">125 000 ₽</p>
                </div>
                <div>
                   <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Доставлен
                   </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="h-16 w-16 bg-zinc-100 rounded-sm relative overflow-hidden">
                      <Image 
                        src={products[0].image} 
                        alt={products[0].name}
                        fill
                        className="object-cover"
                      />
                   </div>
                   <div>
                      <h4 className="font-medium text-zinc-900">{products[0].name}</h4>
                      <p className="text-sm text-zinc-500">1 шт.</p>
                   </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-zinc-100">
                   <button className="text-sm font-medium text-black hover:text-zinc-600 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Отследить заказ
                   </button>
                   <span className="text-zinc-300">|</span>
                   <button className="text-sm font-medium text-black hover:text-zinc-600">
                      Повторить заказ
                   </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
