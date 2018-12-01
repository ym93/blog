---
title: BAE 实现 WordPress 固定链接
categories:
  - 后端
date: 2017-04-17 00:54:05
tags:
  - WordPress
---

最近试用百度应用引擎（BAE）部署站点。BAE 优势非常明显，便宜、按需升降配、支持 Git ，很适合部署小项目。我试着在上面安装了 WordPress ，发现无法正常使用伪静态功能，开启固定链接后大部分页面都报404错误。

<!-- more -->

BAE 使用的 Web 引擎是 lighttpd ，站点配置文件为应用根目录下的 app.conf 文件。

编辑 app.conf 文件增加适用于 WordPress 的配置：

``` yaml
handlers:

  # 静态资源路由
  - url : /(assets)/(.*)
    static_files : assets/$2

  # 基本路由规则
  - url : /
    script: index.php
  - regex_url : ^/(wp-.+).*/?
    script : $0
  - regex_url : ^/(sitemap.xml)
    script : $0
  - regex_url : ^/(xmlrpc.php)
    script : $0
  - regex_url : ^/(.+)/?$
    script : index.php/$1
```

部署代码后到 WordPress 后台，重新设置一次固定链接即可生效。

ENV: Baidu App Engine / PHP 5.5 / WordPress 4.7