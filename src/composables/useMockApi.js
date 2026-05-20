const mockApiUrl = import.meta.env.VITE_MOCKAPI_URL ?? ''

function assertUrl() {
  if (!mockApiUrl) throw new Error('VITE_MOCKAPI_URL не задан')
}

function sortProjects(projects) {
  return [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export async function fetchAllProjects() {
  assertUrl()
  const res = await fetch(mockApiUrl)
  if (!res.ok) throw new Error('Не удалось загрузить проекты')
  const data = await res.json()
  return sortProjects(Array.isArray(data) ? data : [])
}

export async function createProject(body) {
  assertUrl()
  const res = await fetch(mockApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || data.error || 'Ошибка создания')
  return data
}

export async function updateProject(id, body) {
  assertUrl()
  const res = await fetch(`${mockApiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || data.error || 'Ошибка сохранения')
  return data
}

export async function deleteProject(id) {
  assertUrl()
  const res = await fetch(`${mockApiUrl}/${id}`, { method: 'DELETE' })
  if (!res.ok && res.status !== 404) throw new Error('Ошибка удаления')
}
