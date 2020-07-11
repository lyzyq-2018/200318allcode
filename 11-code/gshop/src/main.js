// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入路由器对象
import router from './router'
// 引入TypeNav组件,并定义成全局的公共组件
import TypeNav from './components/TypeNav'
// 定义全局公共组件
Vue.component(TypeNav.name,TypeNav)
// 设置浏览器的控制台的默认提示信息是否显示
Vue.config.productionTip = false
// 实例化Vue
new Vue({
  // 渲染组件
  render: h => h(App),
  // 配置路由器
  router
}).$mount('#app')
