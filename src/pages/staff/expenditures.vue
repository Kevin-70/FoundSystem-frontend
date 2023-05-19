
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
    <el-button @click="handleNewExpend" type="primary">
            Apply for a new expenditure
    </el-button>
    <el-button @click="handleReadTable">
            Read applications from a table
    </el-button>
        <!-- All expenditures in on table with button "check its application"-->
        <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="expenditureName" label="基金名称" width="120" />
    <el-table-column prop="expenditureNumber" label="基金编号" width="120" />
    <el-table-column prop="groupName" label="所属课题组" width="200" />
    <el-table-column prop="startTime" label="开始时间" width="120" />
    <el-table-column prop="endTime" label="结束时间" width="120" />
    <el-table-column prop="totalAmount" label="全部金额" width="120"/>
    <el-table-column prop="remainingAmount" label="剩余金额" width="120"/>
    <el-table-column prop="quota" label="限额" width="120"/>
    <el-table-column prop="status" label="审核状态" width="120"/>
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="scope" >
        <el-button link type="primary" size="small" @click="CreateNewApplication(scope.row)">Create an application</el-button>
        <el-button link type="primary" size="small" @click="CheckApplication(scope.row)">Check its info</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-container>
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
  <el-dialog
    v-model="appDialogVisible"
    title="Apply for a application"
    width="30%"
    align-center>
    <el-form :model="form2" label-width="120px">
    <el-form-item label="基金编号">
      <el-input v-model="form2.expenditureNumber" placeholder="Expenditure Number"  />
    </el-form-item>

    <el-form-item label="申请摘要">
      <el-input v-model="form2.abstrac" placeholder="abstract"/>        
    </el-form-item>
    <el-form-item label="使用金额类别">
        <el-select v-model="form2.cate" placeholder="types of funds">
        <el-option
        v-for="(item) in categories"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
      </el-select> 
    </el-form-item>
    <el-form-item label="申请金额">
      <el-input v-model="form2.applyAmount" type="number" />
    </el-form-item>
    <el-form-item label="申请详细说明">
      <el-input v-model="form2.comment" type="textarea"  />
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
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-remove="handleRemove"
  :on-preview="handlePreview"
  :on-change="handlChange"
  multiple
  :limit="1"
  :on-exceed="handleExceed"
  accept=".xlsx,.xls,.csv"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传一个.csv文件,且不超过500kb</div>
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
    status:"Unread",
    tag: '审核中',
    },],
    options: [],
    categories:["1","2"],
    centerDialogVisible:false,
    form :{
    expenditurename:"",
    expenditurenumber:"",
    beginTime1:"",beginTime2:"",
    endTime1:"",endTime2:"",
    groupName:"",
    totalamount:""
    },  
    appDialogVisible:false,
    form2 :{
    abstrac:"",
    applyAmount:"", 
    cate:"", 
    comment:"", 
    expenditureNumber:""
},  readDialogVisible:false,
fileList:[]
}
},methods:{
   handleNewExpend(){
        api.getOneUserGroups(this.$cookies.get('satoken')).then((res) => {
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
        let time1=this.form.beginTime1.toLocaleString().split(" ")[0].replaceAll("/","-")+" "+this.form.beginTime2.toLocaleString().split(" ")[1];
        let time2=this.form.endTime1.toLocaleString().split(" ")[0].replaceAll("/","-")+" "+this.form.endTime2.toLocaleString().split(" ")[1];
        const response = api.submitExpend(
        time1,
        time2,
        this.form.expenditurename,
        this.form.expenditurenumber,
        this.form.totalamount,
        this.form.groupName,
        $cookies.get('satoken')
    )
    response.then((res)=>{
        if (res.code === 200) {
        this.centerDialogVisible=false
        ElMessage.success("发起申请成功");
    } else {
        console.log('error')
        console.log(res);
    }})
    } catch (error) {
    console.error(error)
    }
},submitApplication() {
    try {
    const response = api.submitApplication(
        this.form2.abstrac, this.form2.applyAmount, this.form2.cate,this.form2.comment,this.form2.expenditureNumber,
        $cookies.get('satoken')
    )
    response.then((res)=>{
        if (res.code === 200) {
        this.appDialogVisible=false;
        ElMessage.success("申请完成");
        } else {
        ElMessage.error("申请发起失败，请更改信息后重试");
        console.log(res);
        }
    })
    } catch (error) {
    console.error(error)
    }
},

handleSelect(){
    const response =  api.getMyEmail(
        $cookies.get('satoken')
    )
    response.then((res)=>{
    if (res.code === 200) {
        this.$router.push("/staff/"+res.data);
    } else {
        ElMessage.error("身份过期返回主页失败")
        console.log(res)
    }})
    this.$router.push("/staff/"+email);
},
handleReadTable(){this.readDialogVisible=true;},
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        ElMessage.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleRemove(file, fileList) {
         this.fileList = fileList;
      },
      handlChange(file, fileList) {
         this.fileList = fileList;
      },
submitApplicationTable(){
    console.log(this.fileList[0])
},
 CreateNewApplication(row){
    this.form2.expenditureNumber=row.expenditureNumber
    this.appDialogVisible=true;
},
CheckApplication(row){
    this.$router.push("/expenditureShow/"+row.expenditureNumber)
}
},
mounted(){//get all the expenditures
    const response =  api.getAllExpend(
        $cookies.get('satoken')
    )
    response.then((res)=>{
    if (res.code === 200) {
        this.tableData=res.data;
        console.log(this.tableData)  
    } else {
        ElMessage("加载基金信息失败")
        console.log(res)
    }
})

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