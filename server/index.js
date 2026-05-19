import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { Project } from './models/Project.js'
import { User } from './models/User.js'
import { requireAuth, signToken } from './middleware/auth.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 })
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Введите логин и пароль' })
    }

    const user = await User.findOne({ username: username.trim().toLowerCase() })
    if (!user) {
      return res.status(401).json({ error: 'Неверный логин или пароль' })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return res.status(401).json({ error: 'Неверный логин или пароль' })
    }

    const token = signToken(user)
    res.json({
      token,
      user: { username: user.username, role: user.role },
    })
  } catch {
    res.status(500).json({ error: 'Ошибка входа' })
  }
})

app.get('/api/auth/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.sub).select('username role')
  if (!user) return res.status(401).json({ error: 'Пользователь не найден' })
  res.json({ user: { username: user.username, role: user.role } })
})

app.get('/api/projects', async (_req, res) => {
  try {
    const projects = await Project.find({ visible: true }).sort({ order: 1, createdAt: -1 })
    res.json(projects)
  } catch {
    res.status(500).json({ error: 'Не удалось загрузить проекты' })
  }
})

app.get('/api/projects/all', requireAuth, async (_req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json(projects)
  } catch {
    res.status(500).json({ error: 'Не удалось загрузить проекты' })
  }
})

app.post('/api/projects', requireAuth, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ error: err.message || 'Ошибка создания' })
  }
})

app.put('/api/projects/:id', requireAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!project) return res.status(404).json({ error: 'Проект не найден' })
    res.json(project)
  } catch (err) {
    res.status(400).json({ error: err.message || 'Ошибка обновления' })
  }
})

app.delete('/api/projects/:id', requireAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ error: 'Проект не найден' })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Ошибка удаления' })
  }
})

async function start() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI не задан. Скопируйте .env.example в .env')
    process.exit(1)
  }

  await mongoose.connect(uri)
  console.log('MongoDB подключена')

  app.listen(PORT, () => {
    console.log(`API: http://localhost:${PORT}`)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
