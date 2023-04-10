<template>
  <div class="common-layout">
    <el-container>
      <el-main class="notfound-main">
        <el-space direction="vertical">
          <el-text class="notfound-text" truncated> Not Found </el-text>
        </el-space>
      </el-main>
      <el-footer style="color: #000">Powered By Vue @SE黑奴 2023</el-footer>
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>
</template>

<style>
.el-container {
  height: 100%;
  width: 100%;
  position: fixed;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.notfound-main {
  align-self: center;
}
.notfound-text {
  font-size: 200px;
  font-weight: 200;
}
</style>
