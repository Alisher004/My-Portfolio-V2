import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/index.scss'
import './assets/styles/layout.scss'

createApp(App).use(router).mount('#root')
