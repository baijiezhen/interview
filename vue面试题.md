### vue 生命周期
![](images/vue_smzq.png)
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed
### vue双向数据绑定原理
![](images/MVVMy_yl.png.png)
数据劫持
vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

