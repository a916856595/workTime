<template>
  <div class="user-info-box">
    <div class="w">
      <div class="right-part">
        <div class="top-part">
          <span>活动日志：</span>
        </div>
      </div>
      <div class="left-part">
        <div class="top-part">
          <span>用户信息：</span>
        </div>
        <ul class="info-list">
          <li>
            <span>用户名：</span>
            <span v-text="userInfo.userName"></span>
          </li>
          <li>
            <span>昵称：</span>
            <span v-text="userInfo.nickName"></span>
          </li>
          <li>
            <span>用户组：</span>
            <span v-text="userInfo.userGroup"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
function active() {
  var vm = this;
  vm.getUserDetail();
}

function getUserDetail() {
  var vm = this;
  var data = {
    userId: vm.$route.params.userId
  };
  vm.request.get('/user/userDetail', data).then(responseData => {
    if (responseData && responseData.userInfo) {
      vm.userInfo = responseData.userInfo;
    }
  }, msg => {
    console.log('err', msg);
  });
}


export default {
  data: () => {
    return {
      userInfo: {}
    }
  },
  methods: {
    active,
    getUserDetail,
  },
  mounted: function () {
    var vm = this;
    vm.active();
  }
}
</script>

<style scope lang="less">
 .user-info-box {
   .top-part {
     span {
       line-height: 40px;
       font-size: 20px;
       margin-left: -20px;
     }
   }
   .right-part {
     float: right;
     width: 50%;
     padding-left: 20px;
     box-sizing: border-box;
   }
   .left-part {
     margin-right: 50%;
     padding-left: 20px;
     box-sizing: border-box;
     .info-list {
       li {
         padding: 4px 0;
         span {
         border-bottom: 1px dashed #aaa;
        }
       }
     }
   }
 }
</style>

