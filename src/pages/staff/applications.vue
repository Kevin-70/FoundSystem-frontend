<script setup>
import { ref } from 'vue'
// import { Sunny, Moon } from '@element-plus/icons-vue'

const activeIndex = ref('1')

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="common-layout">
    <label>expenditure name:{{ name }}</label>
    <el-button name="Back to all expenditures"></el-button>
    <el-button name="create a new applications"></el-button>
    <!-- All ap in on table with button "create a application"-->
    <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
    <template #default>
    <el-button link type="primary" size="small" onclick="handleEdit">Edit this application </el-button>
    </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
        name:"exp1",
      writeable: false,
    }
},methods:{
        handleEdit(){

        }
    }
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
</style>
