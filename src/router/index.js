import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const router = new Router({
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
                {
                    path: '/welcome', component: () => import(
                        /* webpackChunkName: "welcome" */ '../components/welcome.vue'
                    )
                }, {
                    path: '/users', component: () => import(
                        /* webpackChunkName: "userlist" */ '../components/userList.vue'
                    )
                }
            ]
        }, {
            // 会匹配所有路径
            path: '*',
            component: () => import(
                /* webpackChunkName: "404" */ '../views/pages/notFound.vue'
            )
          }
    ]
});
// 路由导航守卫
router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    console.log(next)
    // 判断下一步的路径是哪里
    // 如果是登录则下一步
    if (to.path === '/login' || to.path === '/') {
        next();
    } else {
        const token = sessionStorage.getItem('token');
        // 判断是否登录过 token
        console.log(token)
        if (token) {
            next();
        } else {
            // 没有登录过就回到登录页面
            // this.$message.warning('请先登录');
            next('/login')
        }
    }
});

export default router;