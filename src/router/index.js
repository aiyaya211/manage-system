import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index.js'

Vue.use(Router);

// 动态路由
const usersRule = {
    path: '/users', 
    component: () => import(
        /* webpackChunkName: "userlist" */ '../components/userList.vue'
    )
};
const rolesRule =  {
    path: '/roles', 
    component: () => import(
        /* webpackChunkName: "userlist" */ '../components/rolesList.vue'
    )
};
const productionsRule = {
    path: '/productions', 
    component: () => import(
        /* webpackChunkName: "userlist" */ '../components/productionsList.vue'
    ) 
};
const productionCatesRule = {
    path: '/productionCates', 
    component: () => import(
        /* webpackChunkName: "userlist" */ '../components/productionCates.vue'
    ) 
};
// 和权限数据生成对应关系 权限 -> rule
const rightMap = {
    '/users': usersRule,
    '/roles': rolesRule,
    '/productions': productionsRule,
    '/productionCates': productionCatesRule
};

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
                    path: '/welcome', 
                    component: () => import(
                        /* webpackChunkName: "welcome" */ '../components/welcome.vue'
                    )
                }
            ]
        }
    ]
});
// 路由导航守卫
router.beforeEach((to, from, next) => {
    console.log(111)
    // 判断下一步的路径是哪里
    // 如果是登录则下一步
    if (to.path === '/login' || to.path === '/') {
        next();
    } else {
        // 判断是否登录过 token
        const token = sessionStorage.getItem('token');
        console.log(token)
        if (token) {
            next();
        } else {
            // 没有登录过就回到登录页面
            // this.$message.warning('请先登录');
            next('/login')
            return;
        }
    }
});
const notFound = {
    // 会匹配所有路径
    path: '*',
    component: () => import(
        /* webpackChunkName: "404" */ '../views/pages/notFound.vue'
    )
  };
export function initRouter() {
    console.log('initRouter');
    // 处理home下面的子路由
    // 拿到当前的路由组信息
    const currentRoute = router.options.routes; // 修改home下的子路由
    // 修改children
    const rightList = store.state.rightList;
    console.log(rightList)
    
    rightList.forEach((item) => {
        if(item.children) {
            item.children.forEach(childItem => {
                let temp = rightMap[childItem.path];
                temp.meta = childItem?.right;
                currentRoute[2].children.push(temp)
            })
        }

    })
    // 添加一条路由新规则，如果存在同名则覆盖
    router.addRoutes([...currentRoute, notFound])
}

export default router;