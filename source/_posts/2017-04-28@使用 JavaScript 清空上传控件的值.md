---
title: 使用 JavaScript 清空上传控件的值
categories:
  - Web Front-end
date: 2017-04-28 00:03:26
tags:
  - JavaScript
---

有时候我们可能希望在某个时间点帮用户清空上传控件（即 file 类型的 input 元素）的值，让交互更加友好。不过，上传控件本身并未提供一个简单的方法用于清除已选中的文件。

<!-- more -->

``` xhtml
<input type="file">
```

网上普遍存在两种方案：用 JavaScript 拷贝一个相同的 input 元素替换掉原来的元素，或者用 jQuery 的 val() 方法将元素的值设为空字符串。

前者对我的页面没有奏效，后者似乎在 IE 下不能正常工作。更何况我也不想为解决一个小问题而引用 jQuery 库。其实，使用表单的 reset 方法可以很容易地清空上传控件的内容。

首先，在 input 标签外包一个 form 标签。

``` xhtml
<form id="my-form">
  <input type="file">
</form>
```

然后，获得 form 元素并调用 reset 方法，该方法将清除表单中已输入的全部内容，当然也包括上传控件中已选中的文件。

``` js
let form = document.getElementById('my-form')
form.reset()
```