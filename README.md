# My Portfolio V2

Портфолио на **Vue 3**, **SCSS**, проекты в **MockAPI**, админ через Express API.

## Быстрый старт

```bash
npm install
cp .env.example .env
# заполните MOCKAPI_BASE_URL, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD

# загрузите проекты в MockAPI (см. data/mockapi-projects.json)
npm run import:mockapi

npm run dev           # API + сайт (бир терминал)
```

- Сайт: http://localhost:5173  
- Админ: http://localhost:5173/admin (логин + пароль из `.env`)

**Подробная инструкция:** [docs/MOCKAPI.md](docs/MOCKAPI.md)

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | API + фронтенд |
| `npm run dev:client` | Только Vite (нужен отдельно `npm run server`) |
| `npm run server` | Только API |
| `npm run import:mockapi` | Залить проекты из `data/mockapi-projects.json` в MockAPI |
