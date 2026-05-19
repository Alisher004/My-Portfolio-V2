# My Portfolio V2

Портфолио на **Vue 3**, **SCSS**, проекты и админ из **MongoDB**.

## Быстрый старт

```bash
npm install
cp .env.example .env
# заполните MONGODB_URI, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD

npm run seed          # проекты в БД
npm run seed:admin    # логин/пароль админа
npm run dev:all       # API + сайт
```

- Сайт: http://localhost:5173  
- Админ: http://localhost:5173/admin (логин + пароль из `.env`)

**Подробная инструкция с нуля:** [docs/MONGODB.md](docs/MONGODB.md)

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Фронтенд |
| `npm run server` | API |
| `npm run dev:all` | API + фронт |
| `npm run seed` | Проекты в MongoDB |
| `npm run seed:admin` | Создать/обновить админа |
