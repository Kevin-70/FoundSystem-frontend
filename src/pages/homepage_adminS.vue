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
          <el-card class="box-card" v-if="this.activeIndex == 2">
            <template #header>
              <div class="card-header">
                <span>Group Management</span>
                <el-button class="button" text @click="handleAllGroups"
                  >Sync</el-button
                >
              </div>
            </template>
            <el-input
              style="width: 360px"
              v-model="this.groupname"
              placeholder="Please input group name"></el-input>
            <el-button @click="createGroup">Create Group</el-button>
            <br />
            <el-table :data="this.groups" style="width: 100%">
              <el-table-column prop="groupName" label="groupName" width="180" />
              <el-table-column
                prop="memberNames"
                label="memberNames"
                width="180" />
              <el-table-column
                prop="managerNames"
                label="managers"
                width="180" />
              <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                  <el-button
                    type="primary"
                    :icon="Edit"
                    circle
                    @click="
                      handleUpdateClick(this.groups[scope.$index].groupName)
                    " />
                  <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    @click="deleteGroup(this.groups[scope.$index].groupName)" />
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="box-card" v-if="this.activeIndex == 3">
            <template #header>
              <div class="card-header">
                <span>All Applications for Fund Establishment</span>
                <el-button class="button" text @click="handleMsg"
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
                <el-button class="button" text @click="handleMsg"
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
        </div>
        <el-dialog v-model="dialogFormVisible" title="Edit Group">
          <div class="updatebox">
            <el-input
              v-model="updategroupname"
              placeholder="Please Input"
              style="width: 360px"></el-input>
            <el-button @click="editGroup(updategroupname)"
              >Update Group Name</el-button
            >
          </div>
          <div>
            <el-select
              v-model="NewManagers"
              multiple
              filterable
              placeholder="Select"
              style="width: 240px">
              <el-option
                v-for="item in managers"
                :key="item.name"
                :label="item.name"
                :value="item.mail"
                :disabled="
                  [
                    ...this.groups.find(
                      (item) => item.groupName == this.passgroupname
                    ).managerNames,
                  ].includes(item.name)
                " />
            </el-select>
            <el-button @click="assignManagers">Assign New Manager</el-button>
          </div>
          <div>
            <el-select
              v-model="OldManagers"
              multiple
              filterable
              placeholder="Select"
              style="width: 240px">
              <el-option
                v-for="item in managers"
                :key="item.name"
                :label="item.name"
                :value="item.mail"
                :disabled="
                  ![
                    ...this.groups.find(
                      (item) => item.groupName == this.passgroupname
                    ).managerNames,
                  ].includes(item.name)
                " />
            </el-select>
            <el-button @click="unassignManagers">Unassign Manager</el-button>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Close</el-button>
            </span>
          </template>
        </el-dialog>
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
      </el-main>
      <el-footer style="color: #000">Powered By Vue @SE 2023</el-footer>
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>
</template>
<script>
import api from '../utils/api'
export default {
  async mounted() {
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
    await api.GetAllMessage(this.$cookies.get('satoken')).then((res) => {
      if (res.code === 500) {
        ElMessage.error(res.msg)
      } else if (res.code === 200) {
        this.msgs = res.data
      }
    })
    await api.GetAllGroupApp(this.$cookies.get('satoken')).then((res) => {
      if (res.code === 500) {
        ElMessage.error(res.msg)
      } else if (res.code === 200) {
        this.msgs2 = res.data
      }
    })
    await api.GetAllFundToExam(this.$cookies.get('satoken')).then((res) => {
      if (res.code === 500) {
        ElMessage.error(res.msg)
      } else if (res.code === 200) {
        this.msgs3 = res.data
      }
    })
  },
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
    handleFeedback(appId) {
      this.feedbackVisible = true
      this.passAppId = appId
    },
    handleSelect(key) {
      this.activeIndex = key
    },
    test(whatever) {
      console.log(whatever)
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
      this.passFeedback = ''
    },
    async RejectApp(appId, comment) {
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
    async CheckAllManager() {
      await api.GetAllManagers(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.managers = res.data
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
    async assignManagers() {
      this.NewManagers.forEach(async (manager) => {
        await api
          .AssignManager(
            this.passgroupname,
            manager,
            this.$cookies.get('satoken')
          )
          .then((res) => {
            if (res.code === 500) {
              ElMessage.error(res.msg + ': failed to assign ' + manager)
            } else if (res.code === 200) {
              ElMessage.success(
                manager + ' is assigned as manager successfully'
              )
            }
          })
      })
      this.NewManagers = []
      await new Promise((resolve) => setTimeout(resolve, 1000))
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
    async unassignManagers() {
      this.OldManagers.forEach(async (manager) => {
        await api
          .unAssignManager(
            this.passgroupname,
            manager,
            this.$cookies.get('satoken')
          )
          .then((res) => {
            if (res.code === 500) {
              ElMessage.error(res.msg + ': failed to unassign ' + manager)
            } else if (res.code === 200) {
              ElMessage.success(manager + ' is unassigned successfully')
            }
          })
      })
      this.OldManagers = []
      await new Promise((resolve) => setTimeout(resolve, 1000))
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
    async createGroup() {
      if (this.groupname === '') {
        ElMessage.error('Group Name can not be empty')
        return
      }
      await api
        .CreateGroup(this.groupname, this.$cookies.get('satoken'))
        .then(async (res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
            console.log(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
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
          } else {
            ElMessage.error('unknown error')
          }
        })
    },
    async deleteGroup(groupName) {
      await api
        .DeleteGroup(groupName, this.$cookies.get('satoken'))
        .then(async (res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
            console.log(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
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
          } else {
            ElMessage.error('unknown error')
          }
        })
    },
    async editGroup(updateName) {
      if (updateName === '') {
        ElMessage.error('Group Name can not be empty')
        return
      }
      if (updateName === this.passgroupname) {
        ElMessage.error('Please Update Group Name')
        return
      }
      await api
        .EditGroup(this.passgroupname, updateName, this.$cookies.get('satoken'))
        .then(async (res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
            console.log(res.msg)
          } else if (res.code === 200) {
            ElMessage.success(res.msg)
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
          } else {
            ElMessage.error('unknown error')
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
  width: 1580px;
}

.el-table .reject-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
