<template>
  <div class="login-background">
    <div class="w">
      <div class="login-box">
        <ul class="g-form-ul">
          <li>
            <el-input
              placeholder="请输入用户名"
              v-model="userName"
              v-on:focus="vaildObj.account = ''"
              clearable
              class="user-input">
              <template slot="prepend">用户名</template>
            </el-input>
            <div class="form-tip">
              <p v-show="vaildObj.account === 'unlive'">
                <i class="el-icon-error"></i>
                <span>账号不存在！</span>
              </p>
              <p v-show="vaildObj.account === 'server-error'">
                <i class="el-icon-error"></i>
                <span>服务器错误,请稍后再试！</span>
              </p>
            </div>
          </li>
          <li>
            <el-input
              placeholder="请输入密码"
              v-model="password"
              v-on:focus="vaildObj.password = ''"
              clearable
              type="password"
              class="user-input">
              <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
            </el-input>
            <div class="form-tip">
              <p v-show="vaildObj.password === 'error'">
                <i class="el-icon-error"></i>
                <span>密码错误！</span>
              </p>
            </div>
          </li>
        </ul>
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
    </div>
  </div>
</template>

<script>
function login() {
  var vm = this;
  if (vm.isSumbiting) {
    return;
  }
  vm.isSumbiting = true;
  var data = {
    'userName': vm.userName,
    'password': vm.password
  };
  vm.request.post('/user/login', data).then(result => {
    if (result.code === 0) {
      vm.$router.push({
        name: 'userInfo',
        params: {
          userId: result.userId
        }
      });
    } else if (result.code === 1) {
      vm.vaildObj.account = 'unlive';
    } else if (result.code === 2) {
      vm.vaildObj.password = 'error';
    } else if (result.code === 3) {
      vm.vaildObj.account = 'server-error';
    }
    vm.isSumbiting = false;
  }, msg => {
    vm.isSumbiting = false;
  });
}

export default {
  'name': 'login',
  'data': () => {
    return {
      isSumbiting: false,
      userName: '',
      password: '',
      vaildObj: {
        account: '',
        password: ''
      }
    }
  },
  'methods': {
    login
  }
}
</script>

<style scoped lang="less">
.login-background {
  height: 100%;
  background-image: url('../assets/images/index.jpg');
  background-position: center;
  &>div {
    position: relative;
    height: 100%;
    min-height: 450px;
  }
}

.login-box {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  width: 300px;
  padding: 35px;
  border: 1px solid #bbb;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 #bbb;
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


