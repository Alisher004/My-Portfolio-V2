<template>
  <div class="layout">
    <AnimatedBackground />
    <WelcomeModal v-if="showModal" @close="showModal = false" />
    <template v-else>
      <AppHeader />
      <main>
        <RouterView />
      </main>
      <AppFooter />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AnimatedBackground from '../components/background/AnimatedBackground.vue'
import WelcomeModal from '../components/welcome/WelcomeModal.vue'
import AppHeader from '../components/header/AppHeader.vue'
import AppFooter from '../components/footer/AppFooter.vue'

const showModal = ref(true)
</script>
