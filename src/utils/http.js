import axios from 'axios';
import Vue from 'vue';
import router from '../router/index'

// 操作权限对应请求类型
const methodMaps = {
    'get': 'view', // 查
    'delete': 'delete', // 删
    'post': 'add', // 增
    'put': 'edit' // 改
};

// 设置axios拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url !== '/login') {
        // 请求带上token 身份认证
        const token = sessionStorage.getItem('token');
        config.headers.Authorization = token;
        // 当前请求的类型
        const method = config.method;
        const action = methodMaps[method];
        console.log(action)
        // 拿到当前用户的权限
        const rightList = router.currentRoute.meta;
        console.log(rightList)
        // 若当前操作不属于用户操作权限
        if(!rightList || (rightList && rightList.indexOf(action) < 0)) {
            alert('没有权限，请检查');
            return false;
        }
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

Vue.prototype.$axios = axios;
