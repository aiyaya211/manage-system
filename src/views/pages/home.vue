<template>
    <a-layout style="height: 100%">
        <!-- 头部信息 -->
        <a-layout-header>
            <div class="header">
                <div style="color: #fff;">哎呀呀的管理系统</div>
                <!-- <div></div> -->
                <a-button @click="exit">退出</a-button>
            </div>
        </a-layout-header>
        <a-layout>
            <!-- 侧边栏 -->
            <a-layout-sider>
                <a-menu
                style="width: 256px;height: 100%;"
                theme="dark"
                mode="inline">
                    <template v-for="item in rightList" >
                        <a-menu-item :key="item.id" v-if="!item.children">
                            <!-- <template #icon>
                            <PieChartOutlined />
                            </template> -->
                            <span>{{ item.authName }}</span>
                        </a-menu-item>
                        <a-sub-menu :key="item.id" v-else>
                            <template #icon>
                                <AppstoreOutlined />
                            </template>
                        <template #title>{{ item.authName }}</template>
                            <a-menu-item v-for="child in item.children" :key="child.id">{{ child.authName }}</a-menu-item>
                            <!-- <a-menu-item key="4">Option 4</a-menu-item> -->
                        </a-sub-menu>
                    </template>
                </a-menu>
            </a-layout-sider>
            <!-- 内容部分 -->
            <a-layout-content>
                <!-- 路由内容展示 -->
                <router-view />
            </a-layout-content>
            
        </a-layout>
        <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
</template>
<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            menus: [{
                authName: '菜单1',
                id: 1
            }],
        }
    },
    computed: {
        ...mapState(['rightList'])
    },
    created() {
        this.menus = this.rightList;
    },
    methods: {
        exit() {
            // 退出登录
            this.router.push('/');
        }
    }
}
</script>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>