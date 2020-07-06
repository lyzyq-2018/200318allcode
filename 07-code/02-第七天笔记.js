/**
 * 
 * 1. 复习
 *  1)上节课的关于源码分析中会用到的相关的方法
 *  2)整体的复习一下Vue的所有的基础知识点
 *  3)案例---复习Vue组件的通信方式---Vue的拆分组件
 * 
 * 
 * 
 * 
 * 2. 分析源码
 * 
 * ===========================================================
 * 
 * 
 * 1.Object.defineProperty() 方法的使用  
 * 2.Object.keys() 获取对象的所有的属性(可枚举)
 * 3.DocumentFragment 文档碎片对象
 * 
 * 
 */

 /**
  * 
  * 1. 模版语法
  *    Vue针对页面中的一些数据进行操作,从而实现页面的效果发生变化,先获取html的容器
  *    通过实例化Vue,然后进行配置对象的设置
  *    const vm = new Vue({}----配置对象)
  *    el------>设置选择器---->根据选择器获取html的容器对象
  *    data---->数据对象------>数据可以在html标签中使用
  *       data对象中都是属性, 属性如何在html标签中使用 ? 通过插值语法---->{{表达式}}
  *    数据变化---->页面变化
  *    Model变化--->View变化,通过vm来实现,MVVM模式
  *    M-----数据Model
  *    V-----视图View
  *    VM----Vue的实例对象
  *    例子:  <p>{{msg}}</p>  html中使用了msg表达式,一定要在data中定义
  * 
  * 2. Vue中的指令
  *   v-if(v-else,v-else-if):用来控制页面中的某些标签显示或者隐藏(隐藏:DOM树中已经不存在)
  *     什么时候用? 设置一个标签显示或者隐藏,或者如果表达式有数据,则显示这个标签(项目中使用)
  *     里面使用的表达式都是布尔类型
  *     例子:  <p v-if="msg">{{msg}}</p> msg是有值的--->true  此时p就会显示,否则就不显示
  *   v-show,单独使用的,设置当前的html标签显示或者隐藏,v-show指令使用的表达式,也是布尔类型,如果为true则显示,否则隐藏,实际上控制的html标签的style中的display:none,另外,v-show如果隐藏了标签,该标签在DOM树中依然存在
  *     例子: <p v-show="msg">{{msg}}</p> 如果msg是有值的--->true  此时p就会显示,否则就不显示
  * 
  *   v-model:双向数据绑定----获取或者设置表单中的数据
  *   怎么使用? 用在表单标签上,获取标签标签中的数据,或者是设置该标签标签中的数据,此时可以使用v-model指令
  *   例子: <input type="text" v-model="msg" /> 前提是msg在实例化Vue的时候,data对象中定义了
  *    data:{msg:'小红'},如果在文本框中重新输入了内容: 小白,此时msg的值就是小白.
  *    常见表单标签:input标签(文本框,单选框,复选框),select标签,textarea标签
  *    <input type="checkbox" />
  * 
  *   v-bind:强制数据绑定,强行的把一个数据存储到html标签的属性中(能够存储也可以获取)
  *     html标签属性(标签自带的属性或者自己定义的属性(自定义属性)<p class="cls"></p> class属性就属于html的自带属性,<p todo="todo1"></p>,todo属性是自定义属性)
  *  什么时候使用? 如果该标签中的属性是动态的,或者想要在这个标签的某个属性中存储动态的值的时候
  *     例子: <p v-bind:index="myIndex">{{msg}}</p> 此时index属性就可以存储myIndex这个表达式的值,myIndex表达式中存储了数据
  *    v-bind指令可以简化写法----> :属性名字="表达式"  例子: <p :key="id">{{msg}}</p>
  *  
  *   
  *   v-on:事件绑定指令,为某个标签绑定对应的事件
  *   什么用?如果某个标签需要绑定事件监听,此时可以使用v-on这个指令
  *   例子: <p v-on:click="监听的回调函数"></p>,监听的回调函数需要在methods对象中进行定义
  *      简化的写法----->@事件名字="回调函数"
  *    标签中绑定事件的时候使用的都是浏览器自带的事件(系统事件),也可以绑定自定义事件(在项目中经常使用)
  *    例子:   <Header @addTodo="add"></Header>  addTodo就是自定义事件,add需要在methods对象中进行定义,自定义事件都在是组件中使用
  *       v-on指令绑定事件监听的时候,事件的后面可以直接写代码,不用回调函数也可以的(如果写回调函数,内部的代码很少,或者只有一行)
  * 
  * 
  *   v-for:遍历数据的,可以遍历数组,也可以遍历对象
  *   什么使用? 如果需要把很多数据(数组,或者是对象)展示到页面中,此时可以使用v-for指令进行遍历数据的操作
  *   例子遍历数组: <li v-for="(item,index) in persons" :key="item.id"></li>  persons是一个数组 
  *    为了虚拟DOM遍历数据及展示数据的效率比较高,所以,设置key属性,item.id这个位置最好是唯一的标识(不会经常变化的值)
  *    item--->数组中每一项, index---->索引
  *   例子遍历对象:<li v-for="(value,key,index) in obj" :key="index"></li> obj 是一个对象
  *    value--->对象中属性的值,key---->代表的是对象中的属性名字,index---->索引
  *   
  *   v-for遍历数据的时候,如果只是需要某一项数据,不需要索引,此时可以省略索引的写法
  *   例子:  <li v-for="item in persons"></li>  persons是数组, item是数组中每一项  
  * 
  * 
  * 
  *   v-text: 用来展示数据的指令(普通文本内容,非html标签内容)
  *   什么使用? 一般在某一对标签中间需要展示文本内容的时候,可以使用该指令,相当于DOM操作中的innerText或者textContent属性的使用
  *    例子:  <p v-text="msg"></p>  msg需要在data中定义,并且是文本内容(非html内容) 
  *   v-text="msg"和插值语法{{msg}} 使用后的效果几乎相同
  * 
  *   v-html: 用来展示数据的指令(html标签内容)
  *   什么使用?如果需要在某一对标签中间展示html的相关内容,此时可以使用v-html这个指令
  *    例子: <p v-html="msg"></p> msg需要在data中定义,并且是html内容 ,此时打开页面就会展现a标签的效果,相当于DOM操作中的innerHTML
  *     data:{msg:'<a href="http://www.baidu.com">百度</a>'}
  * 
  *   事件参数对象  如果在标签中绑定了事件监听,同时需要在回调函数使用事件参数对象,那么在vue中可以传入$event(相当于DOM操作中的参数e或者event)
  *   事件修饰符: .prevent--->阻止浏览器的默认行为 .stop 阻止监视冒泡
  *   按键修饰符 .enter---或者----.13  是否按下了回车键,如果按下了回车则会触发该事件的回调函数
  *   事件修饰符和按键修饰符可以一起使用的  .enter.prevent
  *   属性属性符---->项目中讲解
  * 
  * 3. Vue中针对某些标签或者组件的样式操作class或者style
  *   标签的样式操作可以使用class或者style
  *   在vue中 样式的操作可以是动态的
  *    什么时候使用? 如果该标签的样式是动态的,此时可以使用:class或者:style
  *   例子: <p :class="myClass"></p>  myClass需要在data对象中定义 myClass:'cls' cls--->类样式的名字
  *        <p :class="{cls:isCls}"></p>  对象的写法,表示的是p标签是否要应用cls这个类样式,isCls是true,则就是应用,否则就是不应用,isCls是一个表达式,需要在data对象中定义,是一个布尔类型的值
  *        <p :class="[clsA,clsB]"></p> 数组的写法,表示的是p标签应用了多个类样式,clsA和clsB需要在data对象中定义,clsA::'cls1'  clsB:'cls2' 
  *        <p :class="myCls" class="cls2" ></p> 动态类样式和静态类样式一起使用的用法,myCls需要在data对象中定义
  *         myCls:'cls1'  ,最终页面中p标签就一起应用了 cls1 和 cls2 两个类样式
  * 
  *    在vue中,样式的操作不仅可以使用class也可以使用style
  *    什么使用使用style? 样式比较少(三个以下)
  *    例子:
  *         <p :style="{color:myColor,backgroundColor:bgColor}"></p>  myColor需要在data中定义,并且存储的是一个颜色值 myColor:'green'  bgColor:'yellow'
  *         <p :style="[myColor1,myBgColor1]"></p> 需要在data对象中定义,myColor1:{color:'yellow'},myBgColor:{backgroundColor:'red'}
  * 
  *   
  * 4. Vue中的计算属性和监视
  *   计算属性:当某个属性的数据发生变化的时候,如果相关联的数据也会发生变化,此时可以使用计算属性(如果html模版中的表达式可以回涉及到更过的逻辑代码的时候,此时可以通过计算属性操作来简化代码)
  *   监视(侦听器):当数据发生变化,需要做更多的操作的时候,此时使用监视
  *   如果该需求通过计算属性实现起来有些麻烦,此时可以使用监视来实现
  * 
  *  计算属性:需要在创建Vue实例的时候,内部的配置对象中通过computed对象来设置
  *  例子:  实例化Vue的配置对象中, 
  *       computed:{
  *          msg:{  设置(setter)和获取(getter)
  *             get(){ 获取该msg属性值的时候会进来,或者做相关的操作},
  *             set(){ 设置该msg属性值的时候会进来,或者做相关的操作}
  *          }
  *       }
  *       有的时候仅仅需要获取该属性的值,那么上面的代码可以进行简化书写
  *        computed:{ 
  *           msg 这个计算属性只有get,是没有set,如果外部设置了msg的值,报错
  *           msg(){} 相当于上面的代码中的get的书写的简写方式
  *        }
  *  监视(侦听器):
  * 
  * 5. Vue中实现异步的操作
  * 6. Vue中的路由
  * 7. 组件通信
  * 8. vuex
  * 
  * 
  * 
  */