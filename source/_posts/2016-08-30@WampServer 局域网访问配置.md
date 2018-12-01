---
title: WampServer 局域网访问配置
categories:
  - 后端
date: 2016-08-30 12:11:44
tags:
  - Apache
  - WampServer
---

让局域网内的其他设备（如 Pad 、手机）可以访问 WampServer 上的内容，将会非常便于测试不同设备的浏览效果。要做到这点，需要修改 Apache 配置文件，使服务器允许被局域网内的设备访问。

<!-- more -->

1、如果未在 WampServer 中配置虚拟主机过的情况下，直接在 http.conf 中找以下字段，一般在 `<Directory>` 标签内。将 Require local 修改为 Require all granted 即可。重启服务器后，局域网内的其他设备通过 IP 地址（如 192.168.1.1 ）访问。由于我的 WampSever 已配置过虚拟主机，未测试实际效果。

```
# onlineoffline tag - don't remove
  Require all granted
```

2、如果 WampServer 已经配置了虚拟主机，在 httpd-vhosts.conf 中修改虚拟主机的配置。同样是将 Require local 修改为 Require all granted ，如果没有 `<Directory>` 标签就自己写一个。另外，修改端口号。重启服务器后，其他设备通过IP+端口号（如 192.168.1.1:8080 ）访问。

```
<VirtualHost *:8080>
  ServerName example.com
  DocumentRoot C:/vhost/example.com
  <Directory  "C:/vhost/example.com">
    Options +Indexes +FollowSymLinks +MultiViews
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

此时局域网内的所有设备都可以通过IP+端口号访问这个项目，但服务器本机反而无法通过 hosts 绑定域名访问了。即使在 hosts 中添加相应端口号也无效。

```
// 这是无效的
127.0.0.1:8080 example.com
```

解决方法是在 httpd-vhosts.conf 中添加一个80端口的虚拟主机，仍然指向同一个项目路径。然后在 hosts 中做正常的域名绑定。PC 端就可以正常使用域名访问这个项目了。

```
<VirtualHost *:80>
  ServerName example.com
  DocumentRoot C:/vhost/example.com
</VirtualHost>
```

```
127.0.0.1    example.com
```