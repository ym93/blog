---
title: Linux 编译安装 Apache2.4
categories:
  - 后端
date: 2016-12-13 15:10:53
tags:
  - Apache
  - Linux
---

第一步，确认系统中已安装 C 、C++ 编译器，否则运行 yum 命令安装。

```
yum install -y gcc gcc-c++
```
<!-- more -->

第二步，编译安装依赖。包括 APR、APR-Util、PCRE 。

```
wget http://mirrors.ustc.edu.cn/apache/apr/apr-1.5.2.tar.gz
tar xvf apr-1.5.2.tar.gz
cd apr-1.5.2
./configure --prefix=/usr/local/apr
make
make install
```

```
wget http://mirrors.ustc.edu.cn/apache/apr/apr-util-1.5.4.tar.gz
tar xvf apr-util-1.5.4.tar.gz
cd apr-util-1.5.4
./configure --prefix=/usr/local/apr-util -with-apr=/usr/local/apr/bin
make
make install
```

```
wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.38.tar.gz
tar xvf pcre-8.38.tar.gz
cd pcre-8.38
./configure --prefix=/usr/local/pcre
make 
make install
```
第三步，编译安装 Apache 。

```
wget http://mirrors.ustc.edu.cn/apache/httpd/httpd-2.4.23.tar.gz
tar xvf httpd-2.4.23.tar.gz
cd httpd-2.4.23
./configure --prefix=/usr/local/apache2.4 --with-apr=/usr/local/apr --with-apr-util=/usr/local/apr-util/ --with-pcre=/usr/local/pcre
make
make install
```

第四步，修改配置文件。使用编辑器打开 Apache 的配置文件 httpd.conf ，搜索关键字 `#ServerName`，添加域名并去除注释。

```
vim /usr/local/apache2.4/conf/httpd.conf
```

```
ServerName localhost:80
```

第五步，测试是否安装成功。执行以下代码，若提示 _httpd already running_ ，表示安装成功。此时使用浏览器访问服务器的 IP 地址，屏幕将输出 _It works!_ 。

```
/usr/local/apache2.4/bin/apachectl -k start
```

相关环境：Aliyun ECS / CentOS 7 x64