
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
    <el-button @click="handleNewApplication">
            Apply for a Application
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
        <el-button link type="primary" size="small" @click="WidthdrawApplication">Withdraw this application</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-container>
  <el-dialog
    v-model="centerDialogVisible"
    title="Warning"
    width="30%"
    align-center>
    <span>Apply for a application</span>
    <el-form :model="form" label-width="120px">
    
    <el-form-item label="基金编号">
      <el-input v-model="form2.expenditureNumber" placeholder="Expenditure Number" />
    </el-form-item>

    <el-form-item label="申请名称">
      <el-input v-model="form2.abstrac" placeholder="abstract"/>        
    </el-form-item>
    <el-form-item label="类别">
        <el-select v-model="form2.cate" placeholder="Group name">
        <el-option
        v-for="(item) in categories"
        :key="item.groupName"
        :label="item.groupName"
        :value="item.groupName"
        >
      </el-option>
      </el-select> 
    </el-form-item>
    <el-form-item label="申请金额">
      <el-input v-model="form2.applyAmount" type="number" />
    </el-form-item>
    <el-form-item label="详细说明">
      <el-input v-model="form2.comment" type="number" />
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitApplication">
          Submit Application apply
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
    categories:["打印份","人工费"],
    centerDialogVisible:false,
    form :{
    expenditurename:"",
    expenditurenumber:"",
    beginTime1:"",beginTime2:"",
    endTime1:"",endTime2:"",
    groupName:"",
    totalamount:""
},
form2 :{
    abstrac,
    applyAmount, 
    cate, 
    comment, 
    expenditureNumber
},

    }
},methods:{
   handleNewApplication(){
        api.GetAllGroups(this.$cookies.get('satoken')).then((res) => {
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.options = res.data
        }
      })
        this.centerDialogVisible = true;
    },
    submitApplication() {
    try {
    const response = api.submitApplication(
        form2.abstrac, form2.applyAmount, this.form2.cate,form2.comment,form2.expenditureNumber,
        $cookies.get('satoken')
    )
    if (response.code === 200) {
        this.centerDialogVisible=false
        
    } else {
        console.log('error')
        console.log(response);
    }
    } catch (error) {
    console.error(error)
    }
},handleSelect(){

},
WidthdrawApplication(){
    this.centerDialogVisible=true;
}
},
mounted(){//get all the expenditures
    try {
    const response =  api.getAllExpend(
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