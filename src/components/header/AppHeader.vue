<template>
  <header ref="headerRef" :class="['content3', { scrolled }]">
    <div class="container header">
      <h1 class="title" tabindex="0" @click="onLogoClick" @keydown.enter="onLogoClick">ALISHER</h1>

      <button
        type="button"
        class="menu-icon"
        :class="{ open: menuOpen }"
        aria-label="Открыть меню"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </button>

      <nav class="info-content" :class="{ show: menuOpen }" aria-label="Главная навигация">
        <a href="#about" @click.prevent="go('about')">обо мне</a>
        <a href="#project" @click.prevent="go('project')">проекты</a>
        <a href="#resume" @click.prevent="go('resume')">резюме</a>
        <a href="#skills" @click.prevent="go('skills')">навыки</a>
        <a href="#contact" @click.prevent="go('contact')">контакты</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollTo } from '../../composables/useScrollTo'
import './AppHeader.css'

const menuOpen = ref(false)
const scrolled = ref(false)
const headerRef = ref(null)
const { scrollToSection, scrollToTop } = useScrollTo()

let ticking = false

function handleScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 8
    ticking = false
  })
}

function go(id) {
  scrollToSection(id)
  menuOpen.value = false
}

function onLogoClick() {
  scrollToTop()
  menuOpen.value = false
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
