import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Axios from 'axios'
import echarts from 'echarts'
import router from './router'
import App from './App'

Axios.defaults.baseURL = 'http://localhost:8080/';
Axios.defaults.baseURL = '/api';
Axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.prototype.$http = Axios;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
