<script setup></script>

<template>
  <div>
    <el-card>
      <el-table :data="this.funds" style="width: 100%">
        <el-table-column prop="groupName" label="groupName" width="180" />
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
</template>

<script>
import api from '../../utils/api'
export default {
  async mounted() {
    this.getGroupFund()
  },
  data() {
    return {
      funds: [],
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
  },
}
</script>
