import Mock from 'mockjs';
import productionDada from './productionData.json';

Mock.mock('/login', 'post', function({body}) {
    let params = JSON.parse(body);
    console.log(params)
    // 创建两个用户 一个aiyaya admin 拥有最高权限
    // 另一个test用户 权限较少
    if(params.name === 'aiyaya' && params.password === '123456') {
        return {
            username: 'aiyaya',
            status: 200,
            message: 'success',
            token: 'authorization-12345678', // token模拟
            rights: [{
                id: 100,
                authName: "我的首页",
                path: '/home',
                right: ['view']
            }, {
                id: 101,
                authName: "用户管理",
                path: 'usersManages',
                children: [{
                    id: 10,
                    authName: "用户列表",
                    path: '/users',
                    right: ['view']
                }]
            }, {
                id: 102,
                authName: "角色管理",
                path: 'rolesManages',
                children: [{
                    id: 20,
                    authName: "角色列表",
                    path: '/roles',
                    right: ['view']
                }]
            }, {
                id: 103,
                authName: "商品管理",
                path: 'productionManages',
                children: [{
                    id: 30,
                    authName: "商品列表",
                    path: '/productions',
                    right: ['edit', 'add', 'delete', 'view']
                }, {
                    id: 31,
                    authName: "商品分类",
                    path: '/productionCates',
                    right: ['view']
                }]
            }]
        }
    } else if (params.name === 'test' && params.password === '123456') {
        return {
            username: 'test',
            status: 200,
            message: 'success',
            token: 'authorization-987654321', // token模拟
            rights: [{
                id: 100,
                authName: "我的首页",
                path: '/home',
                right: ['view']
            },  {
                id: 101,
                authName: "用户管理",
                path: '/manage',
                children: [{
                    id: 10,
                    authName: "用户列表",
                    path: '/users',
                    right: ['view'],
                }]
            }, {
                id: 103,
                authName: "商品管理",
                path: 'productionManages',
                children: [{
                    id: 30,
                    authName: "商品列表",
                    path: '/productions',
                    right: ['view']
                }]
            }]
        }
    } else {
        return {
            status: 400,
            message: 'failed',
        }
    }
});

Mock.mock('/productionlist', 'get', function({body}) {
    console.log(body)
    console.log(productionDada)
    return productionDada;
});