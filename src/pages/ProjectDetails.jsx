import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects, hiddenProjects } from '../data/Projects'

function ProjectDetails() {
  const { id } = useParams()
  const all = React.useMemo(() => [...projects, ...hiddenProjects], [])
  const project = all.find(p => String(p.id) === String(id))

  if (!project) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Проект табылган жок</h2>
        <Link to="/" className="button" style={{ display: 'inline-block', marginTop: 12 }}>Артка кайтуу</Link>
      </div>
    )
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'left' }}>
        <h2 style={{ textAlign: 'center' }}>{project.title}</h2>
        <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
          <img src={project.img} alt={project.title} style={{ width: '100%', display: 'block', maxHeight: 420, objectFit: 'cover' }} />
        </div>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>{project.desc}</p>
        <p style={{ marginTop: 10 }}>Технологиялар: <strong>{project.tech}</strong></p>

        <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center' }}>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="button">Посмотреть проект</a>
          <Link to="/" className="button secondary">Артка</Link>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetails 