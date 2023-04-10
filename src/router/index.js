import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../pages/homepage.vue'
import homepage_admin from "../pages/homepage_admin.vue"
import homepage_adminS from "../pages/homepage_adminS.vue"
import login from '../pages/login.vue'
import register from "../pages/register.vue"
import submit from "../pages/submit.vue"
import welcome from "../pages/welcome.vue"
import notfound from "../pages/notfound.vue"

const routes = [
  { path: '/', component: welcome },
  { path: '/staff/:email', component: homepage },
  { path:'/admin/:email',component:homepage_admin },
  { path: '/admins/:email',component:homepage_adminS},
  { path: '/login', component: login },
  { path: "/login/register", component: register },
  { path: "/staff/submit", component: submit },
  { path: "/notfound", component: notfound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
