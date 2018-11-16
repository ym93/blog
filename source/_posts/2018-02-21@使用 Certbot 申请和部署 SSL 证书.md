---
title: 使用 Certbot 申请和部署 SSL 证书
date: 2018-02-21 16:38:45
categories:
  - 后端
tags:
  - SSL
  - HTTPS
  - Nginx
  - Let's Encrypt
  - ACME
  - Certbot
---

去年写过一篇文章介绍 Let's Encrypt 免费证书，以及申请和部署的过程。最近又为站点上 HTTPS，发现官方推荐的 [Certbot](https://certbot.eff.org/) 客户端确实更好用，几乎全自动完成证书的申请、部署和更新。

<!-- more -->

### 安装

首先启用 EPEL（企业版 Linux 附加软件包）源：

```
yum -y install yum-utils
yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
```

安装 Certbot 客户端：

```
yum install certbot-nginx
```

### 使用

申请和部署 SSL 证书：

```
certbot --nginx
```

Cerbot 将分析 Nginx 的配置文件（默认为 `/etc/nginx/nginx.conf` ），然后自动完成证书的申请和部署，包括修改 Nginx 配置文件并重启服务。这也是我之前一直遇到错误的问题所在：如果 Nginx 的安装目录不是 `/etc/nginx` ，Cerbot 找不到配置文件就会报错。

所以，需要使用 `--nginx-server-root` 指定配置文件的路径：

```
certbot --nginx --nginx-server-root=/usr/local/nginx/conf
```

然后根据提示选择你要启用 HTTPS 的站点，等待证书部署完成。

如果只希望 Cerbot 申请证书但不自动部署，使用 `certonly` 子命令：

```
certbot --nginx certonly
```

### 续期

测试证书更新命令是否正常：

```
certbot renew --dry-run
```

执行 `crontab -e` 编辑任务调度文件，添加一个任务，定期检测证书的有效期并自动更换新的证书。

```
0 5 * * * certbot renew
```

相关环境：Aliyun ECS / CentOS 7 x64 / Python 2.7 / Nginx 1.12
