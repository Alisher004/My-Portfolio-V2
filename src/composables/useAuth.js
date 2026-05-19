import { ref } from 'vue'

const apiBase = import.meta.env.VITE_API_URL ?? ''
const TOKEN_KEY = 'authToken'

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

export async function login(username, password) {
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
