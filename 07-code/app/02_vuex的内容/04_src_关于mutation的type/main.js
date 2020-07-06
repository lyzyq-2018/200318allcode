// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入store
import store from './vuex/store'
//设置浏览器的控制台的默认提示信息不显示
Vue.config.productionTip = false
//实例化Vue
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册Vuex的仓库对象
  store
})