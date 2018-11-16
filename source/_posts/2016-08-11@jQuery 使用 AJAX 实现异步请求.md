---
title: 使用 jQuery 实现 AJAX 异步请求
id: 751
comment: false
categories:
  - 前端
date: 2016-08-11 22:42:09
tags:
  - jQuery
  - AJAX
  - JavaScript
---

引用 jQuery 库文件。

``` xhtml
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
```
<!--more-->

在脚本中添加 ajax（GET方式）：

``` js
$.ajax({
	url:  'target.php',  // 请求路径
	type: 'get',  // 请求类型
	data: { 
		// 参数
		username: "caiyiming",
		password: "123456"
	},
	async : false,  // 是否异步执行
	success: function(response){
		// 成功后调用的代码
	},
	error: function(result) {  
		// 失败后调用的代码
	}  
});
```
使用 POST 方式：

``` js
$.ajax({
	url:  'target.php', 
	type: 'post',
	data: { 
		username: "caiyiming"
	},
	async : false,
	success: function(response){
	},
	error: function(response) { 
	}  
});
```