---
title: Laravel 使用 JWT 实现用户认证
date: 2017-06-11 13:00:33
categories:
  - back-end
tags:
  - Laravel
  - JWT
  - API
---

JWT（JSON Web Token）是一个用于安全信息传输的开放标准。基于 JWT 的用户认证，用户只需登录一次，服务端生成 Token（令牌）并发送给客户端，客户端则在每次发送请求时携带该 Token ，服务端根据 Token 识别用户身份。

<!-- more -->

一个 JSON Web Token 是用 base64 编码的长字符串，包含了验证用户身份所需的必要信息。

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaXNzIjoiaHR0cDpcL1wvbG9jYWx
ob3N0OjgwMDFcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNDUxODg4MTE5LCJleHAiOjE0NTQ1MTYxMTksIm5iZiI6MTQ1MTg4OD
ExOSwianRpIjoiMzdjMTA3ZTQ2MDlkZGJjYzljMDk2ZWE1ZWU3NmM2NjcifQ.wyoQ95RjAyQ2FF3aj8EvCSaUmeP0KUqcCJDENNfnaT4
```

这里对 JWT 规范不加赘述，只讨论如何快速实现基于 JWT 的用户认证。如果想进一步了解 JWT 规范，建议阅读 [官方文档](https://jwt.io/) 。

### 安装

使用 Composer 安装 jwt-auth 依赖包。

```
composer require tymon/jwt-auth 0.5.*
```

### 配置

在 `config\app.php` 配置文件中，注册服务提供者和门面。

``` php
'providers' => [
  ...
  Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class
],
```

``` php
'aliases' => [
  ...
  'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
  'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class
],
```

执行以下命令发布 JWT 配置文件。该命令将在 `config` 目录下生成 `jwt.php` ，通常使用默认配置即可。

```
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
```

生成用于加密数据的密钥。

```
php artisan jwt:generate
```

### 创建

引用 `JWTAuth` 门面和异常处理类。

``` php
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
```

使用请求中的登录凭据（通常是邮箱和密码）创建 Token 。

``` php
public function authenticate(Request $request)
{
  // 获取请求中的登录凭据
  $credentials = $request->only('email', 'password');

  try {
    // 验证登录凭据并创建 Token
    if (! $token = JWTAuth::attempt($credentials)) {
      // 登录凭据无效时返回错误
      return response()->json(['error' => 'invalid_credentials'], 401);
    }
  } catch (JWTException $e) {
    // 无法正常生成 Token 时返回错误
    return response()->json(['error' => 'could_not_create_token'], 500);
  }

  // 返回创建的 Token
  return response()->json(compact('token'));
}
```

登录凭据也可以是任何用户表里存在的字段，譬如手机号和密码。

``` php
$credentials = $request->only('mobile', 'password');
```

我们还可以直接基于用户模型对象创建 Token ，满足更为个性化的认证需求。

``` php
$user = User::first();
$token = JWTAuth::fromUser($user);
return $token;
```

### 认证

在 `app\Http\Kernel.php` 中注册 JWT 提供的认证中间件。

``` php
protected $routeMiddleware = [
  ...
  'jwt.auth' => \Tymon\JWTAuth\Middleware\GetUserFromToken::class
];
```

对需要认证才能访问的路由启用该中间件。

``` php
Route::group(['middleware' => 'jwt.auth'], function () {
  ...
});
```

`jwt.auth` 中间件将会解析请求中携带的 Token 。如果找不到 Token ，则返回“token_not_provided”错误；如果 Token 已过期，则返回“token_expired”错误。


客户端在请求的头部信息或 URL 中携带有效的 Token 即可通过认证。

```
Authorization: Bearer { Token }
```

```
https://api.example.com/example?token={ Token }
```

服务端可以从 Token 中获得用户对象。

``` php
$user = JWTAuth::parseToken()->authenticate();
```

相关环境：Windows 7 x64 / VirtualBox 5.1.8 / Laravel Homestead / Laravel 5.4