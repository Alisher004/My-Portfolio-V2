import { ref, onMounted } from 'vue'
import { fallbackProjects } from '../data/fallbackProjects'

const apiBase = import.meta.env.VITE_API_URL ?? ''

export function useProjects() {
  const projects = ref([])
  const loading = ref(true)
  const error = ref(null)
  const fromApi = ref(false)

  async function load() {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${apiBase}/api/projects`)
      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        projects.value = data.map(normalizeProject)
        fromApi.value = true
        return
      }
    } catch (e) {
      error.value = 'Используются локальные данные (API недоступен)'
    }

    projects.value = fallbackProjects.map(normalizeProject)
    fromApi.value = false
  }

  onMounted(async () => {
    await load()
    loading.value = false
  })

  return { projects, loading, error, fromApi, reload: load }
}

function normalizeProject(p) {
  return {
    id: p._id ?? p.id,
    title: p.title,
    desc: p.desc,
    tech: p.tech,
    link: p.link,
    img: p.img,
  }
}
