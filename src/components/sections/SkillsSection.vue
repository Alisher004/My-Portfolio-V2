<template>
  <section id="skills" class="section skills">
    <div class="container">
      <h2 class="s">Мои навыки</h2>
      <div class="skills-grid">
        <article v-for="skill in skillsData" :key="skill.name" class="skill-card">
          <div class="icon" :style="{ color: skill.color, fontSize: '3rem' }">
            <Icon :icon="skill.icon" />
          </div>
          <h3>{{ skill.name }}</h3>
          <div class="skill-level">
            <div class="skill-bar">
              <div
                class="skill-progress"
                :style="{ width: skill.level, backgroundColor: skill.color }"
              />
            </div>
            <p>{{ skill.level }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import './SkillsSection.css'

const skillsData = [
  { name: 'HTML', level: '95%', icon: 'logos:html-5', color: '#e44d26' },
  { name: 'CSS', level: '95%', icon: 'logos:css-3', color: '#264de4' },
  { name: 'JavaScript', level: '80%', icon: 'logos:javascript', color: '#f7df1e' },
  { name: 'React', level: '70%', icon: 'logos:react', color: '#61dbfb' },
  { name: 'Vue', level: '65%', icon: 'logos:vue', color: '#42b883' },
  { name: 'Redux Toolkit', level: '60%', icon: 'logos:redux', color: '#764abc' },
  { name: 'TypeScript', level: '50%', icon: 'logos:typescript-icon', color: '#3178c6' },
  { name: 'SCSS', level: '50%', icon: 'logos:sass', color: '#cd6799' },
  { name: 'Git', level: '60%', icon: 'logos:git-icon', color: '#f05032' },
  { name: 'GitHub', level: '80%', icon: 'mdi:github', color: '#ffffff' },
  { name: 'Firebase', level: '50%', icon: 'logos:firebase', color: '#ffca28' },
  { name: 'MongoDB', level: '55%', icon: 'logos:mongodb-icon', color: '#47a248' },
  { name: 'Node.js', level: '10%', icon: 'logos:nodejs-icon', color: '#68a063' },
  { name: 'Python', level: '10%', icon: 'logos:python', color: '#3776ab' },
  { name: 'Bootstrap', level: '80%', icon: 'logos:bootstrap', color: '#6c27d3' },
]
</script>
