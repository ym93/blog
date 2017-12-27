---
title: WampServer 配置虚拟主机
id: 1190
comment: false
categories:
  - 后端
date: 2016-11-21 14:14:18
time: 201611211414
tags:
  - WampServer
---

WampServer 默认创建一个站点，以 www 目录作为网站的根目录，通过 `http://localhost/` 访问。通过修改配置文件可以创建虚拟主机，即实现多站点。
<!--more-->

第一步，启用 Apache 的 mod_rewrite 模块。打开配置文件 bin\apache\apache2.4.9\conf\httpd.conf ，找到下行并去掉前面的 `#` 号。

```
LoadModule rewrite_module modules/mod_rewrite.so
```

第二步，启用虚拟主机配置文件。同样是在 httpd.conf 文件中，找到下行并去掉前面的 `#` 号。

```
Include conf/extra/httpd-vhosts.conf
```

第三步，修改虚拟主机配置文件。打开 bin\apache\apache2.4.9\conf\extra\httpd-vhosts.conf ，该文件中已包含示例，直接修改即可。

```
<VirtualHost *:80>
    DocumentRoot "d:/vhosts/example" // 文件目录
    ServerName example.com // 绑定域名
</VirtualHost>
```

第四步，允许访问文件目录。如果虚拟主机的文件目录不在 www 目录下，继续编辑 httpd-vhosts.conf 文件，添加 `<Directory>` 标签中的内容。

```
<VirtualHost *:80>
	DocumentRoot "d:/vhosts/example"
	ServerName example.com
	<Directory "d:/vhosts/example">
		Options Indexes FollowSymLinks
		AllowOverride all
		Require local
	</Directory>
</VirtualHost>
```

第五步，将域名指向本机。编辑 C:\Windows\System32\drivers\etc\hosts 文件，添加以下内容，表示由本机响应对 `example.com` 的访问。

```
127.0.0.1       example.com
```

最后，重启 WampServer 即可。

ENV: Windows 7 x64 / WampServer 2.5