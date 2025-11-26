'use server';

import { cookies } from 'next/headers';

export async function loginAdmin(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // В реальном проекте эти данные должны быть в переменных окружения
  // process.env.ADMIN_EMAIL и process.env.ADMIN_PASSWORD
  const VALID_EMAIL = process.env.ADMIN_EMAIL || 'admin@lustral.ru';
  const VALID_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    // Устанавливаем куку сессии
    // В продакшене нужно добавить { secure: true, httpOnly: true }
    (await cookies()).set('admin_session', 'true', { 
       path: '/',
       httpOnly: true,
       maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { success: true };
  }

  return { success: false, message: 'Неверный логин или пароль' };
}

export async function logoutAdmin() {
  (await cookies()).delete('admin_session');
}



