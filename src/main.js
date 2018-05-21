
import Vue from 'vue';
import axios from "axios";
import App from './App';
import Global from './Global.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Qs from 'qs';

// axios config
var axiosRequest = axios.create({
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data;
  }],
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

axiosRequest.interceptors.response.use(function (response) {
  var status = response.data.status;
  if (status === 'success') {
    return response;
  } else if (status === 'need-login') {
    window.location.hash = '/login';
  } else {
    console.log('err status', status);
  }
}, function (err) {
  return Promise.reject(err);
});

function requestGet(url, data) {
  return new Promise((resolve, reject) => {
    axiosRequest.get(url, { params: data })
      .then(function (response) {
        resolve(response.data.result);
      })
      .catch(function (msg) {
        reject(msg);
      });
  });
}

function requestPost(url, data) {
  return new Promise((resolve, reject) => {
    axiosRequest.post(url, data)
      .then(function (response) {
        resolve(response.data.result);
      })
      .catch(function (msg) {
        reject(msg);
      });
  });
}
// axios config end

var request = {
  'get': requestGet,
  'post': requestPost
};

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.Global = Global;
Vue.prototype.request = request;

var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});