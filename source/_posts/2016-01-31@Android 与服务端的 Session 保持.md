---
title: Android 与服务端的 Session 保持
categories:
  - 安卓
date: 2016-01-31 20:07:54
tags:
  - Android
  - Java
  - PHP
  - Session
---

在开发联网应用的过程中，有时候会希望 php 服务端能通过 Session 保存一些信息，以便随时验证客户端的登录状态，或完成其它功能。但实际操作中发现，Android 客户端每次请求服务端都被视为一个新的请求，SessionID 都会改变，也就是说根本没办法使用 Session 存储和读取信息。

<!-- more -->

我们可以通过保存 SessionID 、请求服务端的同时传递 SessionID 来解决这个问题，让服务器知道两次请求来自同一个客户端。

发送请求并保存 SessionID ：

``` java
URL url = new URL(link);
HttpURLConnection conn= (HttpURLConnection)url.openConnection(); conn.connect();
// 获得 SessionID
String cookieval = conn.getHeaderField("set-cookie");
String sessionid;
if(cookieval != null) {
  sessionid = cookieval.substring(0, cookieval.indexOf(";"));
}
```

可以将 SesshinID 通过全局变量或者 SQLite 数据库保存下来，方便以后请求时调用。

请求链接的同时发送 SessionID ：

``` java
URL url = new URL(link);
HttpURLConnection conn= (HttpURLConnection)url.openConnection();
conn.setRequestProperty("cookie", UtilGlobalVariable.sessionId);
conn.connect();
```