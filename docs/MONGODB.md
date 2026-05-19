# MongoDB с нуля: подключение, аккаунт админа, вход

Пошаговая инструкция для этого портфолио.

---

## Шаг 0. Что будет в итоге

```
Сайт (Vue)  →  API (Express)  →  MongoDB
                ↑
         /admin — логин + пароль (коллекция users)
                ↓
         карточки проектов (коллекция projects)
```

---

## Шаг 1. Установить MongoDB

### Вариант A — облако MongoDB Atlas (проще, бесплатно)

1. Зайдите на [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) и зарегистрируйтесь.
2. **Create** → бесплатный кластер **M0**.
3. Создайте пользователя БД: **Database Access** → Add User → логин + пароль (запомните).
4. Разрешите доступ: **Network Access** → Add IP → `0.0.0.0/0` (для разработки) или ваш IP.
5. **Database** → **Connect** → **Drivers** → скопируйте строку:
   ```
   mongodb+srv://ВАШ_ЛОГИН:ВАШ_ПАРОЛЬ@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   Вместо `ВАШ_ЛОГИН` и `ВАШ_ПАРОЛЬ` подставьте данные из шага 3.  
   Имя базы — `portfolio` (в конце строки).

### Вариант B — локально через Docker

```bash
docker run -d --name mongo -p 27017:27017 mongo:7
```

Строка подключения:

```
mongodb://127.0.0.1:27017/portfolio
```

---

## Шаг 2. Файл `.env` в корне проекта

```bash
cp .env.example .env
```

Откройте `.env` и заполните:

```env
MONGODB_URI=ваша-строка-из-шага-1
PORT=3001
JWT_SECRET=любой-длинный-секрет-минимум-32-символа

ADMIN_USERNAME=admin
ADMIN_PASSWORD=MySecurePass123

VITE_API_URL=
```

| Переменная | Зачем |
|------------|--------|
| `MONGODB_URI` | Подключение к базе |
| `JWT_SECRET` | Подпись токена после входа |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Создание первого админа (только для `seed:admin`) |

---

## Шаг 3. Установка и запуск

```bash
npm install
```

Заполнить базу проектами (один раз):

```bash
npm run seed
```

**Создать аккаунт администратора** (логин + пароль в MongoDB):

```bash
npm run seed:admin
```

В консоли увидите: `Создан администратор: admin` (или ваш `ADMIN_USERNAME`).

Запуск API + сайта:

```bash
npm run dev:all
```

Или в двух терминалах:

```bash
npm run server
npm run dev
```

---

## Шаг 4. Вход в админ-панель

1. Откройте: **http://localhost:5173/admin**
2. Введите логин и пароль из `.env` (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).
3. Нажмите **Войти**.
4. Добавляйте и удаляйте карточки проектов — они сохраняются в MongoDB и появляются на главной.

**Выйти** — кнопка «Выйти» в панели.

---

## Шаг 5. Как сменить пароль

Измените `ADMIN_PASSWORD` в `.env` и снова выполните:

```bash
npm run seed:admin
```

Пароль в базе обновится (логин тот же).

---

## Шаг 6. Где что хранится в MongoDB

| Коллекция | Содержимое |
|-----------|------------|
| `users` | `username`, `passwordHash` (пароль зашифрован, не в открытом виде) |
| `projects` | карточки: название, описание, ссылка, картинка, технологии |

Посмотреть данные: Atlas → **Browse Collections** или MongoDB Compass.

---

## Частые ошибки

| Проблема | Решение |
|---------|---------|
| `MONGODB_URI не задан` | Создайте файл `.env` из `.env.example` |
| Не входит в админ | Запустите `npm run seed:admin`, проверьте логин/пароль |
| Проекты не грузятся | Запущен ли `npm run server`? Есть ли `npm run seed`? |
| CORS / сеть | В dev `VITE_API_URL` оставьте пустым |

---

## Production (кратко)

1. API на Render/Railway с `MONGODB_URI`, `JWT_SECRET`.
2. Фронт: `VITE_API_URL=https://ваш-api.ru`.
3. `npm run build` → деплой `dist/`.
4. Один раз на сервере: `npm run seed` и `npm run seed:admin`.
