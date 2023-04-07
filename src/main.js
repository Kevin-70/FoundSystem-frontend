import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from "vue-cookies"
import './assets/main.css'

let app = createApp(App)
app.use(router).mount('#app')
app.use(VueCookies)