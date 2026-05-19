import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from './models/User.js'

const username = process.env.ADMIN_USERNAME || 'admin'
const password = process.env.ADMIN_PASSWORD || 'admin123'

async function seedAdmin() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI не задан в .env')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)

  const passwordHash = await bcrypt.hash(password, 12)
  const existing = await User.findOne({ username: username.toLowerCase() })

  if (existing) {
    existing.passwordHash = passwordHash
    await existing.save()
    console.log(`Пароль обновлён для пользователя: ${username}`)
  } else {
    await User.create({ username: username.toLowerCase(), passwordHash })
    console.log(`Создан администратор: ${username}`)
  }

  console.log('Готово. Войдите в /admin с этим логином и паролем.')
  await mongoose.disconnect()
}

seedAdmin().catch((err) => {
  console.error(err)
  process.exit(1)
})
