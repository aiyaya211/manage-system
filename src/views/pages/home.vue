<template>
    <a-layout style="height: 100%">
        <!-- 头部信息 -->
        <a-layout-header>
            <div class="header">
                <div style="color: #fff;">哎呀呀的管理系统</div>
                <a-button >退出</a-button>
            </div>
        </a-layout-header>
        <a-layout>
            <!-- 侧边栏 -->
            <a-layout-sider>
                <a-menu
                style="width: 256px;height: 100%;"
                theme="dark"
                mode="inline">
                    <a-sub-menu key="sub1">
                        <template #title>Navigation One</template>
                        <a-menu-item-group key="g1">
                            <template #icon>
                            </template>
                            <template #title>Item 1</template>
                            <a-menu-item key="1">Option 1</a-menu-item>
                            <a-menu-item key="2">Option 2</a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group key="g2" title="Item 2">
                            <a-menu-item key="3">Option 3</a-menu-item>
                            <a-menu-item key="4">Option 4</a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <!-- 内容部分 -->
            <a-layout-content>
                Content
            </a-layout-content>
            
        </a-layout>
        <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
</template>
<script>
export default {
    data() {
        return {

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