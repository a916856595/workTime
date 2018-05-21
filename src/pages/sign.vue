<template>
  <div class="sign-p">
    <el-card class="box-card w">
      <div slot="header" class="clearfix">
        <span>注册管理平台</span>
      </div>
      <ul class="sign-body g-form-ul">
        <li>
          <span>用&nbsp;户&nbsp;&nbsp;名：</span>
          <div class="input-box">
            <el-input
              placeholder="请输入用户名"
              v-model="userName"
              v-on:blur="checkUserName()"
              v-on:focus="vaildObj.userName = 'edit'"
              clearable>
            </el-input>
            <div class="form-tip">
              <p v-show="vaildObj.userName === 'edit'">
                <i class="el-icon-info"></i>
                <span>请输入6-18位英文或数字</span>
              </p>
              <p v-show="vaildObj.userName === 'live'">
                <i class="el-icon-error"></i>
                <span>用户名已被占用！</span>
              </p>
              <p v-show="vaildObj.userName === 'useful'">
                <i class="el-icon-success"></i>
                <span>恭喜，用户名可用！</span>
              </p>
              <p v-show="vaildObj.userName === 'checking'">
                <i class="el-icon-loading"></i>
                <span>校验中，请稍候...</span>
              </p>
              <p v-show="vaildObj.userName === 'format'">
                <i class="el-icon-error"></i>
                <span>用户名格式不正确,请重新检查！</span>
              </p>
              <p v-show="vaildObj.userName === 'empty'">
                <i class="el-icon-error"></i>
                <span>请输入用户名！</span>
              </p>
            </div>
          </div>
        </li>
        <li>
          <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
          <div class="input-box">
            <el-input
              placeholder="请输入昵称"
              v-model="nickName"
              v-on:blur="vaildObj.nickName = ''"
              v-on:focus="vaildObj.nickName = 'edit'"
              clearable>
            </el-input>
            <div class="form-tip">
              <p v-show="vaildObj.nickName === 'edit'">
                <i class="el-icon-info"></i>
                <span>输入一个你喜欢的名字</span>
              </p>
            </div>
          </div>
        </li>
        <li>
          <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
          <div class="input-box">
            <el-input
              placeholder="请输入密码"
              v-model="password"
              type="password"
              v-on:blur="checkPassword()"
              v-on:focus="vaildObj.password = 'edit'"
              clearable>
            </el-input>
            <div class="form-tip">
              <p v-show="vaildObj.password === 'edit'">
                <i class="el-icon-info"></i>
                <span>请输入6-18位英文或数字</span>
              </p>
              <p v-show="vaildObj.password === 'format'">
                <i class="el-icon-error"></i>
                <span>密码格式不正确,请重新检查！</span>
              </p>
              <p v-show="vaildObj.password === 'empty'">
                <i class="el-icon-error"></i>
                <span>请输入密码！</span>
              </p>
            </div>
          </div>
        </li>
        <li>
          <span>确认密码：</span>
          <div class="input-box">
            <el-input
              placeholder="请再次输入密码"
              v-model="passwordRepeat"
              type="password"
              v-on:blur="checkPasswordRepeat()"
              v-on:focus="vaildObj.passwordRepeat = 'edit'"
              clearable>
            </el-input>
            <div class="form-tip">
              <p v-show="vaildObj.passwordRepeat === 'edit'">
                <i class="el-icon-info"></i>
                <span>请再次输入密码</span>
              </p>
              <p v-show="vaildObj.passwordRepeat === 'not-equal'">
                <i class="el-icon-error"></i>
                <span>两次密码不一致,请重新检查！</span>
              </p>
              <p v-show="vaildObj.passwordRepeat === 'empty'">
                <i class="el-icon-error"></i>
                <span>请再次输入密码！</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="g-bottom-btn-box">
        <el-button type="primary" round v-on:click="sign()">注&nbsp;&nbsp;册</el-button>
        <el-button type="plain" round>取&nbsp;&nbsp;消</el-button>
      </div>
    </el-card>
    <el-dialog
      title="提示信息"
      :visible.sync="isShowModal"
      width="30%"
      center>
      <span>注册成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-on:click="isShowModal = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
'use strict'

var vaildObj = {
  'userName': '',
  'nickName': '',
  'password': '',
  'passwordRepeat': ''
};

function sign() {
  var vm = this;
  vm.checkAllField().then(() => {
    var data = {
      'userName': vm.userName,
      'nickName': vm.nickName,
      'password': vm.password
    };
    if (vm.isSubmiting) {
      return;
    }
    vm.isSubmiting = true;
    vm.request.post('/user/sign', data).then(result => {
      if(result.code === 0) {
        vm.isShowModal = true;
        vm.$router.push({ name: 'login' });
      }
      vm.isSubmiting = false;
    }, function (msg) {
      vm.isSubmiting = false;
    })
  }, () => {
    console.log('信息不完整，无法注册')
  });
}

function checkUserName() {
  var vm = this;
  return new Promise((resolve, reject) => {
    if (vm.userName !== '') {
      if (!vm.Global.RegExp.userName.test(vm.userName)) {
        vm.vaildObj.userName = 'format';
        resolve();
      } else {
        vm.checkUserNameBackEnd().then(() => {
          resolve();
        }, () => {
          reject();
        });
      }
    } else {
      vm.vaildObj.userName = '';
      resolve();
    }
  });
}

function checkUserNameBackEnd() {
  var vm = this;
  return new Promise((resolve, reject) => {
    if (vm.isSubmiting) {
      resolve();
    }
    vm.isSubmiting = true;
    vm.vaildObj.userName = 'checking';
    var data = {
      'userName': vm.userName
    };
    vm.request.get('/user/checkUserName', data).then(result => {
      if (result.code === 1) {
        vaildObj.userName = 'useful';
        vm.isSubmiting = false;
      } else {
        vaildObj.userName = 'live';
        vm.isSubmiting = false;
      }
      resolve();
    }, function (msg) {
      vm.isSubmiting = false;
      reject();
    })
  });
}

function checkPassword() {
  var vm = this;
  if (vm.password!== '') {
    if (!vm.Global.RegExp.password.test(vm.password)) {
      vm.vaildObj.password = 'format';
    } else {
      vm.vaildObj.password = '';
    }
  } else {
    vm.vaildObj.password = '';
  }
}

function checkPasswordRepeat() {
  var vm = this;
  if (vm.passwordRepeat !== '') {
    if (vm.passwordRepeat !== vm.password) {
      vm.vaildObj.passwordRepeat = 'not-equal';
    } else {
      vm.vaildObj.passwordRepeat = '';
    }
  } else {
    vm.vaildObj.passwordRepeat = '';
  }
}

function checkAllFieldIsEmpty() {
  var vm = this;
  if (vm.userName === '') {
    vm.vaildObj.userName = 'empty';
  }
  if (vm.password === '') {
    vm.vaildObj.password = 'empty';
  }
  if (vm.passwordRepeat === '') {
    vm.vaildObj.passwordRepeat = 'empty';
  }
}

function checkAllField() {
  var vm = this;
  return new Promise((resolve, reject) => {
    vm.checkPassword();
    vm.checkPasswordRepeat();
    vm.checkUserName().then(() => {
      vm.checkAllFieldIsEmpty();
      if (vm.vaildObj.userName === 'useful' && vm.vaildObj.password === '' && vm.vaildObj.passwordRepeat === '') {
        resolve();
      } else {
        reject();
      }
    }, () => {
      reject();
    });
  })
}

export default {
  'data': () => {
    return {
    'userName': '',
    'nickName': '',
    'password': '',
    'passwordRepeat': '',
    'isSubmiting': false,
    'isShowModal': false,
    'vaildObj': vaildObj
  }},
  'methods': {
    sign,
    checkUserName,
    checkUserNameBackEnd,
    checkPassword,
    checkPasswordRepeat,
    checkAllFieldIsEmpty,
    checkAllField
  }
}
</script>

<style lang="less" scope>
  .sign-p {
    .box-card {
      margin-top: @base-el-margin;
    }
    .sign-body {
      max-width: 600px;
      min-width: 400px;
      margin: 0 auto;
      li {
        >span {
          float: left;
          line-height: 40px;
        }
        .input-box {
          margin-left: 80px;
        }
      }
    }
  }
</style>