<script setup>
import { Check, Close, QuestionFilled } from '@element-plus/icons-vue'
</script>
<template>
  <el-card class="box-card" v-loading="this.loading">
    <template #header>
      <div class="card-header">
        <span>All Applications for Fund Utilization</span>
        <el-button class="button" text @click="handleMsg">Sync</el-button>
      </div>
    </template>
    <el-table :data="this.msgs" style="width: 100%">
      <el-table-column prop="appId" label="appId" width="180" />
      <el-table-column prop="userName" label="userName" width="180" />
      <el-table-column prop="groupName" label="groupName" width="180" />
      <el-table-column prop="status" label="status" width="80" />
      <el-table-column prop="expendName" label="expendName" width="180" />
      <el-table-column
        prop="expendCategory"
        label="expendCategory"
        width="180" />
      <el-table-column prop="appAmount" label="appAmount" width="180" />
      <el-table-column prop="appAbstract" label="appAbstract" width="180" />
      <el-table-column prop="comment" label="comment" width="180" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            v-if="scope.row.status == 'Unread'"
            type="primary"
            :icon="QuestionFilled"
            circle
            @click="handleFeedback(scope.row.appId)"
            :disabled="scope.row.status != 'Unread'" />
          <el-button
            v-if="scope.row.status == 'Pass'"
            type="success"
            :icon="Check"
            circle
            disabled />
          <el-button
            v-if="scope.row.status == 'Reject'"
            type="danger"
            :icon="Close"
            circle
            disabled />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog title="Feedback" v-model="feedbackVisible">
    <div class="feedback-dialog">
      <el-form>
        <el-form-item label="Your Feedback">
          <el-input
            v-model="passFeedback"
            maxlength="200"
            :rows="2"
            type="textarea"
            show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="PassApp(this.passAppId, this.passFeedback)"
          type="success"
          round
          style="width: 70px"
          >Pass</el-button
        >
        <el-button
          @click="RejectApp(this.passAppId, this.passFeedback)"
          type="danger"
          round
          style="width: 70px"
          >Reject</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import api from '../../utils/api'
export default {
  async mounted() {
    this.handleMsg()
  },
  data() {
    return {
      msgs: [],
      loading: false,
      feedbackVisible: false,
      passAppId: '',
      passFeedback: '',
    }
  },
  methods: {
    handleFeedback(appId) {
      this.feedbackVisible = true
      this.passAppId = appId
    },
    async PassApp(appId, comment) {
      this.loading = true
      await api
        .passApp(appId, comment, this.$cookies.get('satoken'))
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
          }
        })
      this.feedbackVisible = false
      this.passFeedback = ''
      this.handleMsg()
    },
    async RejectApp(appId, comment) {
      this.loading = true
      await api
        .rejectApp(appId, comment, this.$cookies.get('satoken'))
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
          }
        })
      this.feedbackVisible = false
      this.passFeedback = ''
      this.handleMsg()
    },
    async handleMsg() {
      this.loading = true
      await api.GetAllMessage(this.$cookies.get('satoken')).then((res) => {
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
