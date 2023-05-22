<script setup>
import { Check, Message, CircleClose } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus/es'
import { ref, reactive, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import api from '../utils/api'
import graphHelper from '../utils/graphHelper'
import BarGraph from '@/components/BarGraph.vue'
import PieGraph from '@/components/PieGraph.vue'

// import componentLazy from "@/components/componentLazy.vue"
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
  createdDate: '',
  x_data: [],
  y_data: [],
  catagoryInfo: {name: [], values: []},
})
const dataState = reactive({
  ifDataUpdated: false,
  PieUpdate: false,
})

onMounted(async () => {
  await api
    .GetOneExpenditureAllInfo(
      $cookies.get('satoken'),
      route.params.expenditureNumber
    )
    .then((res) => {
      if (res.code === 200) {
        info.expenditureName = res.data.expenditureName
        info.expenditureNumber = res.data.expenditureNumber
        info.groupName = res.data.groupName
        info.totalAmount = res.data.totalAmount
        info.remainingAmount = res.data.remainingAmount
        info.startTime = res.data.startTime
        info.endTime = res.data.endTime
        info.quota = res.data.quota
        info.applications = res.data.applications
        // console.log(info.applications)
        // console.log("update info")
      } else {
        console.error(res)
        ElMessage.error(res.msg)
      }
    })
    .catch((error) => {
      console.log(error)
    })

  info.y_data = graphHelper.applications2LineY(info.applications)
  info.x_data = graphHelper.applications2LineX(info.applications)
  dataState.ifDataUpdated = true

  info.catagoryInfo = graphHelper.getCatagoryPie(info.applications)
  console.log(info.catagoryInfo.name)
  dataState.PieUpdate = true

})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          :default-active="this.activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-menu-item index="Back">Back</el-menu-item>
          <el-menu-item index="Base Info">Base Info</el-menu-item>
          <el-menu-item index="Applications">Applications</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <div>
          <el-row>
            <el-col :span="12">
              <el-row :gutter="15" v-if="this.activeIndex === 'Base Info'">
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
            </el-col>
            <el-col :span="12">
              <PieGraph
                v-if="
                  dataState.ifDataUpdated && this.activeIndex === 'Base Info'
                "
                :width="'900px'"
                :height="'600px'"
                :dataName="['Remaining Amount', 'Used Amount']"
                :name="'Expenditure usage'"
                :data="[info.remainingAmount, info.totalAmount-info.remainingAmount]"></PieGraph>
            </el-col>
          </el-row>
          <div>
            <el-table
              v-if="this.activeIndex === 'Applications'"
              :data="info.applications"
              height="400"
              style="width: 100%">
              <el-table-column prop="userName" label="User Name" width="180">
              </el-table-column>
              <el-table-column
                prop="appAmount"
                label="Apply Amount"
                width="180">
              </el-table-column>

              <el-table-column
                prop="expendCategory"
                label=" Category"
                width="180">
              </el-table-column>
              <el-table-column prop="appAbstract" label="Abstract" width="180">
              </el-table-column>
              <el-table-column prop="comment" label="comment" width="180">
              </el-table-column>
              <el-table-column prop="status" label="status" width="180">
              </el-table-column>
              <el-table-column prop="type" label="type" width="180">
              </el-table-column>
              <el-table-column
                prop="createdDate"
                label="createdDate"
                width="180">
              </el-table-column>

              <el-table-column fixed="right" label="Feedback" width="90">
                <template #default="scope">
                  <el-button
                    type="primary"
                    :icon="Message"
                    circle
                    @click="this.handleFeedback(scope.row.appId)" />
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="Withdraw" width="90">
                <template #default="scope">
		            <el-button 
                    v-if="scope.row.status=='Unread'" 
                    :icon="CircleClose"
                    circle
                    type="danger" 
                    @click="WithdrawApp(scope.row.appId)">
                </el-button>
	            </template>
              </el-table-column>
            </el-table>

            <PieGraph
                v-if="dataState.PieUpdate && this.activeIndex === 'Applications'"
                :width="'900px'" :height="'400px'" 
                :name="'catagory proportion'"
                :dataName="info.catagoryInfo.name"
                :data="info.catagoryInfo.values"
            ></PieGraph>
            <BarGraph 
              v-if="dataState.ifDataUpdated && this.activeIndex === 'Applications'"
              :name="'Application Trend'"
              :width="'900px'" :height="'400px'" 
              :x_data="info.x_data" 
              :y_data="info.y_data" >
            </BarGraph>


         <!-- <el-row>
          <el-col :span="12">
            <BarGraph 
              v-if="dataState.ifDataUpdated && this.activeIndex === 'Applications'"
              :name="'Application Trend'"
              :width="'900px'" :height="'400px'" 
              :x_data="info.x_data" 
              :y_data="info.y_data" >
            </BarGraph>
          </el-col>
          <el-col :span="12">
            <PieGraph
                v-if="dataState.ifDataUpdated && this.activeIndex === 'Applications'"
                :width="'900px'" :height="'400px'" 
                :name="'catagory proportion'"
                :dataName="info.catagoryInfo.name"
                :data="info.catagoryInfo.values"
            ></PieGraph>     
          </el-col>
        </el-row> -->
          </div>
        </div>
       
              <!-- <div class="component"> -->
                
              <!-- </div> -->
              <!-- <div class="component"> -->
                
              <!-- </div> -->



      </el-main>
      <el-footer style="color: #000">Powered By Vue @SE 2023</el-footer>
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>

  <el-dialog v-model="dialogVisible" 
                    title="Feedback" >
            <div>
              <span>{{ this.feedBack }}</span>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                  Confirm
                </el-button>
              </span>
        </template>
        </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 'Base Info',
      dialogVisible: false,
      feedBack: "",
      
    }
  },
  methods: {
    error(message) {
      this.$message(message)
    },
    handleSelect(key) {
      this.activeIndex = key
    },
    back() {
      this.$router.go(-1)
    },
    async handleFeedback(AppId) {
      console.log("handleFeedback")
      console.log(AppId) 
      await api.getFeedBackByAppId(
        this.$cookies.get('satoken'),
        AppId).then((res) => {
          console.log(res)
        if (res.code === 500) {
          ElMessage.error(res.msg)
        } else if (res.code === 200) {
          this.feedBack = res.data.comment
          this.dialogVisible = true 
          console.log(res.data.comment)
        }
      })
    },
  },
  components: {
    BarGraph,
  },
}
</script>

<style>
.container {
  display: flex;
}

.component {
  flex: 1;
  border-bottom: 1px solid black;
  padding: 10px;
}

</style>
