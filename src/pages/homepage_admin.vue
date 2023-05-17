<script setup></script>

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
        </el-menu>
      </el-header>

      <el-main>
        <div>
          <!-- <el-button>Apply for Research Group</el-button> -->
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>All Groups</span>
                <el-button class="button" text @click="handleAllGroups"
                  >Sync</el-button
                >
              </div>
            </template>
            <div v-for="item in this.groups" :key="item.value">
              {{ item.groupName }}
            </div>
          </el-card>
        </div>
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
      groups: [],
    }
  },
  methods: {
    async handleAllGroups() {
      await api.GetAllGroups(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.groups = res.data
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
.box-card {
  width: 480px;
}
</style>
