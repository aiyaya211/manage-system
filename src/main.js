import Vue from 'vue'
import App from './App.vue'
import antUI from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

Vue.use(antUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
