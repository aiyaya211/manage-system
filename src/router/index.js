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
            redirect: '/welcome',
            component: () => import(
                 /* webpackChunkName: "home" */ '../views/pages/home.vue'
            ),
            children: [
                {path: '/welcome', component: () => import(
                    /* webpackChunkName: "welcome" */ '../components/welcome.vue'
                )}
            ]
        }, {
            // 会匹配所有路径
            path: '*',
            component: () => import(
                /* webpackChunkName: "404" */ '../views/pages/notFound.vue'
            )
          }
    ]
})