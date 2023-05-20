<script setup>
import { Check, Close } from '@element-plus/icons-vue'
</script>
<template>
  <el-card class="box-card" v-loading="this.loading">
    <template #header>
      <div class="card-header">
        <span>All Applications to Join a Group</span>
        <el-button class="button" text @click="handleMsg">Sync</el-button>
      </div>
    </template>
    <el-table :data="this.msgs" style="width: 100%">
      <el-table-column prop="groupName" label="groupName" width="180" />
      <el-table-column prop="applyTime" label="applyTime" width="180" />
      <el-table-column prop="comment" label="comment" width="180" />
      <el-table-column prop="applicant.name" label="applicant" width="180" />
      <el-table-column prop="status" label="status" width="180" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            v-if="scope.row.status !== 'Reject'"
            type="primary"
            :icon="Check"
            circle
            @click="PassGroupApp(scope.row.groupAppId)"
            :disabled="scope.row.status !== 'Unread'" />
          <el-button
            v-if="scope.row.status !== 'Pass'"
            type="danger"
            :icon="Close"
            circle
            @click="RejectGroupApp(scope.row.groupAppId)"
            :disabled="scope.row.status !== 'Unread'" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import api from '../../utils/api'
export default {
  async mounted() {
    this.loading = true
    await api.GetAllGroupApp(this.$cookies.get('satoken')).then((res) => {
      if (res.code === 500) {
        ElMessage.error(res.msg)
      } else if (res.code === 200) {
        this.msgs = res.data
      }
    })
    this.loading = false
  },
  data() {
    return {
      groupname: '',
      groups: [],
      updategroupname: '',
      msgs: [],
      loading: false,
    }
  },
  methods: {
    handleFeedback(appId) {
      this.feedbackVisible = true
      this.passAppId = appId
    },
    async PassGroupApp(appId) {
      this.loading = true
      await api
        .passGroupApp(appId, this.$cookies.get('satoken'))
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
          }
        })
      this.loading = false
      this.handleMsg()
    },
    async RejectGroupApp(appId) {
      this.loading = true
      await api
        .rejectGroupApp(appId, this.$cookies.get('satoken'))
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
          }
        })
      this.loading = false
      this.handleMsg()
    },
    async handleMsg() {
      this.loading = true
      await api.GetAllGroupApp(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.msgs = res.data
        }
      })
      this.loading = false
    },
  },
}
</script>
