import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
       rightList: [], 
    },
    mutations: {
        setRightList(state, data) {
            state.rightList = data;
        }
    }
})