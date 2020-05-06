class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get(); // 将自己添加到订阅器的操作
  }
  get() {
    Dep.target = this; // 缓存自己
    let value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
    Dep.target = null; // 释放自己
    return value;
  }
  update() {
    let value = this.vm.data[this.exp];
    let oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }
}
var xw = {
  name: "小王",
  gender: "男",
  age: 24,
  say: function (school, grade) {
    alert(
      this.name +
        " , " +
        this.gender +
        " ,今年" +
        this.age +
        " ,在" +
        school +
        "上" +
        grade
    );
  },
};
var xh = {
  name: "小红",
  gender: "女",
  age: 18,
};
xw.say.call(xh, "实验小学", "六年级");
xw.say.apply(xh, "实验小学", "六年级");
xw.say.bind(xh)("实验小学", "六年级");
