import Vue from 'vue'
import App from './App.vue';
import router from './router';
import antUI from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import './mock/mockServer'; // mock数据
import './utils/http';
import store from '@/store';

Vue.use(antUI);
Vue.config.productionTip = false

Vue.prototype.router = router;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
