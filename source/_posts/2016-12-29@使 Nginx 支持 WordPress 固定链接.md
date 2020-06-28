---
title: 使 Nginx 支持 WordPress 固定链接
categories:
  - Other
date: 2016-12-29 13:29:12
tags:
  - WordPress
  - Nginx
---

昨天把博客从虚拟主机迁移到了云主机，同时也将引擎由 Apache 更换成了 Nginx 。迁移过程基本顺利，仅出现 WordPress 的“固定链接”功能无法正常使用，导致文章不能正常浏览。

<!-- more -->

在阅读官方文档后，问题已解决。编辑当前站点的 .conf 文件，在 `server` 内添加以下内容，然后重启 Web 服务即可。

```
location / {
  try_files $uri $uri/ /index.php?$args;
}
```

附 WordPress 提供的 Nginx 配置示例。

```
server {
  ## Your website name goes here.
  server_name domain.tld;
  ## Your only path reference.
  root /var/www/wordpress;
  ## This should be in your http block and if it is, it's not needed here.
  index index.php;

  location = /favicon.ico {
    log_not_found off;
    access_log off;
  }

  location = /robots.txt {
    allow all;
    log_not_found off;
    access_log off;
  }

  location / {
    # This is cool because no php is touched for static content.
    # include the "?$args" part so non-default permalinks doesn't break when using query string
    try_files $uri $uri/ /index.php?$args;
  }

  location ~ \.php$ {
    #NOTE: You should have "cgi.fix_pathinfo = 0;" in php.ini
    include fastcgi.conf;
    fastcgi_intercept_errors on;
    fastcgi_pass php;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires max;
    log_not_found off;
  }
}
```

相关环境：Aliyun ECS / CentOS 7 x64 / Nginx 1.8 / PHP 5.6 / WordPress 4.7