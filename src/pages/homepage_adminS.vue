<script setup>
import group_tool from './adminS/group_tool.vue'
import group_join from './admin/group_join.vue'
import fund_create from './admin/fund_create.vue'
import fund_app from './admin/fund_app.vue'
import profile from './staff/profile.vue'
import { SwitchButton } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import expenditures from './staff/expenditures.vue'

const isDark = useDark(false)
const toggleDark = useToggle(isDark)
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
          <el-menu-item index="4">View Funditures</el-menu-item>
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
        <group_tool v-if="this.activeIndex == 2" />
        <group_join v-if="this.activeIndex == 2" />
        <fund_create v-if="this.activeIndex == 3" />
        <fund_app v-if="this.activeIndex == 3" />
        <expenditures v-if="this.activeIndex == 4" />
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
      this.$router.push('/login')
      await api.QuitLogin(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
          console.log(res)
        } else if (res.code === 200) {
          ElMessage.success('Quit Login')
          this.$cookies.remove('satoken')
        }
      })
    },
  },
}
</script>
