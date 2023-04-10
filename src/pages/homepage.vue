<script setup>
import { ref, reactive, onMounted, inject, VueElement } from 'vue'
import { useRoute } from 'vue-router'
// import { Sunny, Moon } from '@element-plus/icons-vue'
import api from '../utils/api'
const router = useRoute()
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
  phoneNumber: '',
})
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
onMounted(async () => {
  await api
    .GetUserInfo(router.params.email, $cookies.get('satoken'))
    .then((res) => {
      info.name = res.data.name
      info.sex = res.data.sex
      info.bio = res.data.bio
      info.phoneNumber = res.data.phoneNumber
    })
})
async function UpdateInfo() {
  try {
    const response = await api.UpdateUserInfo(
      form.bio,
      form.phoneNumber,
      form.sex,
      $cookies.get('satoken')
    )
    dialogFormVisible.value = false
    if (response.code === 200) {
      const res = await api.GetUserInfo(
        router.params.email,
        $cookies.get('satoken')
      )
      info.sex = res.data.sex
      info.bio = res.data.bio
      info.phoneNumber = res.data.phoneNumber
      form.sex = ''
      form.bio = ''
      form.phoneNumber = ''
    } else {
      console.log('error')
    }
  } catch (error) {
    console.error(error)
  }
}
// return {
//   dialogFormVisible,
//   formLabelWidth,
//   info,
//   form,
//   activeIndex,
//   handleSelect,
//   UpdateInfo,
// }
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
          <!-- <el-menu-item index="2">Group Info</el-menu-item> -->
          <!-- <el-sub-menu index="3">
            <template #title>Workspace</template>
            <el-menu-item index="3-1">item one</el-menu-item>
            <el-menu-item index="3-2">item two</el-menu-item>
            <el-menu-item index="3-3">item three</el-menu-item>
          </el-sub-menu> -->
          <!-- <el-menu-item index="4">
            <client-only
              ><el-switch
                v-model="light_style"
                class="ml-2"
                size="large"
                inline-prompt
                :active-icon="Sunny"
                :inactive-icon="Moon"
                style="
                  --el-switch-on-color: #fbc2eb;
                  --el-switch-off-color: #000;
                "
            /></client-only>
          </el-menu-item> -->
        </el-menu>
      </el-header>
      <el-main >
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
                <!-- <el-descriptions-item label="School">
                  <el-tag>Sustech</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Address"
                  >Example Address..</el-descriptions-item
                > -->
              </el-descriptions>
            </el-col>
          </el-row>
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
                label="bio"
                :inline="false"
                :label-width="formLabelWidth">
                <el-input
                  v-model="form.bio"
                  maxlength="200"
                  placeholder="Please input"
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

          <el-button @click="dialogFormVisible2=true">Join Research Group</el-button>
          <el-dialog v-model="dialogFormVisible2" title="Join Group">

            <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible2 = false">Confirm</el-button>
                </span>
              </template>
          </el-dialog>
        </div>
      </el-main>
      <el-footer style="color: #000">Powered By Vue @SE黑奴 2023</el-footer>
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>
</template>
<script>
export default {
    data(){
        return {
        dialogFormVisible:false,
        dialogFormVisible2:false,
        }
    }
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
</style>
