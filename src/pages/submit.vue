<script lang="ts" setup>
import { ref } from 'vue'
// import { Sunny, Moon } from '@element-plus/icons-vue'

const activeIndex = ref('1')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
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
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3">Info</el-menu-item>
          <!-- <el-menu-item index="4">
            <client-only
              ><el-switch
                v-model="light_style"
                class="ml-2"
                size="large"
                inline-prompt
                :active-icon="Sunny"
                :inactive-icon="Moon"
                style="
                  --el-switch-on-color: #fbc2eb;
                  --el-switch-off-color: #000;
                "
            /></client-only>
          </el-menu-item> -->
        </el-menu>
      </el-header>
      <el-main>
        <div></div>
      </el-main>
      <el-footer style="color: #000">Powered By Vue @SE黑奴 2023</el-footer>
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>
</template>
<!-- <script>
export default{
    data(){
        return{
            writeable:false
        }
    }
}
</script> -->

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
