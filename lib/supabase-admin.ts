import { createClient } from '@supabase/supabase-js';

// Этот файл используется ТОЛЬКО на сервере
// Он использует сервисный ключ, который имеет полные права (bypass RLS)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  // Не выбрасываем ошибку при билде, но логируем
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Missing Supabase Service Key. Admin actions will fail.');
  }
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || 'placeholder', {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});



