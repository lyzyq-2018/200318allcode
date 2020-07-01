<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--头部-->
      <Header @addTodo="addTodo" />
      <!--主体部分,列表部分-->
      <List :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" />
      <!--底部-->
      <Footer :todos="todos" :checkAllTodo="checkAllTodo" />
    </div>
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入List组件
import List from './components/List'
// 引入Footer组件
import Footer from './components/Footer'
// 引入缓存工具对象
import storage from './utils/storage'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    List,
    Footer
  },
  // data是回调函数,内部是返回数据对象,现在是脚手架,
  data() {
    return {
      // todos: [
      //   { id: 1, title: '强哥', isCompleted: false },
      //   { id: 2, title: '超哥', isCompleted: true },
      //   { id: 3, title: '峰哥', isCompleted: false }
      // ]
      // 读取缓存数据操作
      // todos:JSON.parse(localStorage.getItem('todos_key')||'[]')
      todos: storage.getStorage()
    }
  },
  methods: {
    // 添加数组数据的方法
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    // 删除数组数据的方法
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 切换选中状态的方法
    toggleTodo(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    // 设置全选或者全不选的操作方法
    checkAllTodo(isChecked) {
      this.todos.forEach(todo => {
        todo.isCompleted = isChecked
      })
    }
  },
  watch: {
    todos: {
      // 深度监视
      deep: true,
      // handler:function mySetStorage(val){
      //   // 缓存数据
      //   // localStorage.setItem('todos_key',JSON.stringify(val))

      // }
      handler: storage.setStorage
    }
  }
}

// 存储数据操作----浏览器---本地
// localStorage.setItem(键1,值)
// 从浏览器本地根据键来读取数据
// localStorage.getItem(键2)
// localStorage.setItem('hh',JSON.stringify({name:'小明'}))

// var result = localStorage.getItem('hh')
// result = JSON.parse(result)
// console.log(result)
// console.log(result.name)
// localStorage.removeItem('hh')

// 面试题----自动登录操作如何缓存登录信息数据?  cookie  localStorage---类似sessionStorage token 自动登录

// function f1(text){
//   console.log(text)
// }

// // var obj={
// //   sayHi:function(){
// //     console.log('真好')
// //   }
// // }

// var obj={
//   sayHi:f1
// }

// obj.sayHi('啊捏哈谁有')

// 继承: 类与类之间的关系,js中没有类,但是可以通过构造函数模拟类,通过原型来实现继承
// 类--->类型---->自己定义的一种类型

// function Person(name,age) {
//   this.name= name
//   this.age =age
// }
// // 实例化的同时进行初始化操作
// var per = new Person('小明',20)

// function Person(name,age) {
//   this.name= name
//   this.age =age
//   // this.sayHi=function(){
//   //   console.log('萨瓦迪卡')
//   // }
// }
// Person 是个构造函数, 函数, 对象
// Person.prototype.sayHi=function(){
//   console.log('哈哈')
// }
// // 100 个对象,每个对象都有自己的一个sayHi()----占用空间---浪费内存
// var per1 = new Person('小明',20)
// var per2 = new Person('小红',23)
// console.log(per1.sayHi===per2.sayHi)

// 构造函数的原型对象上的属性或者方法,实例对象都可以访问=============

// 构造函数
// function Dog() {}
// // 构造函数的原型对象上添加了一个方法
// Dog.prototype.eat = function() {
//   console.log('大骨头真好吃')
// }
// // var dog = new Dog()
// // 当前的实例对象上是没有这个方法的,为什么可以调用,因为该实例对象的原型对象__proto__ 中有eat方法
// // 实例对象调用的这个方法并不是自己的,而是通过__proto__找到的,才能调用
// // 此时,证明:实例对象的__proto__指向的是构造函数的protottype
// // 实例对象和原型对象之间的关系---通过原型来联系的---->原型链:实例对象和原型对象之间的关系
// function BigYellow() {}
// BigYellow.prototype =new Dog() //dog // new Dog()
// BigYellow.prototype.eat = function() {
//   console.log('大蒜真好吃')
// }
// var bg = new BigYellow()
// bg.eat()
// // dog.eat()
// var dog1 = new Dog()
// dog1.eat()

// dog.eat()
// console.dir(dog)






// function MyVue(){}
// MyVue.prototype.$bus={
//   name:'公交车',
//   $sayHi:function(){
//     console.log('考尼奇瓦')
//   }
// }
// var myVue = new MyVue()
// $bus-----> 原型对象上的一个属性---->这个属性本身也是一个对象
// console.log(myVue.$bus.name)
// var myVue = new MyVue()
// // 构造函数
// function VueComponent1(){}
// // 原型指向改变了
// VueComponent1.prototype = myVue
// // 构造函数
// function VueComponent2(){}
// // 原型指向改变了
// VueComponent2.prototype = myVue
// // vc1的__proto__指向了VueComponent1的prototype
// // VueComponent1的prototype 指向了 myVue实例对象  
// // myVue实例对象指向的是MyVue的prototype
// var vc1 = new VueComponent1()
// var vc2 = new VueComponent2()
// console.log(vc1.$bus.name)
// console.log(vc2.$bus.name)
// vc1.$bus.$sayHi()
// vc2.$bus.$sayHi()


// 继承的方式: 改变原型指向  借用构造函数, 组合继承,拷贝继承----------很6才可以











</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
