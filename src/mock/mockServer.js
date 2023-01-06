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
                authName: "用户管理",
                children: [{
                    authName: "用户列表"
                }]
            }, {
                authName: "角色管理",
                children: [{
                    authName: "角色列表"
                }]
            }, {
                authName: "商品管理",
                children: [{
                    authName: "商品列表",
                }, {
                    authName: "商品分类",
                }]
            }]

        }
    } else {
        return '请求错误'
    }
})