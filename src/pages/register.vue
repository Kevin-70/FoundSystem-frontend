<script setup>
import api from '../utils/api'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
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
      router.push(
        register.identity === '1'
          ? `/admin/${register.email}`
          : `/staff/${register.email}`
      )
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
    <el-main>
      <div class="container">
        <div class="form-wrapper">
          <el-text class="register-text" truncated>Register</el-text>
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
    </el-main>
    <el-footer style="color: #000">Powered By Vue @SE黑奴 2023</el-footer>
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
.register-text {
  left: 15%;
  font-size: 50px;
}
.container {
  height: 100%;
  width: 100%;
  position: fixed;
  /* background-size: 100% 100%; */
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.form-wrapper {
  background-color: #faf9f9;
  display: inline-block;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 10%;
  transform: translate(-50%, 0%);
}
.header {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
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
  align-self: center;
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
