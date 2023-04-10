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
      <el-main class="welcome-main">
        <el-space direction="vertical">
          <el-text class="welcome-text" truncated> FundSystem </el-text>
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
        </el-space>
      </el-main>
      <el-footer style="color: #000">Powered By Vue @SE黑奴 2023</el-footer>
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 50px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-container {
  height: 100%;
  width: 100%;
  position: fixed;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.welcome-main {
  align-self: center;
}
.welcome-text {
  align-self: center;
  font-size: 200px;
}
.main-button {
  background-color: aquamarine;
  border-color: black;
  border-width: 2px;
  border-radius: 0.5rem;
  width: 200px;
  height: 70px;
  font-size: 28px;
}
</style>
