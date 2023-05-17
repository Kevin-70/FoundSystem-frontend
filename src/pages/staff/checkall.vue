<script setup>
import { ref } from 'vue'
// import { Sunny, Moon } from '@element-plus/icons-vue'

const activeIndex = ref('1')

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<template>
    <!-- 一级目录是founds，需要根据当前的found查询下其的applications
    并且1、查询申请的状态（审批中、申请已成功、申请已退回）
        2、点击“提交申请”提交申请，并且进入submit界面 -->
</template>
<script>

</script>

<style>
</style>