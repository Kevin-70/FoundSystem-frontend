<script setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark(false)
const toggleDark = useToggle(isDark)
</script>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    async SignUp() {
      this.$router.push('/login/register')
    },
    async SignIn() {
      this.$router.push('/login')
    },
  },
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-switch
          style="display: flex; height: 50px; left: 90%; margin-right: 20px"
          v-model="isDark"
          active-text="Dark"
          inactive-text="Light"
          @change="toggleDark"></el-switch>
      </el-header>
      <el-main class="welcome-main">
        <h1>
          Hi! We are Funding System
          <span class="txt-rotate" data-period="1000">
            <span class="wrap">{{ text }}</span>
          </span>
        </h1>

        <img src="../assets/image/icon.png" />

        <el-row :gutter="70">
          <el-col :span="12">
            <el-button class="main-button" @click.native.prevent="SignUp"
              >Sign up</el-button
            >
          </el-col>
          <el-col :span="12">
            <el-button class="main-button" @click.native.prevent="SignIn"
              >Sign in</el-button
            ></el-col
          >
        </el-row>
      </el-main>
      <el-footer>Powered By Vue @SE 2023</el-footer>
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 50px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.welcome-main {
  align-self: center;
}
.welcome-text {
  align-self: center;
  font-size: 200px;
}
.main-button {
  border-width: 2px;
  border-radius: 0.5rem;
  width: 200px;
  height: 70px;
  font-size: 28px;
}
/* h1 {
  font-size: 65px;
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: 1;
  margin-bottom: 20px;
  display: block;
} */
</style>
