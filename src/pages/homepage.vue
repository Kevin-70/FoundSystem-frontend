<script setup>
import profile from './staff/profile.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-menu-item index="1">Homepage</el-menu-item>
          <el-menu-item index="2" @click="handleQuitLogin"
            >Quit Login</el-menu-item
          >
          <el-menu-item index="3" @click="handleCheckExpenditure"
            >View Expenditure</el-menu-item
          >
        </el-menu>
      </el-header>
      <el-main>
        <profile v-if="this.activeIndex == 1" />
      </el-main>
      <el-footer style="color: #000">Powered By Vue @SE 2023</el-footer>
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>
</template>
<script>
import api from '../utils/api'
export default {
  data() {
    return {
      activeIndex: 1,
    }
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key
    },
    async handleQuitLogin() {
      await api.QuitLogin(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
          console.log(res)
        } else if (res.code === 200) {
          console.log(res)
          ElMessage.success('退出登录成功')
          this.$router.push('/login')
        }
      })
    },
  },
}
</script>

<style>
.el-container {
  height: 100%;
  width: 100%;
  position: fixed;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
