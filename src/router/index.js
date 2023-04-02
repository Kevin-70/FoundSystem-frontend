import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../pages/homepage.vue'
import login from '../pages/login.vue'

const routes = [
  { path: '/', component: homepage },
  { path: '/login', component: login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
