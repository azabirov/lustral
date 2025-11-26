# Финальная настройка безопасности (RLS)

Теперь, когда мы перенесли логику записи на сервер, мы можем закрыть базу данных от публичной записи.

## 1. Обновите переменные окружения
В Vercel (и локально в `.env.local`) добавьте новый **секретный** ключ:

1. В Supabase: Settings -> API -> Project API keys -> **`service_role`** (secret).
2. В проекте:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=ваш_секретный_ключ
   ```
   **Внимание**: Никогда не добавляйте `NEXT_PUBLIC_` к этому ключу!

## 2. Обновите политики (RLS) в Supabase
Перейдите в SQL Editor и выполните этот скрипт, чтобы сделать базу **Read-Only** для интернета. Изменять данные сможет только ваш сервер (через Service Key).

```sql
-- Сброс политик
drop policy if exists "Enable all access for products" on products;
drop policy if exists "Enable all access for site_settings" on site_settings;

-- 1. PRODUCTS: Читать могут все, менять никто (через клиент)
create policy "Public Read Only Products"
on products for select
using (true);

-- 2. SETTINGS: Читать могут все, менять никто
create policy "Public Read Only Settings"
on site_settings for select
using (true);

-- Примечание: Server Actions используют Service Role Key, который
-- автоматически обходит эти политики (bypass RLS), поэтому админка будет работать.
```

Теперь ваш проект безопасен. Клиентский ключ `anon` позволяет только смотреть товары, но не может ничего удалить или изменить, даже если злоумышленник его украдет.



