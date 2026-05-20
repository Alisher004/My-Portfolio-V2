import { ref } from 'vue'

const apiBase = import.meta.env.VITE_API_URL ?? ''
const adminUser = import.meta.env.VITE_ADMIN_USERNAME ?? ''
const adminPass = import.meta.env.VITE_ADMIN_PASSWORD ?? ''
const TOKEN_KEY = 'authToken'
const LOCAL_TOKEN = 'local-admin'

export const token = ref(localStorage.getItem(TOKEN_KEY) || '')
export const currentUser = ref(null)

export function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.value}`,
  }
}

export function setToken(value) {
  token.value = value
  if (value) {
    localStorage.setItem(TOKEN_KEY, value)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export function logout() {
  setToken('')
  currentUser.value = null
}

function loginLocal(username, password) {
  const login = username.trim().toLowerCase()
  if (login !== adminUser.trim().toLowerCase() || password !== adminPass) {
    throw new Error('Неверный логин или пароль')
  }
  setToken(LOCAL_TOKEN)
  currentUser.value = { username: adminUser, role: 'admin' }
  return { user: currentUser.value }
}

export async function login(username, password) {
  if (adminUser && adminPass) {
    return loginLocal(username, password)
  }

  const res = await fetch(`${apiBase}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Ошибка входа')

  setToken(data.token)
  currentUser.value = data.user
  return data
}

export async function fetchMe() {
  if (!token.value) return null

  if (token.value === LOCAL_TOKEN) {
    currentUser.value = { username: adminUser, role: 'admin' }
    return currentUser.value
  }

  const res = await fetch(`${apiBase}/api/auth/me`, {
    headers: authHeaders(),
  })

  if (!res.ok) {
    logout()
    return null
  }

  const data = await res.json()
  currentUser.value = data.user
  return data.user
}
