
    <!-- 申请founds，查看found申请状态 -->
<script setup>
import { useRoute } from 'vue-router'
import api from '../../utils/api.js'
import { ref } from 'vue'
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import { reactive, onMounted, inject } from 'vue'
const router = useRoute();
const $cookies = inject('$cookies');
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
        </el-menu>
      </el-header>
    <el-button @click="handleNewExpend">
            Apply for a expenditure
    </el-button>
        <!-- All expenditures in on table with button "check its application"-->
        <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="expenditureName" label="基金名称" width="120" />
    <el-table-column prop="expenditureNumber" label="基金编号" width="120" />
    <el-table-column prop="groupName" label="所属课题组" width="200" />
    <el-table-column prop="begintime" label="开始时间" width="120" />
    <el-table-column prop="endTime" label="结束时间" width="120" />
    <el-table-column prop="totalAmount" label="全部金额" width="600"/>
    <el-table-column prop="remainingAmount" label="剩余金额" width="600"/>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small">Check its applications </el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-container>
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
    <el-form-item label="Expenditure Number">
      <el-input v-model="form.expenditurenumber" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.groupName" placeholder="Group name">
        <el-option
        v-for="(item) in options"
        :key="item.groupName"
        :label="item.groupName"
        :value="item.groupName"
        >
      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Expected Start time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.beginTime1"
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
          v-model="form.beginTime2"
          placeholder="End date"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Expected end time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.endTime1"
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
          v-model="form.endTime2"
          placeholder="End date"
          style="width: 100%"
        />
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
    </div>

</template>

<script>
export default {
    data() {
        return {
    tableData :[{
    expenditureNumber: "NN30845KH",
    expenditureName: "national nature",
    groupName: "imed",
    begintime: '2016-05-03',
    endTime: '2016-05-09',
    totalAmount: 100000.0,
    remainingAmount: 98900.0,
    tag: '审核中',
    },],
    options: [],
    centerDialogVisible:false,
    form :{
    expenditurename:"",
    expenditurenumber:"",
    beginTime1:"",beginTime2:"",
    endTime1:"",endTime2:"",
    groupName:"",
    totalamount:""}
        }
},methods:{
   handleNewExpend(){
        api.GetAllGroups(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.options = res.data
        }
      })
        this.centerDialogVisible = true;
    },
    submitExpend() {
    try {
    const response = api.submitExpend(
        this.form.beginTime1.toString.toString()+this.form.beginTime2.toString(),
        this.form.endTime1.toString()+this.form.endTime2.toString(),
        this.form.expenditurename,
        this.form.expenditurenumber,
        this.form.totalamount,
        this.form.groupName,
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
},
onMounted(){//get all the expenditures
    try {
    const response =  api.getAllExpend(
        form.beginTime1.toString.toString()+form.beginTime2.toString(),
        form.endTime1.toString()+form.endTime2.toString(),
        form.expenditurename,
        form.expenditurenumber,
        form.totalamount,
        form.groupName,
        $cookies.get('satoken')
    )
    if (response.code === 200) {
        this.centerDialogVisible=false
        ElMessage.success("申请完成");
    } else {
        ElMessage.error("申请基金失败，请更改信息后重试");
        console.log('error')
    }
    } catch (error) {
    console.error(error)
}


}
}

</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
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