import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../pages/homepage.vue'
import login from '../pages/login.vue'
import register from "../pages/register.vue"

const routes = [
  { path: '/', component: homepage },
  { path: '/login', component: login },
  {path:"/login/register",component:register}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
