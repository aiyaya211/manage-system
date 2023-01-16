# manage-system

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

一个权限控制的后台管理系统
```
全部权限用户： aiyaya 

部分权限用户： test

密码：123456
```

后台管理的用户权限实现，自己在之前的开发过程中，可能了解到的仅限于权限的设计分配是按照建立角色，赋予角色权限，将角色分配给不同账号，来进行分配处理，没有仔细梳理过权限的方方面面，趁着有时间，简单做了一个后台管理系统，梳理了一下权限相关的内容。

1. 菜单权限
首先，考虑不同的用户，对系统的操作要求不一样，管理员肯定比一般的操作人员能看到更多的菜单，所以一开始渲染的时候，不同角色的用户获取到的菜单都是不一样的，我们一般通过后端接口拿到菜单权限，进行渲染，我用`mock`在本地模拟了一下后端数据，将菜单权限数据放在登录接口中，成功获取到菜单权限数据后，将数据放在`vuex`中，供主页页面进行菜单渲染：
**后端数据**
    ```json
    rights: [{
        id: 100,
        authName: "我的首页",
        path: '/home',
    }, {
        id: 101,
        authName: "用户管理",
        path: '/usersManages',
        children: [{
            id: 10,
            authName: "用户列表",
            path: '/users',
        }]
    }, {
        id: 102,
        authName: "角色管理",
        path: 'rolesManages',
        children: [{
            id: 20,
            authName: "角色列表",
            path: '/roles',
        }]
    }, {
        id: 103,
        authName: "商品管理",
        path: 'productionManages',
        children: [{
            id: 30,
            authName: "商品列表",
            path: '/productions',
        }, {
            id: 31,
            authName: "商品分类",
            path: '/productionCates',
        }]
    }]
    ```
    **把数据放入vuex中，多页面共享**
    ```javascript
    this.$store.commit('setRightList', res.data.rights);
    ```
    **根据后端权限数据渲染菜单**
    ```html
    <a-menu mode="inline">
        <template v-for="item in menus" >
            <a-menu-item :key="item.id" v-if="!item.children">
                <router-link :to="item.path">
                    <span>{{ item.authName }}</span>
                </router-link>
            </a-menu-item>
            <a-sub-menu :key="item.id" v-else>
                <template #icon>
                    <AppstoreOutlined />
                </template>
            <template #title>{{ item.authName }}</template>
                <a-menu-item v-for="child in item.children" :key="child.id">
                    <router-link :to="child.path">
                        <span>{{ child.authName }}</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </template>
    </a-menu>
    ```

    由此，根据不同账号用户的登录后拿到的权限数据不同，首页得到不同的菜单页面效果。
    有一个小问题就是，因为数据是在用户操作登录按钮后获取的，刷新页面权限数据会消失，所以为了数据持久化，把right权限数据放在了`sessionStorage`中。

2. 路由权限
在第一点中，我们实现了不同用户拥有不同的菜单界面，但是如果我连登录都没登录，但是我记得网站的地址，我也可以进入到对应的菜单页面，啊，这也太不安全了。这个时候我们就要对用户进行身份认证，在用户首次登录的时候，后端生成用户的身份证号码（具有唯一性）`token`,在切换页面路由的时候检查是否存在身份证，若没有则无法访问。
路由导航守卫：
    ```javascript
    router.beforeEach((to, from, next) => {
        // 判断下一步的路径是哪里
        // 如果是登录则下一步
        if (to.path === '/login' || to.path === '/') {
            next();
        } else {
            // 判断是否登录过 token
            // token一般保存在sessionstorage中
            const token = sessionStorage.getItem('token');
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
    ```
    那已经登录的用户有了身份证，但是并不是所有的菜单都可以对其开放，假设用户A想通过修改路由地址进入到它本来不应该看到的菜单页面，我们应该怎么处理呢？
    为了防止这种情况出现，我们接下来要实现用户的路由权限，通过动态路由，针对不同的登录用户渲染不同的路由数据，实现动态路由：
    设置路由规则

    ```javascript
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
    ``` 

    路由初始化

    ```javascript
    export function initRouter() {
        // 处理home下面的子路由
        // 拿到当前的路由组信息
        const currentRoute = router.options.routes; // 修改home下的子路由
        // 拿到当前用户的权限数据
        const rightList = store.state.rightList;
        // 修改children
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
        router.addRoutes([...currentRoute, notFound]); // 在最后动态添加404防止刷新后先匹配到404
    }
    ```
    在用户登录页面成功之后调用`initRouter`路由初始化方法。

3. 按钮权限
实现了菜单和路由的用户权限之后，接下来，在同一个页面中，针对不同的用户，存在不同的操作权限，有的用户具有对数据的删除和添加等操作，但是有的用户只有查看权限，如下图的列表页
`用户aiyaya`
![商品列表权限](https://aiyaya122.oss-cn-hangzhou.aliyuncs.com/blog/202301/%E9%A1%B5%E9%9D%A2%E6%9D%83%E9%99%901.png)

    `用户test`
![商品列表权限2](https://aiyaya122.oss-cn-hangzhou.aliyuncs.com/blog/202301/%E9%A1%B5%E9%9D%A2%E6%9D%83%E9%99%902.jpg)

    如何给予用户正确的按钮操作权限呢？首先要拿到用户的操作权限，一般和后端协商后，在用户信息获取的时候，拿到当前菜单页面的操作权限，把页面操作权限的数据赋到路由的元信息中。
    新建一个权限指令
    ```javascript
    import Vue from 'vue';
    import router from '../router/index'
    // 自定义指令
    Vue.directive('persssion', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el, binding) {
            // el 当前绑定指令的dom
            // binding 绑定的内容
            // 获取当前路由
            const currentRoute = router.currentRoute;
            const action = binding?.value?.action;
            const isDisabled = binding?.value?.isDisabled;

            // 判断当前路由的right是否包含当前的binding内容
            // 当前路由元信息包含了页面操作权限数组
            if(!currentRoute.meta || currentRoute.meta.indexOf(action) < 0) {
                console.log('没有权限')
                // 判断设置为disabled还是直接移除dom
                if(isDisabled) {
                    el.classList.add('disabled')
                } else {
                    // 没权限则删除此dom
                    el.parentNode.removeChild(el);
                }
            }
        }
    })
    ```

    给需要区分权限的按钮添加自定义指令
    ```html
    <a-button 
        type="primary"
        v-persssion="{action: 'edit', isDisabled: true}">
        编辑
    </a-button>
    ```

    可以给所有需要权限区分的按钮加上`perssion`的自定义指令。

4. 接口权限
至此，关于一个用户登录到使用系统过程中，涉及到的权限都已经覆盖了，最后还有一个是针对接口的权限，其实这一块可以放在后端做限制，但是，为了减少对服务器不必要的请求，提高整体性能，接口权限检测可以在前端做一层限制。
请求后端接口的时候都带上用户自己的身份证`token`
给`axios`设置拦截器
    ```javascript
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
    ```
    根据请求类型`type`对应不同的页面操作，还是继续通过当前路由的元信息拿到用户的操作权限
    ```javascript

    // 操作权限对应请求类型
    const methodMaps = {
        'get': 'view', // 查
        'delete': 'delete', // 删
        'post': 'add', // 增
        'put': 'edit' // 改
    };
    // 拦截器
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
    ```
    此时，就能做到在请求到达服务器之前就拦截，避免了不必要的请求。
    <br/>

    **总结**
    简单的做了一下前端的权限实现，总共包含以上四点，实际在设计系统过程中更为复杂，很重要的一点是即便前端做了很多权限的限制，但是也是要通过后端给的数据来更好的处理实现的，所以一开始要和后端商议好需要的数据和结构，才能更有效的实现功能。
    <br/>









