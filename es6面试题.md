const 什么时候可以被修改
promise 
展开运算符
结构赋值
async await
for 循环中的异步请求

var promiseList = [];
for (let i=0; i<10; i++) {
    promiseList.push(new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve(i)
        }, Math.random()*3000);
    }));
}
Promise.all(promiseList).then((rspList)=> {
    rspList.map((val)=> {
        console.log(val);    // 依次输出0-9
    });
});
