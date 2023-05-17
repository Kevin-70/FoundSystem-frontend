<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import api from '../utils/api'
const route = useRoute()
const $cookies = inject('$cookies')
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const info = reactive({
  expenditureNumber: "",
  expenditureName: "",
  groupName: "",
  totalAmount: 0,
  remainingAmount: 0,
  startTime: "",
  endTime: "",
  quota: 0,
  applications: []
})

const fundings = ref([])
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
onMounted(async () => {
  
  
})


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
        <el-menu-item index="2"><el-button @click="handleQuitLogin">退出登录</el-button></el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        
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
      
    }
  },
  methods: {
    async handleQuitLogin() {
      await api
        .QuitLogin( this.$cookies.get('satoken'))
        .then((res) => {
          if (res.code === 500) {
            ElMessage.error(res.msg)
            console.log(res)
          } else if (res.code === 200) {
            console.log(res)
            ElMessage.success('退出登录成功')
            this.$router.push("/login")
          }
        })
    },
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
.box-card {
  width: 480px;
}
</style>
