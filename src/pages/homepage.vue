<script setup>
import profile from './staff/profile.vue'
import group_view from './staff/group_view.vue'
import group_app from './staff/group_app.vue'
import expenditures from './staff/expenditures.vue'
import { SwitchButton } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark(false)
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-menu-item index="1">Homepage</el-menu-item>
          <el-menu-item index="2">Group</el-menu-item>
          <el-menu-item index="3" @click="handleCheckExpenditure"
            >View Expenditure</el-menu-item
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
        <profile v-if="this.activeIndex == 1" />
        <group_view v-if="this.activeIndex == 2" />
        <group_app v-if="this.activeIndex == 2" />
        <expenditures v-if="this.activeIndex == 3" />
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
    test(whatever) {
      console.log(whatever)
    },
    handleSelect(key) {
      this.activeIndex = key
    },
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
    handleCheckExpenditure() {
      // this.$router.push('/expenditure')
      this.activeIndex = 3
    },
  },
}
</script>

<style></style>
