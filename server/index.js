import 'dotenv/config'
import { app } from './app.js'

const PORT = process.env.PORT || 3001

if (!process.env.MOCKAPI_BASE_URL) {
  console.error('MOCKAPI_BASE_URL не задан. Скопируйте .env.example в .env')
  process.exit(1)
}

app.listen(PORT, () => {
  const base = (process.env.MOCKAPI_BASE_URL || '').replace(/\/$/, '')
  const resource = process.env.MOCKAPI_RESOURCE || 'porfolio'
  console.log(`API: http://localhost:${PORT}`)
  console.log(`MockAPI: ${base}/${resource}`)
})
