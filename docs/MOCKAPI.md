# MockAPI: подключение и загрузка проектов

## Схема

```
Сайт (Vue)  →  API (Express)  →  MockAPI (projects)
                    ↓
              .env: логин админа
```

Проекты хранятся в **MockAPI**. Вход в `/admin` — логин и пароль из `.env`, не из MockAPI.

---

## Шаг 1. MockAPI

1. Зарегистрируйтесь на [mockapi.io](https://mockapi.io).
2. **New Project** → создайте ресурс (у вас: **`porfolio`**).
3. Добавьте поля (тип **String** / **Number** / **Boolean**):

| Поле     | Тип     |
|----------|---------|
| title    | String  |
| desc     | String  |
| tech     | String  |
| link     | String  |
| img      | String  |
| order    | Number  |
| visible  | Boolean |

4. В `.env` укажите базовый URL и имя ресурса:  
   `MOCKAPI_BASE_URL=https://66dfd7322fb67ac16f2740dd.mockapi.io`  
   `MOCKAPI_RESOURCE=porfolio`

---

## Шаг 2. Загрузить готовые проекты

Файл в репозитории: [`data/mockapi-projects.json`](../data/mockapi-projects.json)

**Вариант A — вручную:** MockAPI → `projects` → **Add record** — вставьте поля из каждого объекта JSON (4 проекта).

**Вариант B — скрипт** (подставьте свой URL):

```bash
MOCKAPI_BASE_URL=https://66dfd7322fb67ac16f2740dd.mockapi.io MOCKAPI_RESOURCE=porfolio node server/import-mockapi.js
```

---

## Шаг 3. `.env`

```bash
cp .env.example .env
```

Заполните:

| Переменная           | Описание                          |
|----------------------|-----------------------------------|
| `MOCKAPI_BASE_URL`   | Базовый URL MockAPI               |
| `MOCKAPI_RESOURCE`   | Имя ресурса (`porfolio`)          |
| `JWT_SECRET`         | Случайная строка ≥ 32 символов  |
| `ADMIN_USERNAME`     | Логин для `/admin`                |
| `ADMIN_PASSWORD`     | Пароль для `/admin`               |

---

## Шаг 4. Запуск

```bash
npm install
npm run dev
```

- Сайт: http://localhost:5173  
- API: http://localhost:3001  
- Админ: http://localhost:5173/admin  

---

## Проверка

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/projects
```
