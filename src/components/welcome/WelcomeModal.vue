<template>
  <Teleport to="body">
    <div :class="['modal', isVisible ? 'modal-in' : 'modal-out']">
      <div class="modal-content">
        <div class="icons">
          <Icon icon="fa6-solid:code" class="icon1" width="40" />
          <Icon icon="fa6-solid:user" class="icon2" width="40" />
          <Icon icon="fa6-solid:mug-hot" class="icon3" width="40" />
        </div>
        <h1>
          <span class="white-text fade-in delay-1">Добро пожаловать на</span>
        </h1>
        <h1 class="modal-text">
          <span class="purple-text fade-in delay-2">мой сайт</span>
          <span class="purple-light-text fade-in delay-3">портфолио</span>
        </h1>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import './WelcomeModal.css'

const emit = defineEmits(['close'])

const isVisible = ref(true)
let hideTimer
let closeTimer

onMounted(() => {
  hideTimer = setTimeout(() => {
    isVisible.value = false
  }, 3000)
})

onUnmounted(() => {
  clearTimeout(hideTimer)
  clearTimeout(closeTimer)
})

watch(isVisible, (visible) => {
  if (!visible) {
    closeTimer = setTimeout(() => emit('close'), 500)
  }
})
</script>
