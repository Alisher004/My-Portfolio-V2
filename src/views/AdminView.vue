<template>
  <div class="admin-page">
    <div class="admin-bg" aria-hidden="true" />

    <div class="admin-container">
      <!-- Login -->
      <template v-if="!isLoggedIn">
        <section class="admin-card admin-login">
          <p class="admin-badge">Portfolio Admin</p>
          <h1>Вход в панель</h1>
          <p class="admin-hint">Логин и пароль из .env (VITE_ADMIN_USERNAME / VITE_ADMIN_PASSWORD)</p>

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
          <section class="admin-card admin-form-card" :class="{ 'is-editing': editingId }">
            <h2>{{ editingId ? 'Редактирование' : 'Новый проект' }}</h2>
            <form class="admin-form" @submit.prevent="submitForm">
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
              <label class="field field-check">
                <input v-model="form.visible" type="checkbox" />
                <span>Показывать на сайте</span>
              </label>
              <div class="form-actions">
                <button type="submit" class="btn-primary" :disabled="saving">
                  {{ saving ? 'Сохранение…' : editingId ? 'Сохранить' : '+ Добавить проект' }}
                </button>
                <button
                  v-if="editingId"
                  type="button"
                  class="btn-ghost"
                  :disabled="saving"
                  @click="cancelEdit"
                >
                  Отмена
                </button>
              </div>
            </form>
          </section>

          <section class="admin-projects">
            <div class="projects-head">
              <h2>Все проекты</h2>
              <button type="button" class="btn-ghost btn-sm" @click="loadAll">Обновить</button>
            </div>

            <div v-if="loadingList" class="empty-state">Загрузка…</div>

            <div v-else-if="list.length" class="admin-grid">
              <article
                v-for="item in list"
                :key="projectId(item)"
                class="admin-project-card"
                :class="{ 'is-active': editingId === projectId(item) }"
              >
                <div class="card-media">
                  <img :src="item.img" :alt="item.title" loading="lazy" />
                  <span class="order-badge">#{{ item.order ?? 0 }}</span>
                  <span v-if="item.visible === false" class="hidden-badge">Скрыт</span>
                </div>
                <div class="card-body">
                  <h3>{{ item.title }}</h3>
                  <p class="card-desc">{{ item.desc }}</p>
                  <p class="card-tech">
                    <span v-for="tag in techTags(item.tech)" :key="tag" class="tech-tag">{{ tag }}</span>
                  </p>
                </div>
                <div class="card-actions">
                  <button type="button" class="btn-ghost btn-sm" @click="startEdit(item)">
                    Изменить
                  </button>
                  <a :href="item.link" target="_blank" rel="noopener noreferrer" class="btn-ghost btn-sm">
                    Открыть
                  </a>
                  <button type="button" class="btn-danger btn-sm" @click="removeProject(projectId(item))">
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
import { token, currentUser, login, logout, fetchMe } from '../composables/useAuth'
import {
  fetchAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../composables/useMockApi'
import './AdminView.scss'

const loginForm = ref({ username: '', password: '' })
const loggingIn = ref(false)
const isLoggedIn = computed(() => Boolean(token.value))

const editingId = ref(null)

function emptyForm() {
  return { title: '', desc: '', tech: '', link: '', img: '', order: 0, visible: true }
}

const form = ref(emptyForm())

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

function projectId(item) {
  return item.id ?? item._id
}

function projectPayload() {
  return {
    title: form.value.title.trim(),
    desc: form.value.desc.trim(),
    tech: form.value.tech.trim(),
    link: form.value.link.trim(),
    img: form.value.img.trim(),
    order: form.value.order ?? 0,
    visible: form.value.visible,
  }
}

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
  cancelEdit()
  showMsg('Вы вышли из системы', 'ok')
}

function startEdit(item) {
  editingId.value = projectId(item)
  form.value = {
    title: item.title ?? '',
    desc: item.desc ?? '',
    tech: item.tech ?? '',
    link: item.link ?? '',
    img: item.img ?? '',
    order: item.order ?? 0,
    visible: item.visible !== false,
  }
}

function cancelEdit() {
  editingId.value = null
  form.value = emptyForm()
}

async function loadAll() {
  loadingList.value = true
  try {
    list.value = await fetchAllProjects()
  } catch (e) {
    list.value = []
    showMsg(e.message || 'Не удалось загрузить', 'err')
  } finally {
    loadingList.value = false
  }
}

async function submitForm() {
  saving.value = true
  try {
    const payload = projectPayload()
    if (editingId.value) {
      await updateProject(editingId.value, payload)
      showMsg('Изменения сохранены', 'ok')
      cancelEdit()
    } else {
      await createProject(payload)
      showMsg('Проект добавлен', 'ok')
      form.value = emptyForm()
    }
    await loadAll()
  } catch (e) {
    showMsg(e.message || 'Не удалось сохранить', 'err')
  } finally {
    saving.value = false
  }
}

async function removeProject(id) {
  if (!confirm('Удалить этот проект?')) return
  try {
    await deleteProject(id)
    if (editingId.value === id) cancelEdit()
    showMsg('Проект удалён', 'ok')
    await loadAll()
  } catch (e) {
    showMsg(e.message || 'Ошибка удаления', 'err')
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
