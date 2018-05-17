
import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import Global from './Global.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

var request = {
  'get': requestGet,
  'post': requestPost
};

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.prototype.Global = Global;
Vue.prototype.request = request;

var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

function requestGet(url, data) {
  return new Promise(function (resolve, reject) {
    Vue.http.get(url, data).then(function (response) {
      var status = response.body.status;
      if (status === 'success') {
        resolve(response.body.result);
      } else if (status === 'need-login'){
        window.location.hash = '/login';
      }
    }, function (msg) {
      reject(msg);
    });
  });
}

function requestPost(url, data) {
  return new Promise(function (resolve, reject) {
    Vue.http.post(url, data, { emulateJSON: true }).then(function (response) {
      var status = response.body.status;
      if (status === 'success') {
        resolve(response.body.result);
      } else if (status === 'need-login') {
        window.location.hash = '/login';
      }
    }, function (msg) {
      reject(msg);
    });
  });
}