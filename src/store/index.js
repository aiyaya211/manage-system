import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
       rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
       userName: sessionStorage.getItem('userName')
    },
    mutations: {
        setRightList(state, data) {
            state.rightList = data;
            // 将权限信息放在sessionstroage中
            sessionStorage.setItem('rightList', JSON.stringify(data));
        },
        setUserName(state, data) {
            state.userName = data;
            sessionStorage.setItem('userName', data)
        }
    }
})