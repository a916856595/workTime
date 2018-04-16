import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login';
import index from '@/pages/index';
import sign from '@/pages/sign';

Vue.use(Router);

export default new Router({
  routes: [
    {
      'path': '/login',
      'name': 'login',
      'component': login
    }, {
      'path': '/sign',
      'name': 'sign',
      'component': sign
    }, {
      'path': '*',
      'name': 'index',
      'component': index
    }
  ]
});
