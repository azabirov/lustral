import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <span className="text-xl font-semibold tracking-widest">LUSTRAL</span>
            <p className="text-sm text-zinc-500 max-w-xs">
              Премиальное освещение для современных интерьеров. Свет как искусство.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Каталог</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="#" className="hover:text-black">Люстры</Link></li>
              <li><Link href="#" className="hover:text-black">Подвесные светильники</Link></li>
              <li><Link href="#" className="hover:text-black">Бра</Link></li>
              <li><Link href="#" className="hover:text-black">Настольные лампы</Link></li>
            </ul>
          </div>

          {/* Client Service */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Покупателям</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="#" className="hover:text-black">Доставка и оплата</Link></li>
              <li><Link href="#" className="hover:text-black">Гарантия</Link></li>
              <li><Link href="#" className="hover:text-black">Возврат</Link></li>
              <li><Link href="#" className="hover:text-black">Контакты</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Контакты</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li>+7 (999) 123-45-67</li>
              <li>hello@lustral.ru</li>
              <li>Москва, ул. Петровка, 15</li>
            </ul>
            <div className="mt-4 flex gap-4">
              <Instagram className="h-5 w-5 text-zinc-400 hover:text-black cursor-pointer" />
              <Facebook className="h-5 w-5 text-zinc-400 hover:text-black cursor-pointer" />
              <Twitter className="h-5 w-5 text-zinc-400 hover:text-black cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-200 pt-8 text-center text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} LUSTRAL. Все права защищены.
        </div>
      </div>
    </footer>
  );
}



