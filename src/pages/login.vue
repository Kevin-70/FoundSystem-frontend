<script setup>
import api from '../utils/api.js'
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
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
      ElMessage.error(res.msg)
    } else if (res.code === 200) {
      $cookies.set('satoken', res.data.tokenValue, `${res.data.tokenTimeout}s`)
      if (login.identity) {
        router.push(`/staff/${login.email}`)
        
      } else {
        router.push(`/admin/${login.email}`)
      }
    }
  })
}
async function handleStaffRegister() {
  router.push('/login/register')
}
</script>
<template>
  <el-container>
    <el-main>
      <div class="container">
        <div class="login-wrapper">
          <div class="form-wrapper">
            <el-text class="login-text" truncated>Login</el-text>
            <el-form :model="register" label-position="left" :label-width="70">
              <el-form-item label="Email"
                ><el-input
                  name="email"
                  placeholder="email"
                  v-model="login.email"
                  required
              /></el-form-item>
              <el-form-item label="Password"
                ><el-input
                  name="password"
                  placeholder="password"
                  show-password
                  v-model="login.password"
                  required
              /></el-form-item>
              <el-form-item label="Login as">
                <el-radio-group v-model="login.identity" label="Identity" >
                  <el-radio-button label="0" size="small">Staff</el-radio-button>
                  <el-radio-button label="1" size="small">Manager</el-radio-button>
                  <el-radio-button label="2" size="small">President</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <el-button class="btn" @click.native.prevent="handleLogin">
              Login
            </el-button>
          </div>
          <div class="msg">
            Don't have account?
            <a href="#" @click.native.prevent="handleStaffRegister">Sign up</a>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer style="color: #000">Powered By Vue @SE 2023</el-footer>
  </el-container>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  height: 100%;
}
.login-text {
  left: 25%;
  font-size: 50px;
}
.container {
  height: 100%;
  width: 100%;
  position: fixed;
  /* background-size: 100% 100%; */
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login-wrapper {
  background-color: #faf9f9;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%; /*the relative position in the */
  top: 10%;
  transform: translate(-50%, 0%); /*self's relative postion*/
}
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
  color: #000;
}
.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}
.input-item:placeholder {
  text-transform: uppercase;
}
.btn {
  text-align: center;
  align-content: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}
.msg {
  text-align: center;
  line-height: 88px;
  color: #000;
}
a {
  text-decoration-line: none;
  color: #abc1ee;
}
</style>
