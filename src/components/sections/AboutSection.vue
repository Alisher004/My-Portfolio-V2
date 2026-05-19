<template>
  <section id="about" ref="sectionRef" class="about">
    <h2>Обо мне</h2>
    <div class="info-about container about-card">
      <div class="block1 about-text slide-in-left" :style="{ '--d': '120ms' }">
        <p class="p">
          Привет! Я <b>Талипжанов Алишер Манасович</b> — Frontend-разработчик. Для меня создание
          сайтов — лучший способ совместить креативность и технологии. Моя цель — делать удобные и
          красивые веб-приложения и постоянно развиваться. За последние месяцы работал с JavaScript,
          React, Vue, GitHub и TypeScript. Помимо кода, люблю творческие проекты, дизайн и изучение
          новых технологий. В свободное время играю на гитаре.
        </p>
      </div>
      <div
        ref="imgWrapRef"
        class="block2 about-image slide-in-right"
        :style="{ '--d': '260ms' }"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
      >
        <img
          ref="imgRef"
          src="/icon.svg"
          alt="Алишер Талипжанов"
          loading="lazy"
          :style="{ willChange: 'transform' }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSlideIn } from '../../composables/useSlideIn'
import './AboutSection.css'

const sectionRef = ref(null)
const imgRef = ref(null)
const imgWrapRef = ref(null)
let animationFrame = null

useSlideIn(sectionRef)

function onMouseMove(e) {
  if (animationFrame) cancelAnimationFrame(animationFrame)

  animationFrame = requestAnimationFrame(() => {
    const wrap = imgWrapRef.value
    const img = imgRef.value
    if (!wrap || !img) return

    const rect = wrap.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    const rotateY = dx * 8
    const rotateX = -dy * 8

    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  })
}

function onMouseLeave() {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  const img = imgRef.value
  if (img) {
    img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  }
}
</script>
