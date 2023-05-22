<script setup>
import { Check, Close } from '@element-plus/icons-vue'
</script>
<template>
  <el-card class="box-card" v-loading="this.loading">
    <template #header>
      <div class="card-header">
        <span>All Applications for Fund Establishment</span>
        <el-button class="button" text @click="handleMsg">Sync</el-button>
      </div>
    </template>
    <el-table :data="this.msgs" style="width: 100%">
      <!-- <el-table-column prop="expendId" label="expendId" width="100" /> -->
      <el-table-column prop="expendName" label="expendName" width="180" />
      <el-table-column prop="groupName" label="groupName" width="180" />
      <el-table-column prop="totalAmount" label="totalAmount" width="180" />
      <el-table-column prop="remainAmount" label="remainAmount" width="180" />
      <el-table-column prop="quota" label="quota" width="120" />
      <el-table-column prop="startTime" label="startTime" width="180" />
      <el-table-column prop="endTime" label="endTime" width="180" />
      <el-table-column prop="status" label="status" width="180" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            v-if="scope.row.status != 'Reject'"
            type="success"
            :icon="Check"
            circle
            @click="PassFund(scope.row.expendId)"
            :disabled="scope.row.status != 'Unread'" />
          <el-button
            v-if="scope.row.status != 'Pass'"
            type="danger"
            :icon="Close"
            circle
            @click="RejectFund(scope.row.expendId)"
            :disabled="scope.row.status != 'Unread'" />
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
    await api.GetAllFundToExam(this.$cookies.get('satoken')).then((res) => {
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
      dialogFormVisible: false,
      msgs: [],
      loading: false,
    }
  },
  methods: {
    async PassFund(appId) {
      await api.passFund(appId, this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          ElMessage.success(res.msg)
        }
      })
    },
    async RejectFund(appId) {
      await api.rejectFund(appId, this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          ElMessage.success(res.msg)
        }
      })
    },
    async handleMsg() {
      await api.GetAllFundToExam(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.msgs = res.data
        }
      })
    },
  },
}
</script>
