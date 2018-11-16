---
title: 解决 json_encode 中文乱码
id: 802
comment: false
categories:
  - 后端
date: 2016-09-10 17:29:00
tags:
  - PHP
  - JSON
---

如果用 json_encode 将一个包含中文的数组转换成 JSON 格式数据，会发现中文部分全部变成了乱码。PHP 5.4+ 可以通过在使用 `json_encode` 时增加参数 JSON_UNESCAPED_UNICODE 解决。

<!-- more -->

``` php
json_encode($arr, JSON_UNESCAPED_UNICODE);
```

这样得到的 JSON 数据就不会出现中文乱码的问题了。