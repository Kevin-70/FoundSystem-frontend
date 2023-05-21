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
  <el-container>
    <el-main>
      <div class="container">
        <div class="form-wrapper">
          <el-text class="verify-text" truncated>Verify Your Email</el-text>
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
    </el-main>
    <el-footer style="color: #000">Powered By Vue @SE 2023</el-footer>
  </el-container>
</template>

<style></style>
