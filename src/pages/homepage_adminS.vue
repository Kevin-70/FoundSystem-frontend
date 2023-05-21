<script setup>
import group_tool from './adminS/group_tool.vue'
import group_join from './admin/group_join.vue'
import fund_create from './admin/fund_create.vue'
import fund_app from './admin/fund_app.vue'
import profile from './staff/profile.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          :default-active="this.activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-menu-item index="1">Homepage</el-menu-item>
          <el-menu-item index="2">Group Management</el-menu-item>
          <el-menu-item index="3">Fund Management</el-menu-item>
          <el-menu-item index="4" @click="handleQuitLogin"
            >Quit Login</el-menu-item
          >
        </el-menu>
      </el-header>
      <el-main>
        <profile v-if="this.activeIndex == 1" />
        <group_tool v-if="this.activeIndex == 2" />
        <group_join v-if="this.activeIndex == 2" />
        <fund_create v-if="this.activeIndex == 3" />
        <fund_app v-if="this.activeIndex == 3" />
      </el-main>
      <el-footer>Powered By Vue @SE 2023</el-footer>
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
          ElMessage.success('退出登录成功')
          this.$cookies.remove('satoken')
        }
      })
      this.$router.push('/login')
    },
  },
}
</script>
