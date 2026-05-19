<template>
  <div class="animated-background" aria-hidden="true">
    <div class="light-particles">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="light-particle"
        :style="{
          left: `${particle.left}%`,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`,
        }"
      />
    </div>

    <div class="light-streams">
      <div
        v-for="stream in streams"
        :key="stream.id"
        class="light-stream"
        :style="{
          left: `${stream.left}%`,
          animationDelay: `${stream.delay}s`,
          animationDuration: `${stream.duration}s`,
        }"
      />
    </div>

    <div class="light-rings">
      <div class="light-ring ring-1">
        <div class="ring-particle" />
        <div class="ring-particle" />
        <div class="ring-particle" />
      </div>
      <div class="light-ring ring-2">
        <div v-for="n in 4" :key="n" class="ring-particle" />
      </div>
      <div class="light-ring ring-3">
        <div class="ring-particle" />
        <div class="ring-particle" />
      </div>
    </div>

    <div class="light-orbs">
      <div
        v-for="orb in orbs"
        :key="orb.id"
        class="light-orb"
        :style="{
          left: `${orb.left}%`,
          top: `${orb.top}%`,
          animationDelay: `${orb.delay}s`,
          animationDuration: `${orb.duration}s`,
        }"
      />
    </div>

    <div class="light-waves">
      <div class="wave wave-1" />
      <div class="wave wave-2" />
      <div class="wave wave-3" />
    </div>
  </div>
</template>

<script setup>
import './AnimatedBackground.css'

function createStableItems(count, factory) {
  return Array.from({ length: count }, (_, id) => factory(id))
}

const particles = createStableItems(50, (id) => ({
  id,
  left: Math.random() * 100,
  delay: Math.random() * 20,
  duration: 15 + Math.random() * 20,
}))

const streams = createStableItems(8, (id) => ({
  id,
  left: id * 12.5,
  delay: id * 2,
  duration: 8 + Math.random() * 4,
}))

const orbs = createStableItems(6, (id) => ({
  id,
  left: 20 + id * 15,
  top: 30 + (id % 2) * 40,
  delay: id * 1.5,
  duration: 4 + Math.random() * 3,
}))
</script>
