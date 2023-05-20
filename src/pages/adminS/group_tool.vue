<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <el-card class="box-card" v-loading="this.loading">
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
      <el-table :data="this.groups" style="width: 100%">
        <el-table-column prop="groupName" label="groupName" width="180" />
        <el-table-column prop="memberNames" label="memberNames" width="180" />
        <el-table-column prop="managerNames" label="managers" width="180" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click="handleUpdateClick(this.groups[scope.$index].groupName)" />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="deleteGroup(this.groups[scope.$index].groupName)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
  </div>
</template>

<script>
import api from '../../utils/api'
export default {
  async mounted() {
    this.handleAllGroups()
  },
  data() {
    return {
      groupname: '',
      groups: [],
      dialogFormVisible: false,
      feedbackVisible: false,
      updategroupname: '',
      msgs: [],
      managers: '',
      NewManagers: [],
      OldManagers: [],
      activeIndex: 1,
      passAppId: '',
      loading: false,
    }
  },
  methods: {
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
      this.loading = true
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
      this.loading = false
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
  },
}
</script>
<style></style>
