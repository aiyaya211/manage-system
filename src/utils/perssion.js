import Vue from 'vue';
import router from '../router/index'
// 自定义指令
Vue.directive('persssion', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el, binding) {
    //   console.log(el)
    //   console.log(binding)
    //   console.log(router.currentRoute)
      // 获取当前路由
      const currentRoute = router.currentRoute;
      const action = binding?.value?.action;
      const isDisabled = binding?.value?.isDisabled;

      // 判断当前路由的right是否包含当前的binding内容
      if(!currentRoute.meta || currentRoute.meta.indexOf(action) < 0) {
        console.log('没有权限')
        // 没权限则删除此dom
        if(isDisabled) {
            el.classList.add('disabled')
        } else {
            el.parentNode.removeChild(el);
        }
      }
    }
  })