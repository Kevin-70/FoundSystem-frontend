<script setup>
import {
  Edit,
  Delete,
  Check,
  Close,
  QuestionFilled,
} from '@element-plus/icons-vue'
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
        </el-menu>
      </el-header>

      <el-main>
        <div>
          <el-card class="box-card" v-if="this.activeIndex == 3">
            <template #header>
              <div class="card-header">
                <span>All Applications for Fund Establishment</span>
                <el-button class="button" text @click="handleMsg3"
                  >Sync</el-button
                >
              </div>
            </template>
            <el-table :data="this.msgs3" style="width: 100%">
              <el-table-column prop="expendId" label="expendId" width="100" />
              <el-table-column
                prop="expendName"
                label="expendName"
                width="180" />
              <el-table-column prop="groupName" label="groupName" width="180" />
              <el-table-column
                prop="totalAmount"
                label="totalAmount"
                width="180" />
              <el-table-column
                prop="remainAmount"
                label="remainAmount"
                width="180" />
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
          <el-card class="box-card" v-if="this.activeIndex == 3">
            <template #header>
              <div class="card-header">
                <span>All Applications for Fund Utilization</span>
                <el-button class="button" text @click="handleMsg"
                  >Sync</el-button
                >
              </div>
            </template>
            <el-table :data="this.msgs" style="width: 100%">
              <el-table-column prop="appId" label="appId" width="180" />
              <el-table-column prop="userName" label="userName" width="180" />
              <el-table-column prop="groupName" label="groupName" width="180" />
              <el-table-column prop="status" label="status" width="80" />
              <el-table-column
                prop="expendName"
                label="expendName"
                width="180" />
              <el-table-column
                prop="expendCategory"
                label="expendCategory"
                width="180" />
              <el-table-column prop="appAmount" label="appAmount" width="180" />
              <el-table-column
                prop="appAbstract"
                label="appAbstract"
                width="180" />
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
          <el-card class="box-card" v-if="this.activeIndex == 2">
            <template #header>
              <div class="card-header">
                <span>All Applications to Join a Group</span>
                <el-button class="button" text @click="handleMsg2"
                  >Sync</el-button
                >
              </div>
            </template>
            <el-table :data="this.msgs2" style="width: 100%">
              <el-table-column
                prop="groupAppId"
                label="groupAppId"
                width="180" />
              <el-table-column prop="applyTime" label="applyTime" width="180" />
              <el-table-column prop="comment" label="comment" width="180" />
              <el-table-column prop="groupName" label="groupName" width="180" />
              <el-table-column prop="groupId" label="groupId" width="180" />
              <el-table-column prop="status" label="status" width="180" />
              <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                  <el-button
                    type="primary"
                    :icon="Check"
                    circle
                    @click="PassApp(scope.row.groupAppId)"
                    :disabled="scope.row.status !== 'Unread'" />
                  <el-button
                    type="danger"
                    :icon="Close"
                    circle
                    @click="RejectApp(scope.row.groupAppId)"
                    :disabled="scope.row.status !== 'Unread'" />
                </template>
              </el-table-column>
            </el-table>
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
      groupname: '',
      groups: [],
      dialogFormVisible: false,
      feedbackVisible: false,
      updategroupname: '',
      msgs: [],
      msgs2: [],
      msgs3: [],
      managers: '',
      NewManagers: [],
      OldManagers: [],
      activeIndex: 1,
      passFeedback: '',
      passAppId: '',
    }
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key
    },
    async handleUpdateClick(groupname) {
      this.dialogFormVisible = true
      this.passgroupname = groupname
      this.updategroupname = groupname
      await api.GetAllManagers(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.managers = res.data
        }
      })
    },
    async PassApp(appId, comment) {
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
    },
    async RejectApp(appId) {
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
    },
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
    async PassGroupApp(appId) {
      await api
        .passGroupApp(appId, this.$cookies.get('satoken'))
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
          }
        })
    },
    async RejectGroupApp(appId) {
      await api
        .rejectGroupApp(appId, this.$cookies.get('satoken'))
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
          }
        })
    },
    async handleAllGroups() {
      await api.GetAllGroups(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.groups = res.data
          this.groups.forEach((group) => {
            const managerNames = []
            group.managers.forEach((manager) => {
              managerNames.push(manager.name)
            })
            group.managerNames = managerNames
          })
        }
      })
    },
    async handleMsg() {
      await api.GetAllMessage(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.msgs = res.data
        }
      })
    },
    async handleMsg2() {
      await api.GetAllGroupApp(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.msgs2 = res.data
        }
      })
    },
    async handleMsg3() {
      await api.GetAllFundToExam(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.msgs3 = res.data
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
