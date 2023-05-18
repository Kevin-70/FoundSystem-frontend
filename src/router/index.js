import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import homepage from '../pages/homepage.vue'
import homepage_admin from "../pages/homepage_admin.vue"
import homepage_adminS from "../pages/homepage_adminS.vue"
import login from '../pages/login.vue'
import register from "../pages/register.vue"
import welcome from "../pages/welcome.vue"
import notfound from "../pages/notfound.vue"
import verify from "../pages/verify.vue"
import expenditureShow from "../components/ExpenditureShow.vue"
import expenditure from "../pages/staff/expenditures.vue"
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
    { path: "/notfound", component: notfound },
    { path: "/expenditure/", component: expenditure },
    { path: "/expenditureShow/:expenditureNumber", component: expenditureShow }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async(to, from, next) => {
    console.log(to.name)
    console.log(from.name)
    if (to.matched.length === 0) {
        // from.path ? next({name: from.name}) : next('/notfound')
        next('/notfound')
    } else {
        next()
    }
    // await api.IfLogin($cookies.get('satoken')).then((res) => {


    // next()
    // if (!res && to.name !== '/login') {
    //   next('/login')
    // }
    // })

    next()

})

export default router