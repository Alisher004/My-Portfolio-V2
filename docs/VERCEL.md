# Деплой на Vercel

## Почему локально работало, а на Vercel — нет

| Локально | На Vercel |
|----------|-----------|
| `npm run dev` поднимает Express на `:3001` | Только статика из `dist/` |
| Vite проксирует `/api` → localhost | Прокси нет — `/api` должен быть serverless |

Решение: папка **`/api`** — те же маршруты Express через serverless.

---

## Переменные в Vercel Dashboard

**Project → Settings → Environment Variables** (для Production):

| Имя | Пример |
|-----|--------|
| `MOCKAPI_BASE_URL` | `https://66dfd7322fb67ac16f2740dd.mockapi.io` |
| `MOCKAPI_RESOURCE` | `porfolio` |
| `JWT_SECRET` | длинная случайная строка |
| `VITE_MOCKAPI_URL` | `https://66dfd7322fb67ac16f2740dd.mockapi.io/porfolio` |
| `VITE_ADMIN_USERNAME` | `admin` |
| `VITE_ADMIN_PASSWORD` | ваш пароль |

Главная и админ-панель читают/пишут **напрямую в MockAPI**. Сервер `/api` для деплоя не обязателен.

После добавления переменных: **Deployments → … → Redeploy**.

---

## Проверка

```text
https://ВАШ-САЙТ.vercel.app/api/health
https://ВАШ-САЙТ.vercel.app/api/projects
```

Должен вернуться JSON с проектами, не HTML страницы 404.
