<script setup>
import group_show from './group/group_show.vue'
import PieGraph from '../components/PieGraph.vue'
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
          <el-menu-item index="1">Group Homepage</el-menu-item>
          <el-menu-item index="2" @click="handleQuitLogin"
            >Quit Login</el-menu-item
          >
        </el-menu>
      </el-header>
      <el-main>
        <group_show />
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
      pieCatagory: [],
      pieData: [],
      pieShow: false,
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
          this.$router.push('/login')
        }
      })
    },
  },
}
</script>
