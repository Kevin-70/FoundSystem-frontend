import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from "vue-cookies"
import store from './store/store'
import ElementPlus from "element-plus"
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css'

let app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(ElementPlus)
app.use(store)
app.mount('#app')