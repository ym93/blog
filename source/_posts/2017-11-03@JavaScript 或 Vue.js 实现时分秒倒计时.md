---
title: JavaScript / Vue.js 实现时分秒倒计时
date: 2017-11-03 23:45:19
time: 201711032345
categories:
  - 前端
tags:
  - JavaScript
  - Vue.js
---

我们平常浏览网页的时候，经常见到“距游戏公测1天2小时3分钟4秒”这样的倒计时器。时间如沙漏般一点点的减少，不仅能挑起用户的兴趣，而且让页面提升了一点逼格，还填补掉一些尴尬的空白位置。最近写得越来越多，有用没用都让加个倒计时，干脆记录下来，免得重复造轮子。

<!-- more -->


实现的方法并不复杂，关键是理解如何计算，尤其对我这种数学不好的人而言。下面两个 demo 将分别用纯 JavaScript 、基于 Vue.js 的 JavaScript 实现。注，代码中可能包含部分 ES6 语法，但相信很容易理解。


### JavaScript

创建一个 `countdown` 方法，用于计算并在控制台打印距目标时间的日、时、分、秒数，每隔一秒递归执行一次。

`msec` 是当前时间距目标时间的毫秒数，由时间戳相减得到，我们将以这个数为基础计算。我们都知道1天等于24小时，1小时等于60分钟，1分钟等于60秒，1秒等于1000毫秒。所以，`msec / 1000 / 60 / 60 / 24` 保留整数就是天数。如果换用 `%` 取余数，再保留整数后得到的就是小时数。以此类推就能算出其他所有数。

``` js
function countdown () {
  // 目标日期时间戳
  const end = Date.parse(new Date('2017-12-01'))
  // 当前时间戳
  const now = Date.parse(new Date())
  // 相差的毫秒数
  const msec = end - now
  // 计算时分秒数
  let day = parseInt(msec / 1000 / 60 / 60 / 24)
  let hr = parseInt(msec / 1000 / 60 / 60 % 24)
  let min = parseInt(msec / 1000 / 60 % 60)
  let sec = parseInt(msec / 1000 % 60)
  // 个位数前补零
  hr = hr > 9 ? hr : '0' + hr
  min = min > 9 ? min : '0' + min
  sec = sec > 9 ? sec : '0' + sec
  // 控制台打印
  console.log(`${day}天 ${hr}小时 ${min}分钟 ${sec}秒`)
  // 一秒后递归
  setTimeout(function () {
    countdown()
  }, 1000)
}
```

控制台打印结果：

```
27天 07小时 49分钟 10秒
27天 07小时 49分钟 09秒
27天 07小时 49分钟 08秒
...
```

### Vue.js

如果单纯使用 JavaScript ，我们需要在每次计算后手动更新 DOM 元素（将数据显示给用户），既不方便又难以维护。实际项目中更多的是配合前端框架，将计算结果实时渲染到页面上。

页面结构中的数据来自 Vue 实例的 `data` 对象。

``` html
<div id="app">{{ `${day}天 ${hr}小时 ${min}分钟 ${sec}分钟` }}</div>
```

`mounted` 是 Vue 的生命周期方法，可以理解为在页面加载完毕后执行 `countdown` 方法。`countdown` 方法每隔一秒会执行一次，并将计算结果分别赋予变量 `day`、`hr`、`min`、`sec`，同时改变的还有页面上显示的内容。


``` js
new Vue({
  el: '#app',
  data: function () {
    return {
      day: 0, hr: 0, min: 0, sec: 0
    }
  },
  mounted: function () {
    this.countdown()
  },
  methods: {
    countdown: function () {
      const end = Date.parse(new Date('2017-12-01'))
      const now = Date.parse(new Date())
      const msec = end - now
      let day = parseInt(msec / 1000 / 60 / 60 / 24)
      let hr = parseInt(msec / 1000 / 60 / 60 % 24)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      this.day = day
      this.hr = hr > 9 ? hr : '0' + hr
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      const that = this
      setTimeout(function () {
        that.countdown()
      }, 1000)
    }
  }
})
```

相关环境：Windows 7 x64 / Vue.js 2.4.4