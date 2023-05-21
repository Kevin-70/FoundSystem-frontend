<script setup>
import { View } from '@element-plus/icons-vue'
</script>
<template>
  <div>
    <el-card v-loading="this.loading">
      <template #header>
        <div class="card-header">
          <span>My Groups</span>
          <el-button
            class="button"
            text
            @click="this.handleMyGroups"
            style="display: inline; margin-left: 0%"
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
            <el-button
              type="primary"
              :icon="View"
              circle
              @click="handleView(scope.row.groupName)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import api from '../../utils/api'
export default {
  async mounted() {
    this.handleMyGroups()
  },
  data() {
    return {
      myGroups: [],
      loading: false,
    }
  },
  methods: {
    async handleView(groupName) {
      this.$router.push(`/group/${groupName}`)
    },
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
  },
}
</script>
