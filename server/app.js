import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { requireAuth, signToken } from './middleware/auth.js'
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from './mockapi.js'

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase()
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', async (_req, res) => {
  try {
    await fetchProjects()
    res.json({ ok: true, mockapi: true })
  } catch {
    res.json({ ok: false, mockapi: false })
  }
})

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Введите логин и пароль' })
  }
  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD не задан' })
  }

  const login = username.trim().toLowerCase()
  if (login !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Неверный логин или пароль' })
  }

  const token = signToken({ username: ADMIN_USERNAME, role: 'admin' })
  res.json({
    token,
    user: { username: ADMIN_USERNAME, role: 'admin' },
  })
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({
    user: { username: req.user.username, role: req.user.role },
  })
})

app.get('/api/projects', async (_req, res) => {
  try {
    const projects = await fetchProjects({ visibleOnly: true })
    res.json(projects)
  } catch {
    res.status(500).json({ error: 'Не удалось загрузить проекты' })
  }
})

app.get('/api/projects/all', requireAuth, async (_req, res) => {
  try {
    const projects = await fetchProjects()
    res.json(projects)
  } catch {
    res.status(500).json({ error: 'Не удалось загрузить проекты' })
  }
})

app.post('/api/projects', requireAuth, async (req, res) => {
  try {
    const project = await createProject(req.body)
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ error: err.message || 'Ошибка создания' })
  }
})

app.put('/api/projects/:id', requireAuth, async (req, res) => {
  try {
    const project = await updateProject(req.params.id, req.body)
    res.json(project)
  } catch (err) {
    res.status(400).json({ error: err.message || 'Ошибка обновления' })
  }
})

app.delete('/api/projects/:id', requireAuth, async (req, res) => {
  try {
    await deleteProject(req.params.id)
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Ошибка удаления' })
  }
})
