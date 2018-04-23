<template>
  <div class="login-box">
    <div class="top">
      <el-input
        placeholder="请输入用户名"
        v-model="userName"
        clearable
        class="user-input">
        <template slot="prepend">用户名</template>
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        clearable
        type="password"
        class="user-input">
        <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
      </el-input>
    </div>
    <div class="bottom">
      <el-button 
        type="primary"
        class="login-btn"
        v-on:click="login">登&nbsp;&nbsp;&nbsp;录
      </el-button>
      <p class="login-tip">
        <span>登录提示</span>
        <span class="right">
          <router-link to="/sign">没有账号?</router-link>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
function login() {
  var data = {
    'userName': this.userName,
    'password': this.password
  };
  this.$http.post('/api/user/login', data, {emulateJSON: true} ).then(function(result) {

  });
}

export default {
  'name': 'login',
  'data': () => {
    return {
      'userName': '',
      'password': ''
    }
  },
  'methods': {
    'login': login
  }
}
</script>

<style scoped>
.login-box {
  width: 300px;
  padding: 20px;
  border: 1px solid #bbb;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 #bbb;
  margin: 200px auto 0;
}

.top .user-input {
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  margin-bottom: 20px;
}

.login-tip {
  margin: 0;
  font-size: 12px;
}

.login-tip .right {
  float: right;
}
</style>


