---
title: 解决无法用 localhost 连接 MySQL
id: 1316
comment: false
categories:
  - 后端
date: 2016-12-23 00:17:27
time: 201612230017
tags:
  - MySQL
  - PHP
---

今天尝试往云主机上迁移博客，遇到不少麻烦，其中就包括无法用 localhost 连接 MySQL 。用了一个晚上才得以解决，记录一下解决过程。

第一步，检查 `/etc/hosts` 文件。确认 localhost 已映射到 127.0.0.1 ，否则添加正确的映射。<!--more-->经检查，确定 hosts 设置没有问题。

```
127.0.0.1    localhost
```

第二步，尝试直接用 `mysql`命令登录。登录时指定主机为 localhost 。若无法登录，检查 MySQL 中的用户权限等设置。经测试，命令行可以登录，只是用 PHP 无法连接，基本锁定是 PHP 相关设置问题。

```
mysql -uusername -hlocalhost -ppassword
```

第三步，由于使用 localhost 和 127.0.0.1 连接数据库的机制不同，前者因使用 socket 而需要保证 .sock 文件路径配置正确。我的 php.ini 文件中设置的 socket 文件路径为空，这就是问题所在。编辑 php.ini 文件，根据使用的数据库连接拓展修改相应的设置，指向的 .sock 文件的路径应该和编译安装 MySQL 时设置的一致。

```
mysql.default_socket     = /usr/local/mysql5.6/mysql.sock
mysqli.default_socket    = /usr/local/mysql5.6/mysql.sock
pdo_mysql.default_socket = /usr/local/mysql5.6/mysql.sock
```

相关环境：Aliyun ECS / CentOS 7 x64 / Apache 2.4 / MySQL 5.6 / PHP 7.1

 