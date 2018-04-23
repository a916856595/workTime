
import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import Global from './Global.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.prototype.Global = Global;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
