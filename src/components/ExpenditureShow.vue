<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import api from '../utils/api'
import graphHelper from '../utils/graphHelper'
import BarGraph from "@/components/BarGraph.vue";
const route = useRoute()
const $cookies = inject('$cookies')
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const info = reactive({
  expenditureNumber: '',
  expenditureName: '',
  groupName: '',
  totalAmount: 0,
  remainingAmount: 0,
  startTime: '',
  endTime: '',
  quota: 0,
  applications: [],
  x_data: [],
  y_data: []
})

// const expenditures = ref([])
// const handleSelect = (key, keyPath) => {
//   console.log(key, keyPath)
// }
onMounted(async () => {
  await api
    // .GetUserInfo(route.params.email, $cookies.get('satoken'))
    .GetOneExpenditureAllInfo(
      $cookies.get('satoken'), 
      route.params.expenditureNumber
    )
    .then((res) => {
      if(res.code === 200){
        info.expenditureName = res.data.expenditureName
        info.expenditureNumber = res.data.expenditureNumber
        info.groupName = res.data.groupName
        info.totalAmount = res.data.totalAmount
        info.remainingAmount = res.data.remainingAmount
        info.startTime = res.data.startTime
        info.endTime = res.data.endTime
        info.quota = res.data.quota
        info.applications = res.data.applications
        console.log(info.applications)
        console.log("update info")
      }else{
        console.error(res)
        ElMessage.error(res.msg)
      }
    })
    .catch((error) => {
      console.log(error)
    })

   info.x_data, info.y_data = graphHelper.applications2Line(info.applications)
   console.log(info.x_data)

})
</script>

<template>
  <div class="common-layout">
    <el-container>  
      <el-main>
        <div>
          <el-row :gutter="15">
            <el-col :span="10" :push="1">
              <el-descriptions border column="1">
                <template #title>
                  <h2 style="color: white">Expenditure Info</h2>
                </template>
                
                <el-descriptions-item label="Expenditure Number">{{
                  info.expenditureNumber
                }}</el-descriptions-item>
                <el-descriptions-item label="Expenditure Name">{{
                  info.expenditureName
                }}</el-descriptions-item>
                <el-descriptions-item label="Group Name">{{
                  info.groupName
                }}</el-descriptions-item>
                <el-descriptions-item label="Total Amount">{{
                  info.totalAmount
                }}</el-descriptions-item>
                <el-descriptions-item label="Remaining Amount">{{
                  info.remainingAmount
                }}</el-descriptions-item>
                <el-descriptions-item label="Start Time">{{
                  info.startTime
                }}</el-descriptions-item>
                <el-descriptions-item label="End Time">{{
                  info.endTime
                }}</el-descriptions-item>
                <el-descriptions-item label="Quota">{{
                  info.quota
                }}</el-descriptions-item>
              </el-descriptions>
            </el-col>
          </el-row>

          <div>
            <el-table
              :data=info.applications
              style="width: 100%">
              <el-table-column
                prop="userName"
                label="User Name"
                width="180">
              </el-table-column>
              <el-table-column
                prop="availAmount"
                label="Avail Amount"
                width="180">
              </el-table-column>
              <!-- <el-table-column
                prop="appId"
                label="appId"
                width="180">
              </el-table-column> -->
              <!-- <el-table-column
                prop="expendId"
                label="expendId"
                width="180">
              </el-table-column> -->
              <!-- <el-table-column
                prop="expendName"
                label="expendName"
                width="180">
              </el-table-column> -->
              <!-- <el-table-column
                prop="groupName"
                label="groupName"
                width="180">
              </el-table-column> -->
              <!-- <el-table-column
                prop="totalAmount"
                label="totalAmount"
                width="180">
              </el-table-column> -->
              <el-table-column
                prop="remainAmount"
                label="Remain Amount"
                width="180">
              </el-table-column>
              
              <!-- <el-table-column
                prop="userId"
                label="userId"
                width="180">
              </el-table-column> -->
              
              <el-table-column
                prop="expendCategory"
                label=" Category"
                width="180">
              </el-table-column>
              <el-table-column
                prop="appAbstract"
                label="Abstract"
                width="180">
              </el-table-column>
              <el-table-column
                prop="comment"
                label="comment"
                width="180">
              </el-table-column>
              <el-table-column
                prop="status"
                label="status"
                width="180">
              </el-table-column>
              <el-table-column
                prop="type"
                label="type"
                width="180">
              </el-table-column>
            </el-table>
       </div>
        </div>
        
        <bar-graph 
        :width="'900px'" :height="'600px'" 
        :x_data=info.x_data
        :y_data=info.y_data

        ></bar-graph>
        <!-- <div v-for="item in info.applications" :key="item.value">
          {{ item.appId }}
        </div> -->
        
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
      // applications: [],
    }
  },
  methods: {
    error(message) {
        this.$message(message);
    },
    
  },
  components: {
    BarGraph
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

</style>
