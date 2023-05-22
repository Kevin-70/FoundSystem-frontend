<script setup>
import api from '../utils/api.js'
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import backgroud from '../assets/image/diana-KWhdZ2RrDWc-unsplash.jpg'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark(false)
const toggleDark = useToggle(isDark)
const login = reactive({
  email: '',
  identity: '',
  password: '',
})
const $cookies = inject('$cookies')
const router = useRouter()
const validation = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (!emailPattern.test(login.email)) {
    ElMessage.error('Please use valid email address')
    return false
  }
  if (login.password === '') {
    ElMessage.error('Please input your password')
    return false
  }
  if (login.identity === '') {
    ElMessage.error('Please choose your identity')
    return false
  }
  return true
}
async function handleLogin() {
  if (!validation()) {
    return
  }
  await api.Login(login.email, login.password, login.identity).then((res) => {
    if (res.code === 500) {
      if (res.msg === 'this account is abnormal') {
        ElMessage.error('You need to verify your email first')
        router.push(`/login/verify/${login.email}/${login.identity}`)
      } else {
        ElMessage.error(res.msg)
      }
    } else if (res.code === 200) {
      $cookies.set('satoken', res.data.tokenValue, `${res.data.tokenTimeout}s`)
      if (login.identity === '0') {
        router.push(`/staff/${login.email}`)
      } else if (login.identity === '1') {
        router.push(`/admin/${login.email}`)
      } else if (login.identity === '2') {
        router.push(`/admins/${login.email}`)
      }
    }
  })
}
async function handleStaffRegister() {
  router.push('/login/register')
}
</script>
<template>
  <el-container :class="{ 'dark-class': isDark }">
    <el-header>
      <el-switch
        style="display: flex; margin-top: 20px; left: 90%"
        v-model="isDark"
        active-text="Dark"
        inactive-text="Light"
        @change="toggleDark"></el-switch>
    </el-header>
    <el-main>
      <div class="login-container">
        <div class="image-container" style="width: 100%">
          <el-image :src="backgroud" style="width: 50%; height: 100%" />
        </div>
        <div class="login-wrapper">
          <div class="form-wrapper">
            <h1 :class="{ 'dark-class': isDark }" style="font-size: 50px">
              Login
            </h1>
            <el-form :model="register" label-position="top" :label-width="70">
              <el-form-item label="Email"
                ><el-input
                  name="email"
                  placeholder="email"
                  v-model="login.email"
                  clearable
                  required
              /></el-form-item>
              <el-form-item label="Password"
                ><el-input
                  name="password"
                  placeholder="password"
                  show-password
                  v-model="login.password"
                  clearable
                  required
              /></el-form-item>
              <el-form-item label="Login as">
                <el-radio-group v-model="login.identity" label="Identity">
                  <el-radio-button label="0" size="small"
                    >Staff</el-radio-button
                  >
                  <el-radio-button label="1" size="small"
                    >Manager</el-radio-button
                  >
                  <el-radio-button label="2" size="small"
                    >President</el-radio-button
                  >
                </el-radio-group>
              </el-form-item>
            </el-form>
            <el-button class="btn" @click.native.prevent="handleLogin">
              Login
            </el-button>
            <span :class="{ 'dark-class': isDark }">
              Don't have an account?
              <a href="#" @click.native.prevent="handleStaffRegister"
                >Sign up</a
              >
            </span>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer>Powered By Vue @SE 2023</el-footer>
  </el-container>
</template>
<style scoped>
.dark-class {
  background-color: #000;
}
.dark-class h1 {
  color: white;
}
.dark-class span {
  color: white;
}
.login-container {
  display: flex;
}

.login-wrapper {
  left: -15%;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: auto;
}
</style>
