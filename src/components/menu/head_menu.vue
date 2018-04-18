<template>
  <div class="head-menu">
    <div class="head-menu-inner w">
      <el-menu
      class="head-menu"
      mode="horizontal"
      background-color="#409EFF"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-menu-item index="1">项目管理中心</el-menu-item>
      <el-menu-item index="2">项目</el-menu-item>
      <el-menu-item index="3">问题</el-menu-item>
      <el-submenu index="4">
        <template slot="title">我的工作台</template>
        <el-menu-item index="4-1">工时表</el-menu-item>
      </el-submenu>
      <el-menu-item index="6" class="login-btn" route="/login">登录</el-menu-item>
      <el-menu-item index="5" class="sign-btn" route="/sign">注册</el-menu-item>
    </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scope>
.head-menu {
  height: 60px;
  background: #409EFF;
  .login-btn,
  .sign-btn {
    float: right;
  }
}


</style>
