
    <!-- 申请founds，查看found申请状态 -->
<script setup>
import { useRoute } from 'vue-router'
import api from '../../utils/api_app.js'
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { reactive, onMounted, inject } from 'vue'
let centerDialogVisible = ref(false)
const form = reactive({
    expenditurename:"",
    expenditurenumber:"",
    beginTime:"",
    endTime:"",
    groupName:"",
    totalamount:""
});
const router = useRoute();
const $cookies = inject('$cookies');
async function submitExpend() {
    try {
    const response = await api.submitExpend(
        form.beginTime,
        form.endTime,
        form.expenditurename,
        form.expenditurenumber,
        form.totalamount,
        form.groupName,
        $cookies.get('satoken')
    )
    if (response.code === 200) {
        this.centerDialogVisible=false
        
    } else {
        console.log('error')
    }
    } catch (error) {
    console.error(error)
    }
}
</script>
<template>
    <div>
    <el-button @click="centerDialogVisible=true">
            Apply for a expenditure
    </el-button>
        <!-- All expenditures in on table with button "check its application"-->
        <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="expenditureName" label="基金名称" width="120" />
    <el-table-column prop="expenditureNumber" label="基金编号" width="120" />
    <el-table-column prop="groupName" label="所属课题组" width="200" />
    <el-table-column prop="startTime" label="开始时间" width="120" />
    <el-table-column prop="endTime" label="结束时间" width="600" />
    <el-table-column prop="totalAmount" label="全部金额" width="600"/>
    <el-table-column prop="remainingAmount" label="剩余金额" width="600"/>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small">Check its applications </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="centerDialogVisible"
    title="Warning"
    width="30%"
    align-center>
    <span>Apply for a Expenditure</span>
    <el-form :model="form" label-width="120px">
    <el-form-item label="Expenditure name">
      <el-input v-model="form.expenditurename" />
    </el-form-item>
    <el-form-item label="Please fill the Expenditure Number">
      <el-input v-model="form.expenditurenumber" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.groupName" placeholder="please select your group name">
        <el-option label="Group one" value="shanghai" />
        <el-option label="Group two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Expected Remaining time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.beginTime"
          type="date"
          placeholder="Start date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.endTime"
          placeholder="End date"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Activity form">
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
    </div>

</template>

<script>
export default {
    data() {
        return {
    form,
    tableData :[{
    expenditureNumber: "NN30845KH",
    expenditureName: "national nature",
    groupName: "imed",
    begintime: '2016-05-03',
    endTime: '2016-05-09',
    totalAmount: 100000.0,
    remainingAmount: 98900.0,
    tag: '审核中',
    },]

        }
    },
}

</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>