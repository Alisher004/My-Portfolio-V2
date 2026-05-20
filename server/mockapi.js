const RESOURCE = process.env.MOCKAPI_RESOURCE || 'porfolio'

function resolveBase() {
  let base = (process.env.MOCKAPI_BASE_URL || '').replace(/\/$/, '')
  if (base.endsWith(`/${RESOURCE}`)) {
    base = base.slice(0, -(`/${RESOURCE}`).length)
  }
  return base
}

function endpoint(id) {
  const base = resolveBase()
  if (!base) throw new Error('MOCKAPI_BASE_URL не задан в .env')
  return id ? `${base}/${RESOURCE}/${id}` : `${base}/${RESOURCE}`
}

function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0)
    if (orderDiff !== 0) return orderDiff
    return String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''))
  })
}

export async function fetchProjects({ visibleOnly = false } = {}) {
  const res = await fetch(endpoint())
  if (!res.ok) throw new Error(`MockAPI: ${res.status}`)
  let projects = await res.json()
  if (visibleOnly) projects = projects.filter((p) => p.visible !== false)
  return sortProjects(projects)
}

export async function createProject(body) {
  const res = await fetch(endpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || data.error || 'Ошибка создания')
  return data
}

export async function updateProject(id, body) {
  const res = await fetch(endpoint(id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || data.error || 'Ошибка обновления')
  return data
}

export async function deleteProject(id) {
  const res = await fetch(endpoint(id), { method: 'DELETE' })
  if (!res.ok && res.status !== 404) throw new Error('Ошибка удаления')
}
