---
title: Rewrite 后 GET 参数丢失的处理
id: 809
comment: false
categories:
  - 后端
date: 2016-09-12 14:50:26
tags:
  - Apache
---

在 Apache Rewrite 中，如果定义的规则中包含了自定义 GET 参数，原有的 GET 参数就会消失。

例如，下面这条规则生效后，访问 www.example.com/mike 实际上是访问 www.example.com/index.php?url=mike ，index.php 可以接收到参数 url ，这个 GET 参数实际上是我们在重写时自定义的。
<!-- more -->

```
RewriteRule ^([a-zA-Z\d]+)$ index.php?url=$1
```

如果访问的时候加上其他参数（如 www.example.com/mike?param=1） ，index.php 仍旧只能接收到参数 url ，无法接收链接中的其他参数。


要解决这个问题，只要在重写规则里加上参数 %{QUERY_STRING} ，处理请求的页面即可收到原有链接中的所有参数，重写规则示例如下。

```
RewriteRule ^([a-zA-Z\d]+)$ index.php?url=$1&%{QUERY_STRING}
```