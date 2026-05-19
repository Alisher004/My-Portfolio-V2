import 'dotenv/config'
import mongoose from 'mongoose'
import { Project } from './models/Project.js'

const seedProjects = [
  {
    title: 'Крестики-нолики',
    desc: 'Классическая игра «крестики-нолики» в браузере.',
    tech: 'HTML, CSS, JavaScript, React',
    link: 'https://game-x-o-lemon.vercel.app/',
    img: '/project1.jpg',
    order: 1,
  },
  {
    title: 'Интернет-магазин',
    desc: 'Универсальный магазин с каталогом товаров и корзиной.',
    tech: 'HTML, CSS, React, Vite, TypeScript, SCSS',
    link: 'https://online-shop-beta-ecru.vercel.app/',
    img: '/project2.jpg',
    order: 2,
  },
  {
    title: 'Билим-Ордо',
    desc: 'Платформа для продажи и управления онлайн-курсами.',
    tech: 'HTML, CSS, JavaScript, React',
    link: 'https://okurmenpro.github.io/bilim-ordo-frontend/',
    img: '/bordo.png',
    order: 3,
  },
  {
    title: 'Cross Shop',
    desc: 'Интернет-магазин обуви с каталогом и оформлением заказа.',
    tech: 'HTML, CSS, JavaScript, React',
    link: 'https://cross-shop-6ql6.vercel.app/',
    img: '/project3.jpg',
    order: 4,
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  await Project.deleteMany({})
  await Project.insertMany(seedProjects)
  console.log(`Добавлено проектов: ${seedProjects.length}`)
  await mongoose.disconnect()
}

seed().catch(console.error)
