import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [{ 
            path: '/', 
            redirect: '/login' // 重定向
        }, {
            path: '/login',
            name: 'login',
            component: () => import(
                /* webpackChunkName: "login" */ '../views/pages/login.vue'
            ),
        }, {
            path: '/home',
            name: 'home',
            component: () => import(
                 /* webpackChunkName: "home" */ '../views/pages/home.vue'
            ),
        }
    ]
})