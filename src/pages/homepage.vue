<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
// import { Sunny, Moon } from '@element-plus/icons-vue'
import api from '../utils/api'
const route = useRoute()
const $cookies = inject('$cookies')
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const info = reactive({
  sex: '',
  bio: '',
  name: '',
  phoneNumber: '',
})
const form = reactive({
  sex: '',
  bio: '',
  name: '',
  phoneNumber: '',
})
const groups = ref([])
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
onMounted(async () => {
  await api
    // .GetUserInfo(route.params.email, $cookies.get('satoken'))
    .GetMyInfo($cookies.get('satoken'))
    .then((res) => {
      info.name = res.data.name
      info.sex = res.data.sex
      info.bio = res.data.bio
      info.phoneNumber = res.data.phoneNumber

      form.sex = res.data.sex
      form.bio = res.data.bio
      form.phoneNumber = res.data.phoneNumber
      form.name = res.data.name
    })
    .catch((error) => {
      console.log(error)
    })
  await api
    // .GetUserInfo(route.params.email, $cookies.get('satoken'))
    .GetMyInfo($cookies.get('satoken'))
    .then((res) => {
      info.name = res.data.name
      info.sex = res.data.sex
      info.bio = res.data.bio
      info.phoneNumber = res.data.phoneNumber
      form.sex = res.data.sex ? '女' : '男'
      form.bio = res.data.bio
      form.phoneNumber = res.data.phoneNumber
      form.name = res.data.name
    })
    .catch((error) => {
      console.log(error)
    })
})
async function UpdateInfo() {
  try {
    const response = await api.UpdateUserInfo(
      form.bio,
      form.phoneNumber,
      form.sex,
      form.name,
      $cookies.get('satoken')
    )
    dialogFormVisible.value = false
    if (response.code === 200) {
      const res = await api.GetMyInfo(
        // route.params.email,
        $cookies.get('satoken')
      )
      info.bio = res.data.bio
      info.sex = res.data.sex
      info.phoneNumber = res.data.phoneNumber
      info.name = res.data.name

      form.sex = res.data.sex ? '女' : '男'
      form.bio = res.data.bio
      form.phoneNumber = res.data.phoneNumber
      form.name = res.data.name
      console.log(response)
    } else {
      console.log(response)
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

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
          <el-menu-item index="2"
            ><el-button @click="handleQuitLogin"
              >退出登录</el-button
            ></el-menu-item
          >
        </el-menu>
      </el-header>
      <el-main>
        <div>
          <el-row :gutter="15">
            <el-col :span="10" :push="1">
              <el-descriptions border column="1">
                <template #title>
                  <h2 style="color: white">User Info</h2>
                </template>
                <template #extra>
                  <el-button @click="dialogFormVisible = true"
                    >Update</el-button
                  >
                </template>
                <el-descriptions-item label="Username">{{
                  info.name
                }}</el-descriptions-item>
                <el-descriptions-item label="Telephone">{{
                  info.phoneNumber
                }}</el-descriptions-item>
                <el-descriptions-item label="Sex">{{
                  info.sex ? '女' : '男'
                }}</el-descriptions-item>
                <el-descriptions-item label="Bio">{{
                  info.bio
                }}</el-descriptions-item>
              </el-descriptions>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="10" :push="1">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>My Groups</span>
                    <el-button class="button" text @click="handleAllGroups"
                      >Sync</el-button
                    >
                  </div>
                </template>
                <div v-for="item in this.options" :key="item.value">
                  {{ item.groupName }}
                </div>
              </el-card>
            </el-col></el-row
          >
          <el-row :gutter="15">
            <el-col :span="10" :push="1"
              ><el-button @click="openJoinWindow"
                >Join Research Group</el-button
              >
            </el-col></el-row
          >
          <el-dialog v-model="dialogFormVisible" title="Update Info">
            <el-form :inline="true" :model="form">
              <el-form-item label="phone number" :label-width="formLabelWidth">
                <el-input v-model="form.phoneNumber" autocomplete="off" />
              </el-form-item>
              <el-form-item label="Sex" :label-width="formLabelWidth">
                <el-select v-model="form.sex" placeholder="Please select">
                  <el-option label="男" value="0" />
                  <el-option label="女" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item
                label="name"
                :inline="false"
                :label-width="formLabelWidth">
                <el-input
                  v-model="form.name"
                  placeholder="Please input your name"
                  show-word-limit
                  autocomplete="off" />
              </el-form-item>
              <el-form-item
                label="bio"
                :inline="false"
                :label-width="formLabelWidth">
                <el-input
                  v-model="form.bio"
                  maxlength="200"
                  placeholder="Please input your bio"
                  show-word-limit
                  autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="UpdateInfo">
                  Confirm
                </el-button>
              </span>
            </template>
          </el-dialog>

          <el-dialog v-model="dialogFormVisible2" title="Join Group">
            <el-select v-model="choice" placeholder="请选择">
              <el-option
                v-for="item in this.options"
                :key="item.value"
                :label="item.groupName"
                :value="item.groupName">
              </el-option>
            </el-select>
            <el-button @click="handleApplyGroup">Apply</el-button>
            <el-button @click="handleJoinGroup">Join(just for test)</el-button>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">Close</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </el-main>
      <el-footer style="color: #000">Powered By Vue @SE 2023</el-footer>
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      options: [],
      choice: '',
      groups: [],
    }
  },
  methods: {
    openJoinWindow() {
      this.dialogFormVisible2 = true
      this.handleAllGroups()
    },
    async handleAllGroups() {
      await api.GetAllGroups(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    async handleApplyGroup() {
      await api.StaffJoinGroup(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          console.log(res)
          ElMessage.success('加入成功')
        }
      })
    },
    async handleJoinGroup() {
      await api
        .ForceJoinGroup(this.choice, this.$cookies.get('satoken'))
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
            console.log(res)
          } else if (res.code === 200) {
            console.log(res)
            ElMessage.success('加入成功')
          }
        })
    },
    async handleQuitLogin() {
      await api.QuitLogin(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
          console.log(res)
        } else if (res.code === 200) {
          console.log(res)
          ElMessage.success('退出登录成功')
          this.$router.push('/login')
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
