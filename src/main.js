import Vue from 'vue'
import App from './App.vue';
import router from './router';
import antUI from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import axios from 'axios';
import './mock/mockServer'; // mock数据

Vue.use(antUI);
Vue.config.productionTip = false

Vue.prototype.router = router;

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
