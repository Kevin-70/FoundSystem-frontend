<script setup>
import { View } from '@element-plus/icons-vue'
</script>
<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <h2 style="color: black">My Groups</h2>
          <el-button class="button" text @click="this.handleMyGroups"
            >Sync</el-button
          >
        </div>
      </template>
      <el-table :data="this.myGroups" style="width: 100%">
        <el-table-column prop="groupName" label="groupName" width="180" />
        <el-table-column prop="memberNames" label="memberNames" width="500" />
        <el-table-column prop="managerNames" label="managers" width="250" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button type="primary" :icon="View" circle @click="" />
          </template>
        </el-table-column>
      </el-table>
      <el-select v-model="group2join" multiple filterable placeholder="Select">
        <el-option
          v-for="group in allGroups"
          :label="group.groupName"
          :value="group.groupName"></el-option>
      </el-select>
      <el-button @click="this.handleJoin">Apply</el-button>
      <el-button @click="this.handleGroupApp">Test</el-button>
    </el-card>
  </div>
</template>
<script>
import api from '../../utils/api'
export default {
  async mounted() {
    this.handleMyGroups()
    this.handleAllGroups()
  },
  data() {
    return {
      group2join: [],
      myGroups: [],
      allGroups: [],
      loading: false,
      myGroupApps: [],
    }
  },
  methods: {
    async handleMyGroups() {
      this.loading = true
      await api.GetMyGroups(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.myGroups = res.data
          this.myGroups.forEach((group) => {
            const managerNames = []
            group.managers.forEach((manager) => {
              managerNames.push(manager.name)
            })
            group.managerNames = managerNames
          })
        }
      })
      this.loading = false
    },
    async handleAllGroups() {
      this.loading = true
      await api.GetAllGroups(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.allGroups = res.data
          this.allGroups.forEach((group) => {
            const managerNames = []
            group.managers.forEach((manager) => {
              managerNames.push(manager.name)
            })
            group.managerNames = managerNames
          })
        }
      })
      this.loading = false
    },
    handleJoin() {
      if (this.group2join === []) {
        ElMessage.error('please select groups you want to join!')
        return
      }
      this.group2join.forEach(async (groupName) => {
        await api
          .StaffJoinGroup('test', groupName, this.$cookies.get('satoken'))
          .then((res) => {
            if (res.code === 500) {
              ElMessage.error('apply for ' + groupName + ' error : ' + res.msg)
            } else if (res.code === 200) {
              ElMessage.success('apply for ' + groupName + ' : ' + res.msg)
            } else {
              ElMessage.error('Unknown error')
            }
          })
      })
      this.group2join = []
      this.handleMyGroups()
    },
    async handleGroupApp() {
      await api.StaffGroupApp(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.myGroupApps = res.data
          ElMessage.success(res.msg)
          console.log(this.myGroupApps)
        }
      })
    },
  },
}
</script>
<style></style>
