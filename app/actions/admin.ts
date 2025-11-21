'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { Product } from '@/lib/data';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Вспомогательная функция проверки прав
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_session')?.value === 'true';
  
  if (!isAdmin) {
    throw new Error('Unauthorized: Access denied');
  }
}

// --- Products Actions ---

export async function addProductAction(product: Omit<Product, 'id'>) {
  await checkAdminAuth();

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) throw new Error(error.message);
  
  revalidatePath('/catalog'); // Обновляем кэш каталога
  revalidatePath('/');        // Обновляем главную
  return data;
}

export async function updateProductAction(product: Product) {
  await checkAdminAuth();

  const { error } = await supabaseAdmin
    .from('products')
    .update(product)
    .eq('id', product.id);

  if (error) throw new Error(error.message);

  revalidatePath('/catalog');
  revalidatePath(`/product/${product.id}`);
}

export async function deleteProductAction(id: string) {
  await checkAdminAuth();

  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/catalog');
}

// --- Hero Actions ---

export async function updateHeroAction(data: any) {
  await checkAdminAuth();

  const { error } = await supabaseAdmin
    .from('site_settings')
    .upsert({ key: 'hero_data', value: data }, { onConflict: 'key' });

  if (error) throw new Error(error.message);

  revalidatePath('/');
}

