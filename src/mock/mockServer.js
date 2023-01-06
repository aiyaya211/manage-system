import Mock from 'mockjs';

Mock.mock('/login', 'post', function({body}) {
    let params = JSON.parse(body);
    console.log(params)
    if(params.name === 'aiyaya' && params.password === '123456') {
        return {
            username: 'aiyaya',
            status: 200,
            message: 'success',
            rights: [{
                id: 101,
                authName: "用户管理",
                children: [{
                    id: 10,
                    authName: "用户列表"
                }]
            }, {
                id: 102,
                authName: "角色管理",
                children: [{
                    id: 20,
                    authName: "角色列表"
                }]
            }, {
                id: 103,
                authName: "商品管理",
                children: [{
                    id: 30,
                    authName: "商品列表",
                }, {
                    id: 31,
                    authName: "商品分类",
                }]
            }]

        }
    } else {
        return {
            status: 400,
            message: 'failed',
        }
    }
})