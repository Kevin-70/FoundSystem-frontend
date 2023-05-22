<script setup>
import { useDark, useToggle } from '@vueuse/core'
import icon from '../assets/image/icon.png'
const isDark = useDark(false)
const toggleDark = useToggle(isDark)
</script>
<script>
import api from '../utils/api'
export default {
  data() {
    return {
      isButtonDisabled: false,
      cooldownTimer: null,
      remainingSeconds: 0,
      code: '',
      codeverify: true,
    }
  },
  computed: {
    buttonText() {
      if (this.isButtonDisabled) {
        return `${this.remainingSeconds}s`
      } else {
        return 'Send'
      }
    },
  },
  methods: {
    async handleSend() {
      this.isButtonDisabled = true
      this.remainingSeconds = 30
      await api
        .SendEmail(this.$route.params.identity, this.$route.params.email)
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
          }
        })
      this.cooldownTimer = setInterval(() => {
        this.remainingSeconds--
        if (this.remainingSeconds <= 0) {
          clearInterval(this.cooldownTimer)
          this.isButtonDisabled = false
        }
      }, 1000)
    },
    validate() {
      const codePattern = /^\d{6}$/
      if (codePattern.test(this.code)) {
        this.codeverify = false
      } else {
        this.codeverify = true
      }
    },
    async handleVerify() {
      await api
        .CheckEmail(
          this.$route.params.identity,
          this.$route.params.email,
          this.code
        )
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
            this.$router.push('/login')
          }
        })
    },
  },

  beforeDestroy() {
    clearInterval(this.cooldownTimer)
  },
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
      <div class="verify-container">
        <div class="verify-wrapper">
          <div>
            <h1 :class="{ 'h1-class': isDark }">Verify Your Email</h1>
            <el-image :src="icon" style="width: 70%" />
            <el-form :model="register" label-position="top">
              <el-form-item
                ><el-text
                  >Your Eamil is {{ this.$route.params.email }}</el-text
                ></el-form-item
              >
              <el-form-item
                ><el-button @click="handleSend" :disabled="isButtonDisabled">{{
                  buttonText
                }}</el-button>
              </el-form-item>
              <el-form-item
                ><el-input
                  v-model="this.code"
                  @change="validate"
                  placeholder="six digits code"
                  style="width: 70%"></el-input
              ></el-form-item>
              <el-form-item
                ><el-button @click="handleVerify" :disabled="this.codeverify"
                  >Verify</el-button
                >
              </el-form-item>
            </el-form>
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
.h1-class {
  color: white;
}
.verify-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.verify-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  right: auto;
}
</style>
