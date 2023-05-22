<script setup>
import graphHelper from '../../utils/graphHelper'
</script>

<template>
  <div>
    <el-card>
      <el-table :data="this.funds" style="width: 100%">
        <el-table-column
          prop="expenditureNumber"
          label="expenditureNumber"
          width="180" />
        <el-table-column
          prop="expenditureName"
          label="expenditureName"
          width="180" />
        <el-table-column prop="startTime" label="startTime" width="200" />
        <el-table-column prop="endTime" label="endTime" width="200" />
        <el-table-column prop="status" label="status" width="180" />
        <el-table-column prop="totalAmount" label="totalAmount" width="180" />
        <el-table-column
          prop="remainingAmount"
          label="remainingAmount"
          width="180" />
      </el-table>
    </el-card>
  </div>

  <div>
    <PieGraph
      v-if="this.pieShow"
      :width="'900px'"
      :height="'600px'"
      :name="'expenditure proportion'"
      :dataName="this.pieInfo.name"
      :data="this.pieInfo.values"></PieGraph>
  </div>
</template>

<script>
import api from '../../utils/api'
export default {
  async mounted() {
    this.getGroupFund().then(() => {
      console.log("ready to update pie")
      this.updatePie()
      console.log("mounted")
    })
  },
  data() {
    return {
      funds: [],
      pieInfo: { catagory: [], values: [] },
      pieShow: false,
    }
  },
  methods: {
    async getGroupFund() {
      await api
        .GetGroupExpenditure(
          this.$cookies.get('satoken'),
          this.$route.params.groupName
        )
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error('Get fund of ' + groupName + ' error: ' + res.msg)
          } else if (res.code === 200) {
            this.funds = res.data
          } else {
            ElMessage.error('Unknown error')
          }
        })
    },
    updatePie() {
      console.log("update pie")
      this.pieInfo = graphHelper.getGroupExpendurePie(this.funds)
      if(this.pieInfo.name.length !== 0) {
        this.pieShow = true
        console.log("pie show") 
      }
      
    },
  },
}
</script>
