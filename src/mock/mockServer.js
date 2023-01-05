import Mock from 'mockjs';

Mock.mock('/login', 'post', function({body}) {
    let params = JSON.parse(body);
    if(params.name === 'aiyaya') {
        return {
            status: 200,
            message: 'success'
        }
    } else {
        return '请求错误'
    }
})