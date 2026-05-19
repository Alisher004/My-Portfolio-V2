<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ year }} Моё портфолио | Все права защищены</p>
    </div>
  </footer>
</template>

<script setup>
import './AppFooter.css'

const year = new Date().getFullYear()
</script>
