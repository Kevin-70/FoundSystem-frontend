<script setup>
import api from '../utils/api'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import backgroud from '../assets/image/salman-sidheek-gIpXuTqsu0s-unsplash.jpg'
import { ElMessage } from 'element-plus'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark(false)
const toggleDark = useToggle(isDark)
const register = reactive({
  email: '',
  identity: '',
  name: '',
  pwd: '',
  checkpwd: '',
})
const router = useRouter()
const validation = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (!emailPattern.test(register.email)) {
    ElMessage.error('Please use valid email address')
    return false
  }
  if (register.identity === '') {
    ElMessage.error('Please choose your identity')
    return false
  }
  if (register.name === '') {
    ElMessage.error('Please input your name')
    return false
  }
  if (register.pwd === '') {
    ElMessage.error('Please input your password')
    return false
  }

  if (register.pwd !== register.checkpwd) {
    ElMessage.error('Please confirm your password')
    return false
  }
  return true
}
async function handleRegister() {
  if (!validation()) {
    return
  }

  try {
    const response = await api.Register(
      register.email,
      register.name,
      register.pwd,
      register.identity
    )
    if (response.code === 200) {
      ElMessage('Please verify your email')
      router.push(`/login/verify/${register.email}/${register.identity}`)
    } else {
      console.log(response)
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <el-container>
    <el-header>
      <el-switch
        style="display: flex; margin-top: 20px; left: 90%"
        v-model="isDark"
        active-text="Dark"
        inactive-text="Light"
        @change="toggleDark"></el-switch>
    </el-header>
    <el-main>
      <div class="container">
        <div class="register-wrapper">
          <div class="form-wrapper">
            <h1 :class="{ 'h1-class': isDark }" style="font-size: 50px">
              Register
            </h1>
            <el-form :model="register" label-position="top">
              <el-form-item label="Email">
                <el-input
                  clearable
                  v-model="register.email"
                  placeholder="please input valid email address" />
              </el-form-item>
              <el-form-item label="Register as">
                <el-radio-group v-model="register.identity" label="Identity">
                  <el-radio-button label="0">Staff</el-radio-button>
                  <el-radio-button label="1">Manager</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Name">
                <el-input
                  v-model="register.name"
                  placeholder="please input your name" />
              </el-form-item>
              <el-form-item label="Password">
                <el-input
                  show-password
                  v-model="register.pwd"
                  placeholder="please input your password" />
              </el-form-item>
              <el-form-item label="Confirm Password">
                <el-input
                  show-password
                  v-model="register.checkpwd"
                  placeholder="please confirm your password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleRegister"
                  >Sign Up</el-button
                >
              </el-form-item>
              <el-form-item>
                <router-link
                  to="/login"
                  class="login-link"
                  style="display: center"
                  >Already have an account?</router-link
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="image-container" style="width: 100%">
          <el-image
            :src="backgroud"
            style="width: 50%; height: 100%; margin-left: 50%" />
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
.h1-class {
  color: white;
}
.container {
  display: flex;
}
.register-wrapper {
  left: 5%;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: auto;
}
</style>
