<template>
  <div class="admin-page">
    <div class="admin-bg" aria-hidden="true" />

    <div class="admin-container">
      <!-- Login -->
      <template v-if="!isLoggedIn">
        <section class="admin-card admin-login">
          <p class="admin-badge">Portfolio Admin</p>
          <h1>Вход в панель</h1>
          <p class="admin-hint">Учётная запись хранится в MongoDB</p>

          <form class="admin-form" @submit.prevent="handleLogin">
            <label class="field">
              <span>Логин</span>
              <input
                v-model="loginForm.username"
                type="text"
                placeholder="admin"
                autocomplete="username"
                required
              />
            </label>
            <label class="field">
              <span>Пароль</span>
              <input
                v-model="loginForm.password"
                type="password"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
            </label>
            <button type="submit" class="btn-primary" :disabled="loggingIn">
              {{ loggingIn ? 'Вход…' : 'Войти' }}
            </button>
          </form>

          <p v-if="message" :class="['admin-toast', messageType]">{{ message }}</p>
          <RouterLink to="/" class="back-link">← На главную</RouterLink>
        </section>
      </template>

      <!-- Dashboard -->
      <template v-else>
        <header class="admin-header admin-card">
          <div>
            <p class="admin-badge">Управление проектами</p>
            <h1>Админ-панель</h1>
            <p class="admin-user">
              <span class="user-dot" />
              {{ currentUser?.username }}
            </p>
          </div>
          <div class="header-actions">
            <span class="count-pill">{{ list.length }} проектов</span>
            <RouterLink to="/" class="btn-ghost">На сайт</RouterLink>
            <button type="button" class="btn-ghost" @click="handleLogout">Выйти</button>
          </div>
        </header>

        <p v-if="message" :class="['admin-toast', messageType, 'toast-global']">{{ message }}</p>

        <div class="admin-layout">
          <section class="admin-card admin-form-card">
            <h2>Новый проект</h2>
            <form class="admin-form" @submit.prevent="addProject">
              <label class="field">
                <span>Название</span>
                <input v-model="form.title" placeholder="Интернет-магазин" required />
              </label>
              <label class="field">
                <span>Ссылка на картинку</span>
                <input v-model="form.img" placeholder="/project1.jpg" required />
              </label>
              <div v-if="form.img" class="img-preview">
                <img :src="form.img" alt="Превью" @error="onPreviewError" />
              </div>
              <label class="field">
                <span>URL проекта</span>
                <input v-model="form.link" placeholder="https://..." required />
              </label>
              <label class="field">
                <span>Технологии</span>
                <input v-model="form.tech" placeholder="HTML, CSS, Vue" required />
              </label>
              <label class="field">
                <span>Описание</span>
                <textarea v-model="form.desc" rows="3" placeholder="Краткое описание" required />
              </label>
              <label class="field field-inline">
                <span>Порядок</span>
                <input v-model.number="form.order" type="number" min="0" />
              </label>
              <button type="submit" class="btn-primary" :disabled="saving">
                {{ saving ? 'Сохранение…' : '+ Добавить проект' }}
              </button>
            </form>
          </section>

          <section class="admin-projects">
            <div class="projects-head">
              <h2>Все проекты</h2>
              <button type="button" class="btn-ghost btn-sm" @click="loadAll">Обновить</button>
            </div>

            <div v-if="loadingList" class="empty-state">Загрузка…</div>

            <div v-else-if="list.length" class="admin-grid">
              <article v-for="item in list" :key="item._id" class="admin-project-card">
                <div class="card-media">
                  <img :src="item.img" :alt="item.title" loading="lazy" />
                  <span class="order-badge">#{{ item.order ?? 0 }}</span>
                </div>
                <div class="card-body">
                  <h3>{{ item.title }}</h3>
                  <p class="card-desc">{{ item.desc }}</p>
                  <p class="card-tech">
                    <span v-for="tag in techTags(item.tech)" :key="tag" class="tech-tag">{{ tag }}</span>
                  </p>
                </div>
                <div class="card-actions">
                  <a :href="item.link" target="_blank" rel="noopener noreferrer" class="btn-ghost btn-sm">
                    Открыть
                  </a>
                  <button type="button" class="btn-danger btn-sm" @click="removeProject(item._id)">
                    Удалить
                  </button>
                </div>
              </article>
            </div>

            <div v-else class="empty-state admin-card">
              <p>Проектов пока нет</p>
              <span>Добавьте первый слева</span>
            </div>
          </section>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { token, currentUser, login, logout, fetchMe, authHeaders } from '../composables/useAuth'
import './AdminView.scss'

const apiBase = import.meta.env.VITE_API_URL ?? ''

const loginForm = ref({ username: '', password: '' })
const loggingIn = ref(false)
const isLoggedIn = computed(() => Boolean(token.value))

const form = ref({
  title: '',
  desc: '',
  tech: '',
  link: '',
  img: '',
  order: 0,
})

const list = ref([])
const saving = ref(false)
const loadingList = ref(false)
const message = ref('')
const messageType = ref('ok')

onMounted(async () => {
  if (token.value) {
    await fetchMe()
    if (token.value) await loadAll()
  }
})

function techTags(tech) {
  return tech.split(',').map((t) => t.trim()).filter(Boolean)
}

function onPreviewError(e) {
  e.target.style.display = 'none'
}

async function handleLogin() {
  loggingIn.value = true
  message.value = ''
  try {
    await login(loginForm.value.username, loginForm.value.password)
    showMsg('Вход выполнен', 'ok')
    await loadAll()
  } catch (e) {
    showMsg(e.message, 'err')
  } finally {
    loggingIn.value = false
  }
}

function handleLogout() {
  logout()
  list.value = []
  showMsg('Вы вышли из системы', 'ok')
}

async function loadAll() {
  loadingList.value = true
  try {
    const res = await fetch(`${apiBase}/api/projects/all`, { headers: authHeaders() })
    if (res.status === 401) {
      logout()
      return
    }
    if (!res.ok) throw new Error()
    list.value = await res.json()
  } catch {
    list.value = []
  } finally {
    loadingList.value = false
  }
}

async function addProject() {
  saving.value = true
  try {
    const res = await fetch(`${apiBase}/api/projects`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ ...form.value, visible: true }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Ошибка')
    showMsg('Проект добавлен', 'ok')
    form.value = { title: '', desc: '', tech: '', link: '', img: '', order: 0 }
    await loadAll()
  } catch (e) {
    showMsg(e.message || 'Не удалось добавить', 'err')
  } finally {
    saving.value = false
  }
}

async function removeProject(id) {
  if (!confirm('Удалить этот проект?')) return
  try {
    const res = await fetch(`${apiBase}/api/projects/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
    if (!res.ok) throw new Error()
    showMsg('Проект удалён', 'ok')
    await loadAll()
  } catch {
    showMsg('Ошибка удаления', 'err')
  }
}

function showMsg(text, type) {
  message.value = text
  messageType.value = type
  if (type === 'ok') {
    setTimeout(() => {
      if (message.value === text) message.value = ''
    }, 3000)
  }
}
</script>
