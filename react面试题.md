# React 1.基础知识点防抖和节流概念
### 日常开发过程中，滚动事件做复杂计算频繁调用回调函数很可能会造成页面的卡顿，这时候我们更希望把多次计算合并成一次，只操作一个精确点，JS把这种方式称为debounce（防抖）和throttle（节流）

### 防抖的话是一定时间内触发多次只执行一次  防抖的作用是限制函数在一定时间内只能触发一次
### 节流是当短时间触发多次时，把这几次触发间隔一定的时间，当触发的函数需要操作dom和进行很大量的数据操作和计算，或者异步请求时候，节流可以起到防止丢帧和卡顿的效果
### 函数防抖
#### 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定时间到来之前，又触发了事件，就重新开始延时。也就是说当一个用户一直触发这个函数，且每次触发函数的间隔小于既定时间，那么防抖的情况下只会执行一次。

function debounce(fn, wait) {
    var timeout = null;      //定义一个定时器
    return function() {
        if(timeout !== null) 
                clearTimeout(timeout);  //清除这个定时器
        timeout = setTimeout(fn, wait);  
    }
}
// 处理函数
function handle() {
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));
当持续触发scroll函数，handle函数只会在1秒时间内执行一次，在滚动过程中并没有持续执行，有效减少了性能的损耗

### 函数节流
### 当持续触发事件时，保证在一定时间内只调用一次事件处理函数，意思就是说，假设一个用户一直触发这个函数，且每次触发小于既定值，函数节流会每隔这个时间调用一次


#### 防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行

var throttle = function(func, delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}
function handle() {
    console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle, 1000));

var throttle = function(func, delay) {
     var timer = null;
     var startTime = Date.now();  //设置开始时间
     return function() {
             var curTime = Date.now();
             var remaining = delay - (curTime - startTime);  //剩余时间
             var context = this;
             var args = arguments;
             clearTimeout(timer);
              if (remaining <= 0) {      // 第一次触发立即执行
                    func.apply(context, args);
                    startTime = Date.now();
              } else {
                    timer = setTimeout(func, remaining);   //取消当前计数器并计算新的remaining
              }
      }
}
function handle() {
      console.log(Math.random());
}
 window.addEventListener('scroll', throttle(handle, 1000));

 在节流函数内部使用开始时间startTime、当前时间curTime和剩余时间remaining，当剩余时间小于等于0意味着执行处理函数，这样保证第一次就能立即执行函数并且每隔delay时间执行一次；如果还没到时间，就会在remaining之后触发，保证最后一次触发事件也能执行函数，如果在remaining时间内又触发了滚动事件，那么会取消当前的计数器并计算出新的remaing时间。通过时间戳和定时器的方法，我们实现了第一次立即执行，最后一次也执行，规定时间间隔执行的效果，可以灵活运用在开发中
PS：防抖和节流能有效减少浏览器引擎的损耗，防止出现页面堵塞卡顿现象，应该熟练掌握。最后再次感谢原作者的总结，热心分享技术让我们的生活变得更好

### redux的使用

### react性能优化

### hooks
首先让我们看一下一个简单的有状态组件： 
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
参考博客：https://www.jianshu.com/p/76901410645a
我们再来看一下使用hooks后的版本：
这个函数之所以这么了不得，就是因为它注入了一个hook--useState，就是这个hook让我们的函数变成了一个有状态的函数。

import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}


import Cat from 'components/cat'
class DataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { target: 'Zac' };
  }

  render() {
    return (
      <div>
        {this.props.render(this.state)}
        {this.props.render(this.state)}
      </div>
    )
  }
}

<DataProvider render={data => (
  <Cat target={data.target} />
)}/>


...
<DataProvider>
  {data => (
    <Cat target={data.target} />
  )}
</DataProvider>
### 高阶组件及路由相关原理
高阶组件相关原理
https://www.cnblogs.com/liuyuexue520/p/12770579.html

import React from "react"   // 导入react包

function withMouse(Components) {    // 创建一个函数, 并且有一个形参, 数据要求是一个组件
    class Mouse extends React.Component {   // 创建一个内部组件, 获取鼠标的移动事件的数据
　　　　　　　　　　　　　　　　　　　　　　　　　　 // 因为组件没有被调用, 相当于没有这个组件 , 所以在外部函数中,直接返回组件名,相当于调用
        // 初始化数据
        state = {
            x: 0,
            y: 0
        }
        // 鼠标移动的时候更新初始数据
        mousemoved = e => {
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }
        // 组件渲染完成的时候监听鼠标的滚动事件
        componentDidMount() {
            window.addEventListener("mousemove", this.mousemoved)
        }
        // 组件注销的时候清除事件
        componentWillUnmount() {
            window.removeEventListener("mousemove", this.mousemoved)
        }
        // 调用render方法返回外部函数调用的时候出传递进来的组件
        render() {
            return (<Components {...this.state}></Components>)   // 这里的Components是外部函数的形参, 也就是用户传递过来的组件
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　// 返回组件的时候,把当前组件数据"嵌入"进去了
        }
    }

    return Mouse;  // 相当于调用内部的组件, 同时内部组件的返回值会通过这个return ,返回给调用这个 withMouse 函数的组件
}

// 定义一个简单的组件,需要通过上面的函数,进行包装

const Title = props => {   // 定义了一个组件
    return (
        <div>
            <p>当前鼠标的X坐标为: {props.x}</p>   // 这里就能通过形参,使用上面高级函数传递过来的组件参数
            <p>当前鼠标的Y坐标为: {props.y}</p>
        </div>
    )
}

const Newtitle = withMouse(Title)   //这里把组件当做形参传递给上面的高阶组件, 返回的还是当前的组件, 只是内部多了高阶组件里面的共用组件的数据




//定义App组件

class App extends React.Component {
    render() {
        return (<Newtitle></Newtitle>)    // 最后一步,渲染的时候,调用了上面的title组件
    }
}
// 导出App组件
export default App

**核心分析**
1. 创建一个函数fn,假设形参为a  (a接收组件作为参数)
2. 函数内部创建一个组件, 只写公共逻辑, 返回的是传递进去的形参a,并且把内部逻辑的参数,携带进去
3. 外部的函数,return 的是内部的函数(相当于调用内部的组件)
4. 内部组件,返回的是调用函数fn传递进去的参数(组件),但是,返回的时候携带参数
4. 外部调用 fn,且传递组件进去, 返回值还是该组件(相比传递进去的时候,多了参数)

路由相关讲解
一：介绍 react-router 的依赖库history；二：使用 history 库，实现一个简单的 react-router 路由。
react-router的基本原理
一句话：实现URL与UI界面的同步。其中在react-router中，URL对应Location对象，而UI是由react components来决定的，这样就转变成location与components之间的同步问题。

history 介绍
history 是一个 JavaScript 库，可让您在 JavaScript 运行的任何地方轻松管理会话历史记录。history 抽象出各种环境中的差异，并提供最小的 API ，使您可以管理历史堆栈，导航，确认导航以及在会话之间保持状态。

history 有三种实现方式：
1、BrowserHistory：用于支持 HTML5 历史记录 API 的现代 Web 浏览器（请参阅跨浏览器兼容性）
2、HashHistory：用于旧版Web浏览器
3、MemoryHistory：用作参考实现，也可用于非 DOM 环境，如 React Native 或测试
https://www.jianshu.com/p/53dc287a8020
https://blog.csdn.net/tangzhl/article/details/79696055
### flex布局属性
1.容器属性
    flex-direction  flex-direction 属性决定主轴的方向（即项目的排列方向）。 
                    row（默认值）：主轴为水平方向，起点在左端。
                    row-reverse：主轴为水平方向，起点在右端。
                    column：主轴为垂直方向，起点在上沿。
                    column-reverse：主轴为垂直方向，起点在下沿。
    flex-wrap    nowrap（默认）：不换行。
                 wrap：换行，第一行在上方。
                 wrap-reverse：换行，第一行在下方。
    flex-flow 
    justify-content  justify-content属性定义了项目在主轴上的对齐方式。
                    flex-start（默认值）：左对齐
                    flex-end：右对齐
                    center： 居中
                    space-between：两端对齐，项目之间的间隔都相等。
                    space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
    align-items     align-items属性定义项目在交叉轴上如何对齐。
                    flex-start：交叉轴的起点对齐。
                    flex-end：交叉轴的终点对齐。
                    center：交叉轴的中点对齐。
                    baseline: 项目的第一行文字的基线对齐。
                    stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
    align-content  
                    flex-start：与交叉轴的起点对齐。
                    flex-end：与交叉轴的终点对齐。
                    center：与交叉轴的中点对齐。
                    space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
                    space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
                    stretch（默认值）：轴线占满整个交叉轴。
2.项目属性
1、order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
2、flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
3、flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
4、flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
5、flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
6、align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

### es6特性
const 什么时候可以被修改 const obj ={}  obj.name ="jack" 
const 定义的 如果是基本数据类型 那么是不可以修改的
如果是引用类型 值可以被修改
const 定义引用类型 这个引用类型的值发生变化，可以视为发生了变化，也可以视为没发生变化，变化的在于值，不变的在于堆内存地址，修改他的值虽然不变，但是，修改他的地址const 会报错，就像const 定义的基本数据类型报的错是一样的
### webpack配置

### js基础常见面试题
https://www.jianshu.com/p/1c142ec2ca45

js 深拷贝 浅拷贝
B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，如果B没变，那就是深拷贝，
1. 如果是基本数据类型，名字和值都会储存在栈内存中
var a = 1;
b = a; // 栈内存会开辟一个新的内存空间，此时b和a都是相互独立的
b = 2;
console.log(a); // 1


常见浏览器优化
一.图片的优化
1.图片的压缩，使用png

2.使用图片的预加载

3.多个小图片的引用可以合并成一个大图片，精灵图的使用

4.src不为空

5.减少对图片宽高的自定义

二.css的优化
1.css进行合并处理，减少多个请求

2.尽量使用link，减少@import

3.使用less,sass

4.对css进行压缩

5.减少无效代码，注意公用样式

三.js的优化
1.js压缩

2.尽量不在head中引用

3.减少无效代码

4.js引用放在body最后

5.减少js对css样式的修改

6.减少真实dom的操作

四.HTML优化
1.尽量减少table的使用

2.尽量使用web语义化标签

五.http请求方面的优化
1.尽量减少http请求

2.和并http请求

3.开启gzip模块，gzip压缩是非常流行的一种数据压缩格式，一般网站启用gzip后，压缩率都会有70%-80%的提升，效果是立竿见影的

六.浏览器优化
1.开启浏览器缓存，缓存css,js，img

2.按需加载，把统计、分享等 js 在页面 onload 后再进行加载，可以提高访问速度；

3.优化 cookie ，减少 cookie 体积；

七.其他优化
1.使用免费 cdn 加载第三方资源

2.使用 cdn 储存静态资源

3.减少重绘和重排

4.按需加载

5.避免重定向

6.减少DNS查找

7.避免CSS表达式

8.添加Expires头

9.使Ajax可缓存
http 状态码
1**	信息，服务器收到请求，需要请求者继续执行操作
2**	成功，操作被成功接收并处理
3**	重定向，需要进一步的操作以完成请求
4**	客户端错误，请求包含语法错误或无法完成请求
5**	服务器错误，服务器在处理请求的过程中发生了错误
401 当前用户没有权限，需要进行身份验证

import和require的区别
require 是 AMD规范引入方式
import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法
调用时间

require是运行时调用，所以require理论上可以运用在代码的任何地方
import是编译时调用，所以必须放在文件开头
require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量
import是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require


原型 和原型链 
![](images/yx.png)

百度回车
1. 解析url
浏览器首先对拿到的URL进行识别，抽取出域名字段
2. DNS解析
获取域名对应的IP然后向IP地址定位的HTTP服务器发起TCP连接
3. 浏览器与网站建立TCP连接（三次握手）
4. 请求和传输数据
5. 浏览器渲染页面
 客户端拿到服务器端传输来的文件，找到HTML和MIME文件，通过MIME文件，浏览器知道要用页面渲染引擎来处理HTML文件。

ａ.浏览器会解析html源码，然后创建一个 DOM树。

在DOM树中，每一个HTML标签都有一个对应的节点，并且每一个文本也都会有一个对应的文本节点。

b.浏览器解析CSS代码，计算出最终的样式数据，形成css对象模型CSSOM。

首先会忽略非法的CSS代码，之后按照浏览器默认设置——用户设置——外链样式——内联样式——HTML中的style样式顺序进行渲染。

c.利用DOM和CSSOM构建一个渲染树（rendering tree）。
渲染树和DOM树有点像，但是是有区别的。

DOM树完全和html标签一一对应，但是渲染树会忽略掉不需要渲染的元素，比如head、display:none的元素等。

而且一大段文本中的每一个行在渲染树中都是独立的一个节点。
渲染树中的每一个节点都存储有对应的css属性。

ｄ.浏览器就根据渲染树直接把页面绘制到屏幕上。

答案二

1、首先，在浏览器地址栏中输入url，先解析url，检测url地址是否合法
2、浏览器先查看浏览器缓存-系统缓存-路由器缓存，如果缓存中有，会直接在屏幕中显示页面内容。若没有，则跳到第三步操作。
浏览器缓存：浏览器会记录DNS一段时间，因此，只是第一个地方解析DNS请求；
操作系统缓存：如果在浏览器缓存中不包含这个记录，则会使系统调用操作系统，获取操作系统的记录(保存最近的DNS查询缓存)；
路由器缓存：如果上述两个步骤均不能成功获取DNS记录，继续搜索路由器缓存；
ISP缓存：若上述均失败，继续向ISP搜索。
3、在发送http请求前，需要域名解析(DNS解析)，解析获取相应的IP地址。
4、浏览器向服务器发起tcp连接，与浏览器建立tcp三次握手。
5、握手成功后，浏览器向服务器发送http请求，请求数据包。
6、服务器处理收到的请求，将数据返回至浏览器
7、浏览器收到HTTP响应
8、浏览器解码响应，如果响应可以缓存，则存入缓存。
9、 浏览器发送请求获取嵌入在HTML中的资源（html，css，javascript，图片，音乐······），对于未知类型，会弹出对话框。
10、 浏览器发送异步请求。
11、页面全部渲染结束。

作用域、预解析和声明提升