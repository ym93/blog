---
title: JavaScript 实现回到顶部
date: 2017-05-18 13:34:42
categories:
  - web-front-end
tags:
  - JavaScript
---

过去，我一般用 jQuery 的 `scrollTop` 和 `animate` 方法实现回到顶部（back to top）按钮。现在基本不在项目里引入 jQuery ，只能试着用原生写了。实际上，原生 JavaScript 实现起来也很容易。

<!-- more -->

滚动 body 到顶部：

``` js
document.body.scrollTop = 0
```

平滑地滚动 body 到顶部：

``` js
btt: function() {
  // 判断当前位置距离顶部的距离
  if (window.scrollY) {
    let that = this
    // 每10毫秒向上滚动30像素
    setTimeout(function() {
      document.body.scrollTop = (window.scrollY - 30)
      // 递归
      that.scrollToTop()
    }, 10)
  }
}
```

`window.scrollY` 返回文档在垂直方向已滚动的像素值。如果返回值不等于0，就在10毫秒后向上滚动30像素，然后递归调用 `btt` 方法。如果返回值等于0，说明当前位置已位于顶部，不执行任何操作。

相关环境：Windows 7 x64 / Chrome 60