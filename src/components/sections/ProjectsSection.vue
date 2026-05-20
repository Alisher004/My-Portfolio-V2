<template>
  <section id="project" ref="sectionRef" class="section projects">
    <div class="container">
      <h2>Проекты</h2>

      <p v-if="loading" class="projects-status">Загрузка проектов…</p>
      <p v-else-if="error" class="projects-status">{{ error }}</p>

      <div v-else class="projects-grid">
        <article
          v-for="(project, idx) in projects"
          :key="project.id"
          :class="['project-card', slideClass(idx)]"
          :style="{ '--d': `${idx * 100}ms` }"
        >
          <a
            :href="project.link"
            class="project-media"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="project.img" :alt="project.title" class="project-img" loading="lazy" />
            <span class="media-badge">Live</span>
          </a>

          <div class="card-content">
            <h3>{{ project.title }}</h3>
            <p class="card-desc">{{ project.desc }}</p>
            <div class="tech-tags">
              <span v-for="tag in parseTech(project.tech)" :key="tag" class="tech-tag">{{ tag }}</span>
            </div>
            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="card-link"
            >
              Смотреть проект →
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useProjects } from '../../composables/useProjects'
import { useSlideIn } from '../../composables/useSlideIn'
import './ProjectsSection.scss'

const sectionRef = ref(null)
const { projects, loading, error } = useProjects()

useSlideIn(sectionRef, { removeOnLeave: true, watchSource: projects })

function slideClass(idx) {
  const mod = idx % 4
  if (mod === 0 || mod === 2) return 'slide-in-left'
  return 'slide-in-right'
}

function parseTech(tech) {
  return tech.split(',').map((t) => t.trim()).filter(Boolean)
}
</script>
