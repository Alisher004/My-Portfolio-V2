import { ref, onMounted } from 'vue'

const mockApiUrl = import.meta.env.VITE_MOCKAPI_URL ?? ''

export function useProjects() {
  const projects = ref([])
  const loading = ref(true)
  const error = ref(null)

  async function load() {
    loading.value = true
    error.value = null

    if (!mockApiUrl) {
      error.value = 'VITE_MOCKAPI_URL не задан'
      projects.value = []
      return
    }

    try {
      const res = await fetch(mockApiUrl)
      if (!res.ok) throw new Error('MockAPI error')

      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('empty')
      }

      projects.value = data
        .filter((p) => p.visible !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(normalizeProject)
    } catch {
      error.value = 'Не удалось загрузить проекты из MockAPI'
      projects.value = []
    }
  }

  onMounted(async () => {
    await load()
    loading.value = false
  })

  return { projects, loading, error, reload: load }
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
