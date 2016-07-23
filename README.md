# myAjax
A simple implementation of jQuery's ajax functions

## 意义
- 巩固原生ajax等相关知识
- 在使用Vue.js/KnockoutJs等MVVM框架的项目中使用常用的ajax功能而无需引入jQuery/Zepto等库

## 自己编写ajax需要考虑的问题
- 为了迎合废除IE的潮流，不考虑IE6的ActiveXObject和IE8/9的XDomainObject，只考虑标准的XMLHttpRequest
- 理解get和post在ajax实现的差异
    - 请求头不同
    - 参数传递方式不同
    - 服务端(以Node.js为例)接收参数方式不同
- 理解同域和跨域在ajax实现的差异
    - 跨域不自动设置x-requested-with头部
- 理解jsonp的实现原理
