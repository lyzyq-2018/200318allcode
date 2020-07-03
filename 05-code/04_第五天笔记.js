/**
 * 
 * 
 * 1. vue-resource 可以在Vue中实现异步请求的操作---Vue2.x之前推荐使用
 *  1) npm install vue-resource
 *  2) main.js 中引入并声明使用插件
 *  3) 组件内部调用 this.$http对象进行异步操作
 * 
 * 
 * 2. axios 可以在Vue中实现异步请求的操作---Vue2.x之后推荐使用
 *  1) npm install axios
 *  2) 在需要发送异步请求的组件中引入axios,可以调用get方法发送异步请求
 *  3) axios 可以进行二次封装, 实现请求拦截器和响应拦截器的操作
 *  4) axio.get().then().catch()
 * 
 */