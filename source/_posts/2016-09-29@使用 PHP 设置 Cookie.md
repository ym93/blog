---
title: 使用 PHP 设置 Cookie
categories:
  - back-end
date: 2016-09-29 14:42:33
tags:
  - PHP
  - Cookie
---

近期使用 Cookie 实现网站的登陆保持功能，期间也遇到一些问题。

1、新建

``` php
setcookie(name,value,expire,path,domain,secure)
```
<!-- more -->

使用 `setcookie` 方法新建 cookie 。必需参数：name ，Cookie 的名称；value ，Cookie值。可选参数：expire ，Cookie 的过期时间；path ，Cookie 的服务器路径；domain ，Cookie 的域名；secure ，是否使用安全链接。

例如，创建一个名称为 email ，值为 exaple@example.com ，两星期后过期的 Cookie ，网上普遍的写法是这样的：

``` php
setcookie('email','exaple@example.com',time()+2*7*24*3600);
```
但我在本地服务器测试时，出现 Cookie 跨页丢失问题，即同一网站A页面创建的 Cookie 只在A页面有效，在B页面无法读取值。于是我增加了第四个参数，解决了该问题。

``` php
setcookie('email','exaple@example.com',time()+2*7*24*3600,'/');
```

2、读取

``` php
$_COOKIE['email'];
```
没什么好说的，和读取 Session 一样。使用时最好加 isset 方法判断先该 Cookie 存在，否则容易报错。

3、删除

```
setcookie('email','',time()-3600,'/');
```

要删除一个 Cookie ，设置其过期时间早于当前时间即可。