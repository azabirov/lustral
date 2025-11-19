'use client';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, CreditCard, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const { user } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  // Delivery cost
  const deliveryCost = deliveryMethod === 'courier' ? 500 : 0;
  const finalTotal = totalPrice + deliveryCost;

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      // Here you would typically clear the cart
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center animate-fade-in">
        <div className="rounded-full bg-green-100 p-3 mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-serif font-medium text-zinc-900 mb-4">Заказ успешно оформлен!</h1>
        <p className="text-zinc-500 max-w-md mb-8">
          Спасибо за ваш выбор. Наш менеджер свяжется с вами в течение 15 минут для подтверждения деталей доставки.
        </p>
        <Link 
          href="/"
          className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-zinc-800 transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-serif font-medium text-zinc-900 mb-4">Корзина пуста</h1>
        <Link href="/catalog" className="text-black underline hover:text-zinc-600">Перейти в каталог</Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
           <Link href="/cart" className="flex items-center text-sm text-zinc-500 hover:text-black">
             <ArrowLeft className="h-4 w-4 mr-2" />
             Вернуться в корзину
           </Link>
        </div>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Checkout Form */}
          <section className="lg:col-span-7 space-y-8">
            {/* Personal Info */}
            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-medium text-zinc-900">Контактные данные</h2>
                {!user && (
                  <Link href="/login" className="text-sm text-black underline hover:text-zinc-600">
                    Войти в аккаунт
                  </Link>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700">Имя</label>
                  <input 
                    required 
                    type="text" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border-zinc-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border" 
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700">Фамилия</label>
                  <input 
                    required 
                    type="text" 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border-zinc-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700">Email</label>
                  <input 
                    required 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border-zinc-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">Телефон</label>
                  <input 
                    required 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border-zinc-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border" 
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-sm">
               <h2 className="text-xl font-serif font-medium text-zinc-900 mb-6">Способ доставки</h2>
               <div className="space-y-4">
                  <label className={`relative flex cursor-pointer rounded-sm border p-4 shadow-sm focus:outline-none ${deliveryMethod === 'courier' ? 'border-black ring-1 ring-black' : 'border-zinc-200'}`}>
                    <input 
                      type="radio" 
                      name="delivery-method" 
                      value="courier" 
                      checked={deliveryMethod === 'courier'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="sr-only" 
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-sm font-medium text-zinc-900">Курьерская доставка</span>
                        <span className="mt-1 flex items-center text-sm text-zinc-500">1-3 рабочих дня</span>
                        <span className="mt-6 text-sm font-medium text-zinc-900">500 ₽</span>
                      </span>
                    </span>
                    <Truck className={`h-5 w-5 ${deliveryMethod === 'courier' ? 'text-black' : 'text-zinc-400'}`} />
                  </label>

                  <label className={`relative flex cursor-pointer rounded-sm border p-4 shadow-sm focus:outline-none ${deliveryMethod === 'pickup' ? 'border-black ring-1 ring-black' : 'border-zinc-200'}`}>
                    <input 
                      type="radio" 
                      name="delivery-method" 
                      value="pickup" 
                      checked={deliveryMethod === 'pickup'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="sr-only" 
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-sm font-medium text-zinc-900">Самовывоз из мастерской</span>
                        <span className="mt-1 flex items-center text-sm text-zinc-500">Сегодня, до 20:00</span>
                        <span className="mt-6 text-sm font-medium text-zinc-900">Бесплатно</span>
                      </span>
                    </span>
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${deliveryMethod === 'pickup' ? 'border-black' : 'border-zinc-300'}`}>
                       {deliveryMethod === 'pickup' && <div className="h-2.5 w-2.5 rounded-full bg-black" />}
                    </div>
                  </label>
               </div>

               {deliveryMethod === 'courier' && (
                  <div className="mt-6">
                    <label htmlFor="address" className="block text-sm font-medium text-zinc-700">Адрес доставки</label>
                    <input 
                      required 
                      type="text" 
                      id="address" 
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1 block w-full border-zinc-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border" 
                      placeholder="Улица, дом, квартира"
                    />
                  </div>
               )}
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-sm">
               <h2 className="text-xl font-serif font-medium text-zinc-900 mb-6">Оплата</h2>
               <div className="space-y-4">
                  <label className={`relative flex cursor-pointer rounded-sm border p-4 shadow-sm focus:outline-none ${paymentMethod === 'card' ? 'border-black ring-1 ring-black' : 'border-zinc-200'}`}>
                    <input 
                      type="radio" 
                      name="payment-method" 
                      value="card" 
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only" 
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-sm font-medium text-zinc-900">Банковской картой онлайн</span>
                        <span className="mt-1 flex items-center text-sm text-zinc-500">Visa, MasterCard, Mir</span>
                      </span>
                    </span>
                    <CreditCard className={`h-5 w-5 ${paymentMethod === 'card' ? 'text-black' : 'text-zinc-400'}`} />
                  </label>
                  
                  <label className={`relative flex cursor-pointer rounded-sm border p-4 shadow-sm focus:outline-none ${paymentMethod === 'cash' ? 'border-black ring-1 ring-black' : 'border-zinc-200'}`}>
                    <input 
                      type="radio" 
                      name="payment-method" 
                      value="cash" 
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only" 
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-sm font-medium text-zinc-900">При получении</span>
                        <span className="mt-1 flex items-center text-sm text-zinc-500">Картой или наличными</span>
                      </span>
                    </span>
                     <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cash' ? 'border-black' : 'border-zinc-300'}`}>
                       {paymentMethod === 'cash' && <div className="h-2.5 w-2.5 rounded-full bg-black" />}
                    </div>
                  </label>
               </div>
            </div>
          </section>

          {/* Order Summary */}
          <section className="lg:col-span-5 bg-white p-6 sm:p-8 shadow-sm rounded-sm sticky top-6">
            <h2 className="text-lg font-medium text-zinc-900 mb-6">Ваш заказ</h2>
            <ul className="divide-y divide-zinc-100 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <li key={item.id} className="flex py-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm border border-zinc-200 bg-zinc-100">
                    <Image src={item.image} alt={item.name} width={64} height={64} className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-sm font-medium text-zinc-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">
                          {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-500">Кол-во: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-zinc-100 pt-6 mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <p className="text-zinc-600">Подытог</p>
                <p className="font-medium text-zinc-900">
                  {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(totalPrice)}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-zinc-600">Доставка</p>
                <p className="font-medium text-zinc-900">
                   {deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                <p className="text-base font-medium text-zinc-900">Итого</p>
                <p className="text-2xl font-serif font-medium text-zinc-900">
                   {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(finalTotal)}
                </p>
              </div>
            </div>
            
            <div className="mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-black border border-transparent px-4 py-4 text-base font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
                >
                  Оплатить заказ
                </button>
                 <p className="mt-4 text-center text-xs text-zinc-500">
                    Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных.
                 </p>
              </div>
          </section>
        </div>
      </div>
    </div>
  );
}
