import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import homepage from '../pages/homepage.vue'
import homepage_admin from "../pages/homepage_admin.vue"
import homepage_adminS from "../pages/homepage_adminS.vue"
import login from '../pages/login.vue'
import register from "../pages/register.vue"
import submit from "../pages/submit.vue"
import welcome from "../pages/welcome.vue"
import notfound from "../pages/notfound.vue"
import verify from "../pages/verify.vue"
// import store from '@/store/index'
import api from '../utils/api'
import { inject } from 'vue'

const $cookies = inject('$cookies')

const routes = [
  { path: '/', component: welcome },
  { path: '/staff/:email', component: homepage },
  { path: '/admin/:email', component: homepage_admin },
  { path: '/admins/:email', component: homepage_adminS },
  { path: '/login', component: login },
  { path: "/login/register", component: register },
  { path: "/login/verify/:email/:identity", component: verify },
  { path: "/staff/submit", component: submit },
  { path: "/notfound", component: notfound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  console.log(from.path)
  if (JSON.stringify($cookies) == "{}") {
    next('/')
  } else {
    next()
  }

})

async function GetIfLogin () {
  try {
    const response = await api.IfLogin(

      $cookies.get('satoken')
    )
    dialogFormVisible.value = false
    if (response.code === 200) {
      const res = await api.GetMyInfo(
        $cookies.get('satoken')
      )

      console.log(response)
    } else {
      console.log(response)
    }
  } catch (error) {
    console.error(error)
  }
}

export default router