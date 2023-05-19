<script setup></script>

<template>
  <div>
    <el-card v-loading="this.loading">
      <el-descriptions border column="1">
        <template #title>
          <h2 style="color: black">User Info</h2>
        </template>
        <template #extra>
          <el-button @click="handleUpdate">Update</el-button>
        </template>
        <el-descriptions-item label="Username">{{
          this.info.name
        }}</el-descriptions-item>
        <el-descriptions-item label="Telephone"
          ><span v-if="this.info.phoneNumber === null" style="color: grey"
            >please update your telephone number</span
          >
          <span v-else>{{ info.phoneNumber }}</span></el-descriptions-item
        >
        <el-descriptions-item label="Sex">
          <span v-if="this.info.sex === null" style="color: grey"
            >please update your sex</span
          >
          <span v-else>{{ this.num2sex(this.info.sex) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Bio"
          ><span v-if="info.bio === null" style="color: grey"
            >please update your bio</span
          >
          <span v-else>{{ this.info.bio }}</span></el-descriptions-item
        >
      </el-descriptions></el-card
    >

    <el-dialog v-model="this.dialogFormVisible" title="Update Info">
      <el-form :inline="true">
        <el-form-item label="phone number" :label-width="formLabelWidth">
          <el-input v-model="form.phoneNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Sex" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="Please select">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
            <el-option label="保密" value="保密" />
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
        <el-form-item label="bio" :inline="false" :label-width="formLabelWidth">
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
          <el-button type="primary" @click="UpdateInfo"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import api from '../../utils/api'
export default {
  async mounted() {
    this.getMyInfo()
  },
  data() {
    return {
      info: [],
      form: [],
      updateinfo: [],
      dialogFormVisible: false,
      loading: false,
    }
  },
  methods: {
    handleUpdate() {
      this.dialogFormVisible = true
    },
    async UpdateInfo() {
      this.dialogFormVisible = false
      this.loading = false
      await api
        .UpdateUserInfo(
          this.form.bio,
          this.form.phoneNumber,
          this.sex2num(this.form.sex),
          this.form.name,
          this.$cookies.get('satoken')
        )
        .then((res) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
          } else if (res.code === 500) {
            ElMessage.error(res.msg)
            return
          } else {
            Elmessage.error('unknown error')
            return
          }
        })

      this.getMyInfo()
    },
    num2sex(sex) {
      if (sex === 0) {
        return '男'
      } else if (sex === 1) {
        return '女'
      } else if (sex === 2) {
        return '保密'
      } else {
        return null
      }
    },
    sex2num(sex) {
      if (sex === '男') {
        return 0
      } else if (sex === '女') {
        return 1
      } else if (sex === '保密') {
        return 2
      } else {
        return null
      }
    },
    async getMyInfo() {
      this.loading = true
      await api
        .GetMyInfo($cookies.get('satoken'))
        .then((res) => {
          this.info = res.data
          this.form = JSON.parse(JSON.stringify(res.data))
          this.form.sex = this.num2sex(this.form.sex)
        })
        .catch((error) => {
          console.log(error)
        })
      this.loading = false
    },
  },
}
</script>
