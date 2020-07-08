// 劫持数据的构造函数
function Observer(data) {
    // this---->当前的劫持数据的实例对象
    // this.data-----> data参数----value---->vm中的data变量
    // 但是又把data 数据 给了 this的data属性
    this.data = data;
    // 传入了data参数,进行真正的数据劫持操作
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    walk: function(data) {
        // data------>之前的参数data传进来的
        // 把劫持实例对象this保存到me变量中
        var me = this;
        // 把data对象中所有的数据进行  遍历  操作(data中有多少个属性就会遍历多少次)
        Object.keys(data).forEach(function(key) {
            // key---->msg, data['msg']---->当前的msg属性的值
            me.convert(key, data[key]); // 进行数据的转换操作
        });
    },
    convert: function(key, val) {
        // key---->msg   val----->msg属性的值
        // 数据劫持实例对象中的data属性
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        // 创建dep实例对象-----依赖关系(依赖对象)
        // 只要data中有一个属性,就会创建一个dep对象(一个属性对应着一个dep对象)
        var dep = new Dep();
        // 再次的进行数据劫持操作(如果val是对象的情况,此时就会再次的进行数据劫持,创建数据劫持对象,形成递归操作)
        var childObj = observe(val);
        // data---->this.data---->数据劫持的实例对象中的data属性
        // 为数据劫持的实例对象中的data对象 添加key---->msg 属性

        // this.data---->vm中的data同一个指向
        // this.data 中重新添加了vm 中的data中的属性
        // this.data中添加了 一个 msg属性----->vm中data中的msg属性
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            // 重写了get方法,只要你访问了data中的msg属性就会自动的进入到get方法内部(如:vm.msg,直接进来了)
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            // 重写了set方法,只要你设置(修改)了data中msg属性就会自动的进入到set方法内部(如:vm.msg='新值',直接进来了)
            set: function(newVal) {
                // 判断新的值和原来的值是否一致,如果是一样的,就直接返回
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};
// 劫持数据的函数 value---->vm中的变量data数据,vm
function observe(value, vm) {
    // 判断value(data)数据如果不存在或者value(data)不是一个对象就直接返回,啥也不做
    if (!value || typeof value !== 'object') {
        // 没有值或者不是对象就直接返回
        return;
    }
    // 如果value是对象,则立刻创建一个劫持的实例对象,并且传入value数据(对象)
    return new Observer(value);
};

// id标识
var uid = 0;

function Dep() {
    // id 标识,唯一的,每一个dep都有一个自己的id标识
    this.id = uid++;
    // 每个dep对象中还有一个subs---->数组
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;