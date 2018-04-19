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
              clearable>
            </el-input>
            <div class="form-tip">
              <p v-show="vaildObj.userName === 'live'">
                <i class="el-icon-circle-close"></i>
                <span>用户名已被占用！</span>
              </p>
              <p v-show="vaildObj.userName === 'useful'">
                <i class="el-icon-circle-check"></i>
                <span>恭喜，用户名可用！</span>
              </p>
              <p v-show="vaildObj.userName === 'checking'">
                <i class="el-icon-loading"></i>
                <span>校验中，请稍候...</span>
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
              clearable>
            </el-input>
          </div>
        </li>
        <li>
          <span>确认密码：</span>
          <div class="input-box">
            <el-input
              placeholder="请再次输入密码"
              v-model="passwordRepeat"
              type="password"
              clearable>
            </el-input>
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
  this.$http.post('/user/sign', data, {emulateJSON: true}).then(function(result) {

  }, function (msg) {

  })
}

function checkUserName() {
  if (this.isSubmiting) {
    return;
  }
  this.isSubmiting = true;
  this.vaildObj.userName = 'checking';
  var data = {
    'userName': this.userName
  };
  this.$http.get('/user/checkUserName', { 'params': data }).then(function (result) {
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
    'checkUserName': checkUserName
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