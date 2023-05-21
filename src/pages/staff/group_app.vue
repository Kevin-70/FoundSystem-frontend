<script setup></script>
<template>
  <div>
    <el-card v-loading="this.loading">
      <template #header>
        <div class="card-header">
          <span>My Groups</span>
          <el-button
            class="button"
            text
            @click="this.handleGroupApp"
            style="display: inline; margin-left: 0%"
            >Sync</el-button
          >
        </div>
      </template>
      <el-select v-model="group2join" multiple filterable placeholder="Select">
        <el-option
          v-for="group in allGroups"
          :label="group.groupName"
          :value="group.groupName"></el-option>
      </el-select>
      <el-input
        v-model="this.comment"
        style="width: 200px"
        placeholder="comment here"></el-input>
      <el-button @click="this.handleJoin">Apply</el-button>
      <el-table
        :data="myGroupApps"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column prop="groupName" label="groupName" width="180" />
        <el-table-column prop="applyTime" label="applyTime" width="200" />
        <el-table-column prop="comment" label="comment" width="250" />
        <el-table-column prop="status" label="status" width="250" />
      </el-table>
    </el-card>
  </div>
</template>
<script>
import api from '../../utils/api'
export default {
  async mounted() {
    this.handleGroupApp()
    this.handleAllGroups()
  },
  data() {
    return {
      comment: '',
      loading: false,
      myGroupApps: [],
      group2join: [],
      allGroups: [],
    }
  },
  methods: {
    tableRowClassName(r) {
      if (r.row.status === 'Pass') {
        return 'success-row'
      } else if (r.row.status === 'Reject') {
        return 'warning-row'
      }
      return ''
    },
    async handleGroupApp() {
      this.loading = true
      await api.StaffGroupApp(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.myGroupApps = res.data
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
    async handleJoin() {
      if (this.group2join === []) {
        ElMessage.error('please select groups you want to join!')
        return
      }
      this.group2join.forEach(async (groupName) => {
        await api
          .StaffJoinGroup(this.comment, groupName, this.$cookies.get('satoken'))
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
      this.comment = ''
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.handleGroupApp()
    },
  },
}
</script>
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-3);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
