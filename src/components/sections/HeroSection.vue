<template>
  <section class="home container">
    <div class="left-block">
      <h1 class="reveal" :style="{ '--i': 0 }">Frontend</h1>
      <strong class="reveal" :style="{ '--i': 1 }">Developer</strong>
      <br />
      <span class="reveal" :style="{ '--i': 2 }">
        Создаю инновационные, функциональные и удобные сайты для цифровых решений.
      </span>
      <div class="home-buttons1 reveal" :style="{ '--i': 3 }">
        <div class="home-btn1">
          <button type="button" @click="scrollToSection('project')">Проекты</button>
          <button type="button" @click="scrollToSection('contact')">Контакты</button>
        </div>
        <div class="home-btn">
          <a href="https://github.com/Alisher004" target="_blank" rel="noopener noreferrer">
            <button type="button">GitHub</button>
          </a>
          <a
            href="https://www.linkedin.com/in/%D0%B0%D0%BB%D0%B8%D1%88%D0%B5%D1%80-%D0%BC%D0%B0%D0%BD%D0%B0%D1%81%D0%BE%D0%B2-79665032a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button">LinkedIn</button>
          </a>
          <a href="https://www.instagram.com/_manasovi4/" target="_blank" rel="noopener noreferrer">
            <button type="button">Instagram</button>
          </a>
        </div>
      </div>
    </div>
    <div class="right-block">
      <img class="hero-image" src="/Coding.gif" alt="Анимация программирования" loading="eager" />
    </div>
  </section>
</template>

<script setup>
import { useScrollTo } from '../../composables/useScrollTo'
import './HeroSection.css'

const { scrollToSection } = useScrollTo()
</script>
