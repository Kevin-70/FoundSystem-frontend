<template>
  <el-container>
    <el-main>
      <div class="container">
        <div class="login-wrapper">
          <div class="header">Account Register</div>
          <div class="form-wrapper">
            <input
              type="text"
              name="Email"
              placeholder="your eamil"
              v-model="email"
              class="input-item"
              required />
            <input
              type="number"
              name="Sfaff ID"
              placeholder="your staff ID"
              v-model="id"
              class="input-item"
              required />
            <input
              type="text"
              name="username"
              placeholder="username"
              class="input-item"
              v-model="username"
              required />
            <input
              type="password"
              name="password"
              placeholder="password"
              v-model="password"
              class="input-item"
              required />
            <input
              type="password"
              name="confirm password"
              placeholder="confirm password"
              v-model="confirm_password"
              class="input-item"
              required />
            <el-button class="btn" @click.native.prevent="handleStaffRegister"
              >Staff Register</el-button
            >
            <router-link to="/login" class="login-link" style="display: center"
              >Already have an account?</router-link
            >
          </div>
        </div>
      </div>
    </el-main>
    <el-footer style="color: #000">Powered By Vue @SE黑奴 2023</el-footer>
  </el-container>
</template>

<script>
import api from '../utils/api.js'
export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      id: '',
      confirm_password: '',
    }
  },
  methods: {
    async handleStaffRegister() {
      if (!this.password) {
        alert('Please input your password')
        return
      }
      if (this.password !== this.confirm_password) {
        alert('Please confirm your password')
        return
      }
      await api
        .StaffRegister(this.email, this.username, this.password)
        .then((res) => {
          if (res.code === 500) {
            alert(res.msg)
          } else if (res.code === 200) {
            this.$router.push('/')
          }
          console.log(res)
        })
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  height: 100%;
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
