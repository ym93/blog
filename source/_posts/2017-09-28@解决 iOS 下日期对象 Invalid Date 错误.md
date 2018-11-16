---
title: 解决 iOS 下日期对象 Invalid Date 错误
date: 2017-09-28 21:41:26
categories:
  - 前端
tags:
	- JavaScript
---

JavaScript 中的 Date 对象用于处理日期和时间，对前端开发而言几乎是每天都要打交道的一个东西，但它存在着一个奇葩、不易被注意到的兼容性问题。这是今天在处理产品经理提出的 bug 时偶然发现的。

<!-- more -->


下面这行简单的代码，仅仅用于定义一个日期对象。它在 iOS 下可能无法正确执行。

``` js
new Date('2017-09-28') // Windows、Android 返回日期对象，iOS 返回 Invalid Date 。
```

在 iOS 环境下（先后使用 iPhone6、iPhone6 Plus 测试），这行代码始终返回 Invalid Date（无效的日期）。很显然，系统不能正确解析 `2017-09-28` 这个日期字符串。

解决方法也非常简单，换一种 iOS 能够解析的日期格式即可，使用 `/` 代替日期字符串中的 `-` ：

``` js
new Date('2017/09/28')
```

由于存储在数据库中的日期通常使用 `-` 分隔年月日，为避免出现兼容问题，前端渲染时应该默认使用 `replace` 方法批量替换。

``` js
const str = '2017-09-28'
new Date(str.replace(/-/g, '/'))
```