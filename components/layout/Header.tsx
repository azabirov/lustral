'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu, User, X, Instagram, Send } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change or desktop resize
  useEffect(() => {
    const handleResize = () => {
       if (window.innerWidth >= 1024) {
          setIsMobileMenuOpen(false);
       }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('open-search'));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-transparent transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md border-zinc-100 shadow-sm' : 'bg-white border-zinc-100'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Mobile Menu & Catalog */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-zinc-600 hover:text-zinc-900 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/catalog" className="text-sm font-medium text-zinc-600 transition-colors hover:text-black">
                Каталог
              </Link>
              <Link href="/about" className="text-sm font-medium text-zinc-600 transition-colors hover:text-black">
                О бренде
              </Link>
              <Link href="/projects" className="text-sm font-medium text-zinc-600 transition-colors hover:text-black">
                Проекты
              </Link>
            </nav>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-2xl font-bold tracking-widest text-black font-serif">
              LUSTRAL
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={openSearch}
              className="p-2 text-zinc-600 transition-colors hover:text-black hover:bg-zinc-100 rounded-full"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link 
              href={user ? "/profile" : "/login"} 
              className={`hidden sm:flex items-center justify-center p-2 text-zinc-600 transition-colors hover:text-black hover:bg-zinc-100 rounded-full ${user ? 'bg-zinc-100' : ''}`}
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              className="p-2 text-zinc-600 transition-colors hover:text-black hover:bg-zinc-100 rounded-full relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-black ring-2 ring-white animate-pulse-once"></span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
         {/* Backdrop */}
         <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
            onClick={() => setIsMobileMenuOpen(false)}
         />
         
         {/* Menu Content */}
         <div className={`fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-zinc-100">
               <span className="text-lg font-bold tracking-[0.2em] uppercase font-serif">МЕНЮ</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-500 hover:text-black transition-colors">
                  <X className="h-6 w-6" />
               </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-6 space-y-1">
               <Link 
                  href="/catalog" 
                  className="block py-3 text-xl font-medium text-zinc-900 hover:text-gold-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
               >
                  Каталог
               </Link>
               <Link 
                  href="/about" 
                  className="block py-3 text-xl font-medium text-zinc-900 hover:text-gold-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
               >
                  О бренде
               </Link>
               <Link 
                  href="/projects" 
                  className="block py-3 text-xl font-medium text-zinc-900 hover:text-gold-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
               >
                  Проекты
               </Link>
               <Link 
                  href="/contacts" 
                  className="block py-3 text-xl font-medium text-zinc-900 hover:text-gold-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
               >
                  Контакты
               </Link>

               <div className="my-6 border-t border-zinc-100"></div>

               <Link 
                  href={user ? "/profile" : "/login"} 
                  className="flex items-center gap-3 py-3 text-lg font-medium text-zinc-600 hover:text-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
               >
                  <User className="h-5 w-5" />
                  {user ? 'Мой профиль' : 'Войти в аккаунт'}
               </Link>
            </nav>

            {/* Footer */}
            <div className="p-6 bg-zinc-50 border-t border-zinc-100">
               <div className="flex gap-4 mb-4">
                  <a href="#" className="p-2 bg-white rounded-full text-zinc-600 hover:text-black hover:shadow-sm transition-all">
                     <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-2 bg-white rounded-full text-zinc-600 hover:text-black hover:shadow-sm transition-all">
                     <Send className="h-5 w-5" />
                  </a>
               </div>
               <p className="text-xs text-zinc-400 uppercase tracking-wider">
                  © 2025 Lustral<br/>
                  Moscow, Russia
               </p>
            </div>
         </div>
      </div>
    </>
  );
}
