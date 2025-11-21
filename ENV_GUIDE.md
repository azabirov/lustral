# Руководство по переменным окружения (.env)

Для работы проекта (особенно админ-панели и базы данных) необходимо создать файл `.env.local` в корне проекта и настроить переменные в Vercel.

## Список переменных

### 1. Supabase (База данных)
Где найти: Supabase Dashboard -> Project Settings -> API

| Переменная | Описание | Пример значения |
|------------|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Ссылка на проект (Project URL) | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Публичный ключ (anon public). Используется браузером для чтения. | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | **СЕКРЕТНЫЙ** сервисный ключ (service_role secret). Используется сервером для записи. **НИКОГДА не добавляйте NEXT_PUBLIC_ к этому ключу!** | `eyJhbGci...` (обычно длиннее anon ключа) |

### 2. Админ-панель (Доступ)
Используются для входа по адресу `/admin/login`.

| Переменная | Описание | Пример значения |
|------------|----------|-----------------|
| `ADMIN_EMAIL` | Email администратора | `admin@lustral.ru` |
| `ADMIN_PASSWORD` | Пароль администратора | `admin123` |

### 3. Настройки сайта

| Переменная | Описание | Пример значения |
|------------|----------|-----------------|
| `NEXT_PUBLIC_SITE_URL` | Адрес вашего сайта (для SEO и ссылок) | `http://localhost:3000` или `https://project.vercel.app` |

---

## Пример файла .env.local

Скопируйте это в файл `.env.local`:

```ini
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Auth
ADMIN_EMAIL=admin@lustral.ru
ADMIN_PASSWORD=admin123

# Site Config
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Важно для Vercel
После добавления этих переменных в Settings -> Environment Variables, обязательно сделайте **Redeploy** последнего деплоя, иначе настройки не вступят в силу.
