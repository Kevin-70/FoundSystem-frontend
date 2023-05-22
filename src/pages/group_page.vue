<script setup>
import group_show from './group/group_show.vue'
import { SwitchButton } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark(false)
const toggleDark = useToggle(isDark)
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
          <el-button
            style="height: 60px; border: none"
            @click="this.$router.go(-1)"
            >Go Back to Homepage</el-button
          >
          <el-button
            index="4"
            :icon="SwitchButton"
            @click="handleQuitLogin"
            style="display: flex; height: auto; margin-left: auto; border: none"
            >Log out</el-button
          >
          <el-switch
            style="
              display: flex;
              height: auto;
              margin-left: 20px;
              margin-right: 20px;
            "
            v-model="isDark"
            active-text="Dark"
            inactive-text="Light"
            @change="toggleDark"></el-switch>
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
    handleback() {},
    async handleQuitLogin() {
      this.$router.push('/login')
      await api.QuitLogin(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
          console.log(res)
        } else if (res.code === 200) {
          ElMessage.success('退出登录成功')
          this.$cookies.remove('satoken')
        }
      })
    },
  },
}
</script>
