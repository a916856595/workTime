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
            </div>
          </div>
        </li>
        <li>
          <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
          <div class="input-box">
            <el-input
              placeholder="请输入昵称"
              v-model="nickName"
              clearable>
            </el-input>
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
  var data = {
    'userName': this.userName,
    'nickName': this.nickName,
    'password': this.password
  };
  this.$http.post('/api/user/sign', data, {emulateJSON: true}).then(function(result) {

  }, function (msg) {

  })
}

function checkUserName() {
  if (this.userName !== '') {
    if (!this.Global.RegExp.userName.test(this.userName)) {
      this.vaildObj.userName = 'format';
    } else {
      this.checkUserNameBackEnd();
    }
  } else {
    this.vaildObj.userName = '';
  }
}

function checkUserNameBackEnd() {
  if (this.isSubmiting) {
    return;
  }
  this.isSubmiting = true;
  this.vaildObj.userName = 'checking';
  var data = {
    'userName': this.userName
  };
  this.$http.get('/api/user/checkUserName', { 'params': data }).then(function (result) {
    if (result.body.result === 1) {
      vaildObj.userName = 'useful';
      this.isSubmiting = false;
    } else {
      vaildObj.userName = 'live';
      this.isSubmiting = false;
    }
  }, function (msg) {
    this.isSubmiting = false;
  })
}

function checkPassword() {
  if (this.password!== '') {
    if (!this.Global.RegExp.password.test(this.password)) {
      this.vaildObj.password = 'format';
    } else {
      this.vaildObj.password = '';
    }
  } else {
    this.vaildObj.password = '';
  }
}

function checkPasswordRepeat() {
  if (this.passwordRepeat !== '') {
    if (this.passwordRepeat !== this.password) {
      this.vaildObj.passwordRepeat = 'not-equal';
    } else {
      this.vaildObj.passwordRepeat = '';
    }
  } else {
    this.vaildObj.passwordRepeat = '';
  }
}

function checkAllFieldIsEmpty() {
  if (this.userName === '') {
    this.vaildObj.userName = 'empty';
  }
  if (this.password === '') {
    this.vaildObj.password = 'empty';
  }
  if (this.passwordRepeat === '') {
    this.vaildObj.passwordRepeat = 'empty';
  }
}

function checkAllField() {
  this.checkPassword();
  this.checkPasswordRepeat();
}

export default {
  'data': () => {
    return {
    'userName': '',
    'nickName': '',
    'password': '',
    'passwordRepeat': '',
    'isSubmiting': false,
    'vaildObj': vaildObj
  }},
  'methods': {
    'sign': sign,
    'checkUserName': checkUserName,
    'checkUserNameBackEnd': checkUserNameBackEnd,
    'checkPassword': checkPassword,
    'checkPasswordRepeat': checkPasswordRepeat,
    'checkAllFieldIsEmpty': checkAllFieldIsEmpty
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