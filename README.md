# myAjax
A simple implementation of jQuery's ajax functions

## 意义
- 巩固原生ajax等相关知识
- 在使用Vue.js/KnockoutJs等MVVM框架的项目中使用常用的ajax功能而无需引入jQuery/Zepto等库

## 自己编写ajax需要考虑的问题
- 为了迎合废除IE的潮流，不考虑IE6的ActiveXObject和IE8/9的XDomainRequest，只考虑标准的XMLHttpRequest
- 理解get和post在ajax实现的差异
    - 请求头不同
    - 参数传递方式不同
    - 服务端(以Node.js为例)接收参数方式不同
- 理解同域和跨域在ajax实现的差异
    - 跨域不自动设置x-requested-with头部
- 理解jsonp的实现原理

## 关于Ajax的一些补充
- 如果使用xhr 发起跨域请求，若调用了 xhr.setRequestHeader 设置头部，则将变为Preflighted请求，xhr会发送一个OPTIONS请求已验证服务端是否有访问权限。因此这个时候需要在服务端的OPTIONS请求响应中设置 Access-Control-Allow-Origin 头部 （如果服务端不支持options请求或options内未设置头部则客户端会报错）。如果没有自定义xhr头部，则为简单请求，不会发起 OPTIONS 验证，直接发起GET/POST请求。

- 如果设置了 xhr.withCredentials = true ，那么要求服务端响应头里必须包含 Access-Control-Allow-Credentials: true 才可以。

- 关于 xhr.setRequestHeader(‘x-requested-with’, ‘XmlHttpRequest’); 当发起同域ajax请求时，jquery.ajax会自动在请求头中设置（查看jQuery源码xhr.js可知），如果使用原生xhr，通常需要手动设置该头部。若为跨域请求，则jquery不再设置该头部（因为设置后就变成了Preflighted请求）。
