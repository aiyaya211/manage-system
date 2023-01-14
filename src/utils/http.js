import axios from 'axios';
import Vue from 'vue';

// 设置axios拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url !== '/login') {
        // 请求带上token 身份认证
        const token = sessionStorage.getItem('token');
        config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

Vue.prototype.$axios = axios;
