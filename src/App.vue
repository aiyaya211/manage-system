<template>
  <div id="app">
    <!-- 路由展示的位置 -->
    <router-view />
  </div>
</template>

<script>
import { initRouter } from '@/router/index.js'
// import HelloWorld from './components/HelloWorld.vue';
// import Login from './views/pages/login.vue';

export default {
  name: 'App',
  created() {
    initRouter();
  },
  // components: {
  //   // HelloWorld
  //   Login
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}
</style>
