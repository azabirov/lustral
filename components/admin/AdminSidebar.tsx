'use client';

import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Image as ImageIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Обзор', icon: LayoutDashboard },
    { href: '/admin/hero', label: 'Hero Секция', icon: ImageIcon },
    { href: '/admin/products', label: 'Товары', icon: Package },
    { href: '/admin/orders', label: 'Заказы', icon: ShoppingCart },
  ];

  return (
    <aside className="w-64 bg-zinc-900 text-white min-h-screen flex-shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-widest uppercase font-serif">Lustral Admin</h1>
      </div>
      <nav className="px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 w-64 p-4 border-t border-zinc-800">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white text-sm font-medium">
           <LogOut className="h-5 w-5" />
           Выйти
        </Link>
      </div>
    </aside>
  );
}
