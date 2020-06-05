### 盒模型

CSS 盒子模型分类：标准盒模型与 IE 盒模型。两种盒子模型都包括 content、padding、border、margin 这四种属性，但是 IE 盒子模型的 content 部分包括 padding、border 这是与标准不同的地方。一般情况下，为了能够兼容多个浏览器，我们使用标准盒子模型，只需加上 DOCTYPE 声明。

### 常见的块级元素、行内元素

### 定位方式

### 选择器优先级是怎样的

！important>行内样式>id 选择器>类选择器>标签选择器>通配符>继承

### div 盒子水平垂直居中的方法

https://www.cnblogs.com/xuemingyao/p/5829263.html
transform: translate(-50%,-50%) top: 50%; left: 50%;
flex 水平居中，垂直居中
justify-content: center; /_子元素水平居中_/
align-items: center; /_子元素垂直居中_/
display: -webkit-flex;
