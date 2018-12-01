---
title: Linux 编译安装 MySQL5.6
categories:
  - 后端
date: 2016-12-15 15:31:58
tags:
  - MySQL
  - Linux
---

第一步，安装依赖。包括编译工具和需要用到的库。

```
yum -y install make gcc-c++ cmake bison-devel  ncurses-devel perl-Module-Install.noarch
```
<!-- more -->

第二步，从 [官网](http://www.mysql.com/) 下载并解压 MySQL 源码（Source Code）的压缩包。

```
wget http://dev.mysql.com/get/Downloads/MySQL-5.6/mysql-5.6.35.tar.gz
tar xvf mysql-5.6.35.tar.gz
cd mysql-5.6.35
```

第三步，简单配置并编译安装 MySQL 。更多配置项可参阅官方文档。

```
cmake \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql5.6 \
-DMYSQL_DATADIR=/usr/local/mysql5.6/data \
-DMYSQL_UNIX_ADDR=/usr/local/mysql5.6/mysql.sock \
-DDEFAULT_CHARSET=utf8 \
-DDEFAULT_COLLATION=utf8_general_ci
make
make install
```

第四步，创建系统账户，然后赋予数据库文件存放目录的使用权限。`data` 目录的位置可以自行修改，但必须与配置 MySQL 时设置的 `DMYSQL_DATADIR` 一致。

```
groupadd mysql
useradd -g mysql mysql
chmod 755 /usr/local/mysql5.6/data
chown –R mysql:mysql /usr/local/mysql5.6/data
```

第五步，执行 MySQL 的初始化脚本。这一步将创建一些必要的数据库和数据表。

```
cd /usr/local/mysql5.6
scripts/mysql_install_db --basedir=/usr/local/mysql5.6 --datadir=/usr/local/mysql5.6/data --user=mysql
```

第六步，添加服务并设置开机运行，启动 MySQL 。

```
cp support-files/mysql.server /etc/init.d/mysql
chkconfig mysql on
service mysql start
```

第七步，配置环境变量。使用编辑器编辑 /etc/profile ，在末尾添加以下内容，保存，然后执行 `source /etc/profile` 使设置立即生效。

```
# MySQL
export PATH=$PATH:/usr/local/mysql5.6/bin
```

第八步，执行 `mysql` 命令登录 MySQL 。

相关环境：Aliyun ECS / CentOS 7 x64