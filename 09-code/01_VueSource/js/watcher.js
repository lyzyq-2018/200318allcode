// 构造函数
function Watcher(vm, expOrFn, cb) {
    // 保存回调函数
    this.cb = cb;
    // 保存vm实例对象
    this.vm = vm;
    // 保存msg表达式
    this.expOrFn = expOrFn;
    // 定义了一个属性,该属性是一个对象,对象存储数据:{键:值}
    // depIds很明显就是要存储dep和id的有关系的数据
    this.depIds = {};
    // 判断当前的expOfFn---->msg  是不是一个函数(当前的表达式是不是一个函数)
    if (typeof expOrFn === 'function') {
        // 如果expOrFn中是函数,那么直接保存到getter中
        this.getter = expOrFn;
    } else {
        // this.parseGetter('msg');
        // this.getter---->存储了一个函数
        this.getter = this.parseGetter(expOrFn.trim());
    }

    // 最终this.getter中存储的就是一个函数
    // 调用了this.get()方法,获取了什么什么什么 值  给了value属性
    this.value = this.get();
}

Watcher.prototype = {
    constructor: Watcher,
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        // 1. 每次调用run()的时候会触发相应属性的getter
        // getter里面会触发dep.depend()，继而触发这里的addDep
        // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
        // 则不需要将当前watcher添加到该属性的dep里
        // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
        // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
        // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
        // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
        // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
        // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
        // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
        // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
        // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
        // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    },
    get: function() {
        Dep.target = this;
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    },
    // exp---->msg
    parseGetter: function(exp) {
        // 当前的表达式是不是陪陪非特殊符号.这个正则---->这个表达式是不是标准的一个属性的写法
        if (/[^\w.$]/.test(exp)) return; 
        // 当前表达式绝对是正常的
        // exps---->数组--->['msg']
        var exps = exp.split('.');
        // 直接返回函数-------------------此时也是闭包
        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
};