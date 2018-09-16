---
title: Laravel 使用 SMTP 发送邮件
id: 1153
comment: false
categories:
  - 后端
date: 2016-11-06 16:01:44
time: 201611061601
tags:
  - Laravel
  - SMTP
---

Laravel 基于 SwiftMailer 库提供了一套邮件 API 。我在阅读文档后尝试使用 SMTP 发送邮件，并测试成功，下面简单记录一下过程。
<!--more-->

第一步，修改 .env 文件中的邮件设置，包括邮件驱动、服务器地址、端口、用户名、密码。邮件驱动自然是 smtp ，其他选项根据你的邮箱填写。

```
MAIL_DRIVER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=25
MAIL_USERNAME=example@example.com
MAIL_PASSWORD=example
```

第二步，创建一个视图文件，作为邮件正文的来源。例如，我新建了 resources/views/emails/content.blade.php 并在里面添加了一些文本。

第三步，在控制器中调用 Mail 门面的 `send` 方法发送邮件。

``` php
// 导入命名空间
use Mail;
```

``` php
Mail::send('emails.content', ['data'=>$data], function($m)use($email) {
  // 设置发件邮箱、发件姓名、收件邮箱
  $m->from('example@example.com','Example'])->to($email);
  // 设置邮件标题
  $m->subject('Subject');
});
```

`send` 方法的第一个参数是要引用的视图，第二个参数是要传给视图的参数，第三个参数是用来设置邮件的匿名函数。`send` 方法始终返回1，无论 SMTP 服务器最终是否发送成功，这点我是使用一个不可能存在的收件地址测试的，说明其返回值仅表示成功与服务器通信。

对于传给视图的参数，可以这样在视图文件中输出：（参考 Blade 模板引擎用法）

```
密码重置链接：{{ $data }}
```

另外，在匿名函数中设置邮件时，你可以使用 `env`方法引用 .env 文件中的参数。这样，如果以后需要更换 SMTP 账号，只需修改 .env 文件即可。

``` php
$m->from(env('MAIL_USERNAME'), env('CUS_MAILALIAS'));
```

相关环境：Windows 7 x64 / VirtualBox 5.1.8 / Laravel Homestead / Laravel 5.2