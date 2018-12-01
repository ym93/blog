---
title: PHP 使用 Guzzle 发送 http 请求
categories:
  - 后端
date: 2017-05-03 18:41:44
tags:
  - PHP
---

Guzzle 是一个开源的 PHP HTTP 客户端，同时支持同步和异步方法。使用它可以轻松发送 GET、POST 请求，实现和第三方服务器的通信。

<!-- more -->

### 安装

使用 Composer 安装依赖包。

```
composer require guzzlehttp/guzzle
```

### 使用

在控制器中新建一个 Client （HTTP 客户端）对象。

``` php
$client = new \GuzzleHttp\Client();
```

调用 Client 对象的 `request` 方法发送 HTTP 请求。

``` php
$res = $client->request('get', 'http://www.example.com');
```

使用 `getBody` 等方法可以获取响应的内容。

``` php
// 获取状态码
$res->getStatusCode();

// 获取头部信息
$res->getHeaderLine('content-type');

// 获取打印内容
$res->getBody();
```

### 参数

要在 GET 请求时传递参数，除了把参数直接写进链接，还可以把参数放到 `query` 数组中。

``` php
$client->request('GET', 'http://www.example.com', [
  'query' => [
    'email' => 'hi@caiyiming.com'
  ]
]);
```

`form_params` 数组用于设置 POST 请求的参数。

``` php
$client->request('POST', 'http://www.example.com', [
  'form_params' => [
    'email' => 'hi@caiyiming.com'
  ]
]);
```

### 头部

`header` 数组用于设置 HTTP 请求的头部信息。

``` php
$client->request('GET', 'http://www.example.com', [
  'headers' => [
    'User-Agent' => 'Mozilla/5.0'
  ]
]);
```

### 异步

`sendAsync` 方法用于发送异步请求，`then` 方法用于设置回调函数。

``` php
$request = new \GuzzleHttp\Psr7\Request('GET', 'http://www.example.com');
$promise = $client->sendAsync($request)->then(function ($response) {
  // 请求完成后的操作
  $response->getBody();
});
$promise->wait();
```

相关环境：Windows 7 x64 / VirtualBox 5.1.8 / Laravel Homestead / Lumen 5.3