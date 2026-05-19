<template>
  <section id="contact" ref="sectionRef" class="contact-section">
    <h2 class="contact-title">Связаться со мной</h2>
    <div class="contact-content">
      <div class="contact-card slide-in-left" :style="{ '--d': '0ms' }">
        <h3>Отправить сообщение</h3>
        <form
          action="https://formsubmit.co/alisermanasov00@gmail.com"
          method="POST"
          class="contact-form"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Сообщение с портфолио" />
          <input type="text" name="name" placeholder="Ваше имя" required />
          <input type="email" name="email" placeholder="Ваш email" required />
          <textarea name="message" placeholder="Ваше сообщение" required />
          <button type="submit" class="submit-btn">Отправить</button>
        </form>
      </div>

      <div class="contact-card slide-in-right" :style="{ '--d': '120ms' }">
        <h3>Контакты</h3>
        <div class="contact-info">
          <div class="info-item">
            <Icon icon="mdi:email" class="info-icon" />
            <div class="info-content2">
              <h4>Email</h4>
              <p>
                <a href="mailto:alisermanasov00@gmail.com">alisermanasov00@gmail.com</a>
              </p>
            </div>
          </div>
          <div class="info-item">
            <Icon icon="mdi:phone" class="info-icon" />
            <div class="info-content2">
              <h4>Телефон</h4>
              <p>
                <a href="tel:+996000000000">+996 (___) ___-___</a>
              </p>
            </div>
          </div>
          <div class="info-item">
            <Icon icon="mdi:map-marker" class="info-icon" />
            <div class="info-content2">
              <h4>Город</h4>
              <p>Бишкек, Кыргызстан</p>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-card slide-in-left" :style="{ '--d': '240ms' }">
        <h3>Соцсети</h3>
        <div class="social-links">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="social-item"
          >
            <Icon :icon="link.icon" class="social-icon" />
            <span>{{ link.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useSlideIn } from '../../composables/useSlideIn'
import './ContactSection.css'

const sectionRef = ref(null)
useSlideIn(sectionRef, { removeOnLeave: true })

const socialLinks = [
  {
    label: 'LinkedIn',
    icon: 'mdi:linkedin',
    href: 'https://www.linkedin.com/in/%D0%B0%D0%BB%D0%B8%D1%88%D0%B5%D1%80-%D0%BC%D0%B0%D0%BD%D0%B0%D1%81%D0%BE%D0%B2-79665032a/',
  },
  { label: 'Instagram', icon: 'mdi:instagram', href: 'https://www.instagram.com/_manasovi4/' },
  { label: 'GitHub', icon: 'mdi:github', href: 'https://github.com/Alisher004' },
  {
    label: 'YouTube',
    icon: 'mdi:youtube',
    href: 'https://www.youtube.com/@%D0%90%D0%BB%D0%B8%D1%88%D0%B5%D1%80444',
  },
]
</script>
