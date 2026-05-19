import 'dotenv/config'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE = process.env.MOCKAPI_BASE_URL?.replace(/\/$/, '')
const RESOURCE = process.env.MOCKAPI_RESOURCE || 'porfolio'

if (!BASE) {
  console.error('Задайте MOCKAPI_BASE_URL в .env')
  process.exit(1)
}

const url = `${BASE}/${RESOURCE}`

const projects = JSON.parse(
  readFileSync(join(__dirname, '../data/mockapi-projects.json'), 'utf8')
)

for (const project of projects) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  })
  if (!res.ok) {
    console.error('Ошибка:', project.title, await res.text())
    process.exit(1)
  }
  console.log('✓', project.title)
}

console.log(`Готово: ${projects.length} проектов`)
