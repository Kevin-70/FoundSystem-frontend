<!-- 申请founds，查看found申请状态 -->
<script setup>
import { useRoute } from 'vue-router'
import api from '../../utils/api.js'
import { ref } from 'vue'
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import { reactive, onMounted, inject } from 'vue'
import {
  Check,
  Message,
  CircleClose,
  Plus,
  Search,
  Refresh,
} from '@element-plus/icons-vue'
const $cookies = inject('$cookies')
</script>
<template>
  <div class="common-layout">
    <el-container>
      <!-- All expenditures in on table with button "check its application"-->
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column
          prop="expenditureName"
          label="expenditureName"
          width="120" />
        <el-table-column
          prop="expenditureNumber"
          label="expenditureNumber"
          width="180" />
        <el-table-column prop="groupName" label="groupName" width="100" />
        <el-table-column
          prop="startTime"
          label="startTime"
          :formatter="formattedDate_starttime"
          width="180" />
        <el-table-column
          prop="endTime"
          label="endTime"
          width="180"
          :formatter="formattedDate_endtime" />
        <el-table-column prop="totalAmount" label="totalAmount" width="120" />
        <el-table-column
          prop="remainingAmount"
          label="remainingAmount"
          width="120" />
        <el-table-column prop="quota" label="quota" width="120">
        </el-table-column>
        <el-table-column prop="status" label="status" width="120" />
        <el-table-column v-if="isAdmin" label="Change Quota" width="120">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Refresh"
              circle
              @click="changeQuota(scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Create an application"
          width="200">
          <template #default="scope">
            <el-button
              :icon="Plus"
              type="primary"
              circle
              @click="CreateNewApplication(scope.row)"></el-button>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="Check Application" width="200">
          <template #default="scope">
            <el-button
              :icon="Search"
              type="primary"
              circle
              @click="CheckApplication(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-row>
      <el-col :span="4">
        <el-button @click="handleNewExpend" type="primary">
          Apply for a new expenditure
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button @click="handleReadTable" type="primary">
          Read applications from a table
        </el-button>
      </el-col>
    </el-row>
    <el-dialog
      v-model="centerDialogVisible"
      title="Apply for a Expenditure"
      width="30%"
      align-center>
      <el-form :model="form" label-width="200px">
        <el-form-item label="Expenditure Name">
          <el-input v-model="form.expenditurename" />
        </el-form-item>
        <el-form-item label="Expenditure Number">
          <el-input v-model="form.expenditurenumber" />
        </el-form-item>
        <el-form-item label="Group name">
          <el-select v-model="form.groupName" placeholder="Group name">
            <el-option
              v-for="item in options"
              :key="item.groupName"
              :label="item.groupName"
              :value="item.groupName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Expected Start time">
          <el-col :span="11">
            <el-date-picker
              v-model="form.beginTime1"
              type="date"
              placeholder="Start date"
              style="width: 100%" />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.beginTime2"
              placeholder="End date"
              style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="Expected end time">
          <el-col :span="11">
            <el-date-picker
              v-model="form.endTime1"
              type="date"
              placeholder="Start date"
              style="width: 100%" />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.endTime2"
              placeholder="End date"
              style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="Total Amount">
          <el-input v-model="form.totalamount" type="number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitExpend">
            Submit Expenditure apply
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="appDialogVisible"
      title="Apply for a application"
      width="30%"
      align-center>
      <el-form :model="form2" label-width="120px">
        <el-form-item label="Expenditure Number">
          <el-input
            v-model="form2.expenditureNumber"
            placeholder="Expenditure Number" />
        </el-form-item>
        <el-form-item label="Abstract">
          <el-input v-model="form2.abstrac" placeholder="abstract" />
        </el-form-item>
        <el-form-item label="Categories">
          <el-cascader
            v-model="form2.cate"
            :options="categories"
            @change="handleCate"></el-cascader>
        </el-form-item>
        <el-form-item label="Apply Amount">
          <el-input v-model="form2.applyAmount" type="number" />
        </el-form-item>
        <el-form-item label="Comment">
          <el-input v-model="form2.comment" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="appDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitApplication">
            Submit Application apply
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="readDialogVisible"
      title="Read applications from a table file"
      width="30%"
      align-center>
      <el-upload
        class="upload-demo"
        :auto-upload="false"
        :action="actionUrl"
        :on-remove="handleRemove"
        :on-change="(file, fileList) => handleChange(file, fileList)"
        :limit="1"
        :on-exceed="handleExceed"
        accept=".xlsx"
        :file-list="fileList">
        <el-button size="small" type="primary">upload</el-button>
        <div slot="tip" class="el-upload__tip">
          once a .xlsx file && no more than 500kb
        </div>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="readDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitApplicationTable">
            Submit Applications
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="quotaDiaglogVisible"
      title="change quota for one expenditure"
      width="30%"
      align-center>
      <el-input v-model="form3.quotaSet" type="number" placeholder="qouta">
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="quotaDiaglogVisible = false">Cancel</el-button>
          <el-button @click="submitQuotaModify()"> submit </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { toRaw } from 'vue'
export default {
  name: 'expenditure',
  data() {
    return {
      quotaDiaglogVisible: false,
      isAdmin: false,
      form3: {
        quotaSet: 0,
        expenditureNumber: '',
      },
      tableData: [
        {
          expenditureNumber: 'NN30845KH',
          expenditureName: 'national nature',
          groupName: 'imed',
          begintime: '2016-05-03',
          endTime: '2016-05-09',
          totalAmount: 100000.0,
          remainingAmount: 98900.0,
          status: 'Unread',
          tag: 'processing',
        },
      ],
      options: [],
      categories: [
        {
          value: 'Office',
          label: 'Office',
          children: [
            {
              value: 'officeSupplies',
              label: 'officeSupplies',
            },
            {
              value: 'pen',
              label: 'pen',
            },
            {
              value: 'notebook',
              label: 'notebook',
            },
          ],
        },
        {
          value: 'Print',
          label: 'Print',
          children: [
            {
              value: 'print',
              label: 'print',
            },
            {
              value: 'paper',
              label: 'paper',
            },
          ],
        },
        {
          value: 'Postage',
          label: 'Postage',
          children: [
            {
              value: 'postage',
              label: 'postage',
            },
            {
              value: 'telephone',
              label: 'telephone',
            },
          ],
        },
        {
          value: 'Train',
          label: 'Train',
          children: [
            {
              value: 'train',
              label: 'train',
            },
          ],
        },
      ],
      centerDialogVisible: false,
      form: {
        expenditurename: '',
        expenditurenumber: '',
        beginTime1: '',
        beginTime2: '',
        endTime1: '',
        endTime2: '',
        groupName: '',
        totalamount: '',
      },
      appDialogVisible: false,
      form2: {
        abstrac: '',
        applyAmount: '',
        cate: 'First level category/Second level category',
        comment: '',
        expenditureNumber: '',
      },
      readDialogVisible: false,
      loading: true,
      fileList: [],
      actionUrl: 'https://jsonplaceholder.typicode.com/posts/', //上传文件url https://jsonplaceholder.typicode.com/posts/
    }
  },
  methods: {
    formattedDate_starttime(originalDate) {
      const date = new Date(String(originalDate.startTime))
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      console.log(originalDate)
      return date.toLocaleString('en-US', options)
    },
    formattedDate_endtime(originalDate) {
      const date = new Date(String(originalDate.endTime))
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      console.log(originalDate)
      return date.toLocaleString('en-US', options)
    },
    handleNewExpend() {
      api.getOneUserGroups(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.options = res.data
        }
      })
      this.centerDialogVisible = true
    },
    submitExpend() {
      try {
        let time1 =
          this.form.beginTime1
            .toLocaleString()
            .toLocaleString('zh')
            .split(' ')[0]
            .replaceAll('/', '-') +
          ' ' +
          this.form.beginTime2.toLocaleString().split(' ')[1]
        this.form.beginTime2.toLocaleString('zh').split(' ')[1]
        let time2 =
          this.form.endTime1
            .toLocaleString()
            .toLocaleString('zh')
            .split(' ')[0]
            .replaceAll('/', '-') +
          ' ' +
          this.form.endTime2.toLocaleString().split(' ')[1]
        this.form.endTime2.toLocaleString('zh').split(' ')[1]
        const response = api.submitExpend(
          time1,
          time2,
          this.form.expenditurename,
          this.form.expenditurenumber,
          this.form.totalamount,
          this.form.groupName,
          $cookies.get('satoken')
        )
        response.then((res) => {
          if (res.code === 200) {
            this.centerDialogVisible = false
            ElMessage.success('Successfully applied')
          } else {
            console.log('error')
            console.log(res)
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    submitApplication() {
      try {
        let cate1 = toRaw(this.form2.cate)[0]
        let cate2 = toRaw(this.form2.cate)[1]
        console.log(cate1, cate2)
        const response = api.submitApplication(
          this.form2.abstrac,
          this.form2.applyAmount,
          cate1,
          cate2,
          this.form2.comment,
          this.form2.expenditureNumber,
          $cookies.get('satoken')
        )
        response.then((res) => {
          if (res.code === 200) {
            this.appDialogVisible = false
            // this.$router.push('/staff/' + res.data)
            ElMessage.success('Successfully applied')
            this.appDialogVisible = false
          } else {
            ElMessage.error(res.msg)
            console.log(res)
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    handleCate() {
      console.log(this.form2.cate)
    },
    handleReadTable() {
      this.readDialogVisible = true
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    submitApplicationTable() {
      let formData = new FormData()
      console.log(this.fileList[0].raw)
      formData.append('uploadFile', this.fileList[0].raw)
      console.log(
        formData.get('uploadFile').type,
        formData.get('uploadFile').size
      )
      //     formData.append("test", 'value');console.log(formData.get("test"));
      console.log(formData)
      const response = api.uploadFile(formData, $cookies.get('satoken'))
      response.then((res) => {
        if (res.code == 200) {
          ElMessage.success('Successfully upload!')
          this.appDialogVisible = true
        } else {
          console.log(res)
          ElMessage.warning('upload failed')
        }
      })
    },
    CreateNewApplication(row) {
      this.form2.expenditureNumber = row.expenditureNumber
      this.appDialogVisible = true
    },
    CheckApplication(row) {
      this.$router.push('/expenditureShow/' + row.expenditureNumber)
    },
    changeQuota(row) {
      this.quotaDiaglogVisible = true
      this.form3.expenditureNumber = row.expenditureNumber
    },
    submitQuotaModify() {
      const response = api.ChangeQuota(
        this.form3.quotaSet,
        this.form3.expenditureNumber,
        $cookies.get('satoken')
      )
      response.then((res) => {
        if (res.code == 200) {
          ElMessage.success('Successfully change quota!')
          this.quotaDiaglogVisible = true
        } else {
          console.log(res)
          ElMessage.warning('change quota failed')
        }
      })
    },
  },
  mounted() {
    //get all the expenditures
    const ident1 = api.getMyIdentity($cookies.get('satoken'))
    ident1.then((res) => {
      console.log(res.data)
      if (res.code === 200) {
        if (res.data !== 0) {
          this.isAdmin = true
          console.log('yes')
        }
      } else {
      }
    })
    const response = api.getAllExpend($cookies.get('satoken'))
    response.then((res) => {
      if (res.code === 200) {
        this.tableData = res.data
        this.loading = false
      } else {
        ElMessage.error(res.data)
      }
    })
  },
}
</script>
