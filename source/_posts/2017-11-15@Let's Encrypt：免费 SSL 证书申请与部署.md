---
title: Let's Encrypt：免费 SSL 证书申请与部署
date: 2017-11-15 14:32:17
categories:
  - Web Back-end
tags:
  - SSL
  - HTTPS
  - Nginx
  - Let's Encrypt
  - ACME
---

为了启用网站的 HTTPS 功能，需要向证书颁发机构（CA）申请证书。[Let's Encrypt](https://letsencrypt.org/) 是一家 CA，同时也是一个由公益组织运营的项目，致力于普及安全链接。其颁发的免费 SSL 证书有三个月的有效期（不限次数免费续期），目前已得到包括 Chrome、Firefox 在内的所有主流浏览器的信任。

<!-- more -->

{% img /images/posts/2017/11/lets_encrypt_logo.png 360 %}

Let's Encrypt 基于 ACME 协议验证你对一个域名的控制权。以 GetSSL （Let's Encrypt 的客户端程序）为例，假设你的域名为 `yourdomain.com`，GetSSL 将随机生成一个页面，然后由 CA 服务器访问这个页面，我们假设这个页面的链接为 `https://yourdomain.com/token` 。如果可以访问，CA 服务器就会颁发该域名的 SSL 证书。


### 获取 GetSSL

Let's Encrypt 官网介绍了超过 50 种客户端程序，全部由第三方开发，都可以用于申请证书。而我选择的是上文提到的 GetSSL 。注：官方推荐 [Certbot](https://certbot.eff.org/)，我试用的时候发现出错的几率蛮高的，感兴趣的话可以自行尝试。 

获取 GetSSL ： 


```
cd ~
git clone https://github.com/srvrco/getssl.git
cd getssl
```


### 配置 GetSSL

执行命令生成配置文件，注意把 `yourdomain.com` 替换成你的域名。

```
./getssl -c yourdomain.com
```

执行后将生成 GetSSL 的全局配置文件 `~/.getssl/getssl.cfg` ，及当前域名的配置文件 `~/.getssl/yourdomain.com/getssl.cfg` 。

``` sh
# 日志
# 创建全局配置文件
creating main config file /root/.getssl/getssl.cfg
# 创建域名配置文件
Making domain directory - /root/.getssl/yourdomain.com
creating domain config file in /root/.getssl/yourdomain.com/getssl.cfg
```

编辑全局配置文件。由于默认的 CA 服务器仅用于测试，颁发的证书是不受浏览器信任的，需要修改成颁发完整证书的服务器。`RELOAD_CMD` 用于在证书颁发后自动重载 Web 服务器，使证书生效，非必填项。

``` sh
# 证书服务器地址
CA="https://acme-v01.api.letsencrypt.org"

# 服务器重载命令
RELOAD_CMD="service nginx reload"
```


编辑当前域名的配置文件。`ACL(Acme Challenge Location)` 是用于产生随机校验文件的路径，将 `/path/to/your/website/folder/` 改成你的网站根目录的绝对路径。接着配置文件的保存路径。


``` sh
# 校验路径
ACL=('/path/to/your/website/folder/.well-known/acme-challenge')

# 保存路径
DOMAIN_PEM_LOCATION="/etc/ssl/yourdomain.com.pem" # 证书文件路径
DOMAIN_KEY_LOCATION="/etc/ssl/yourdomain.com.key" # 私钥文件路径
```

Tips: `DOMAIN_CERT_LOCATION` 和  `DOMAIN_PEM_LOCATION` 都可以配置证书文件路径，后者保存的证书包含证书链。如果不慎删除，可以在 `~/.getssl/yourdomain.com/archive` 找到每次签发的文件存档。

### 配置 Nginx

配置你的 Web 引擎。这是在 Nginx 上启用并强制使用 HTTPS 访问的配置参考，`ssl_certificate` 和 `ssl_certificate_key` 指向上面配置的文件保存路径。

```
server {
  listen 80;
  listen 443 ssl http2;
  ssl_certificate /etc/ssl/yourdomain.com.pem;
  ssl_certificate_key /etc/ssl/yourdomain.com.key;
  ssl_session_timeout 5m;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;
  if ($ssl_protocol = "") { return 301 https://$host$request_uri; }
  ...
}
```


### 申请证书

执行命令申请 SSL 证书。

```
cd ~/getssl
./getssl yourdomain.com
```


若所有配置正确，网站的 HTTPS 应该已经生效。别忘了在你的 Web 服务器（Apache、Nginx 或 Lighttpd）上启用 SSL ，并指向刚刚申请的证书路径。

``` sh
# 日志
# 创建随机校验文件
copying challenge token to /path/to/your/website/folder/.well-known/acme-challenge/2ALrFFPercPe1i9-jA-_DBEJqlrPevCIf0Fzdk3HjWI
Pending
# 验证是否可以访问
Verified yourdomain.com
# 获取并保存证书
Verification completed, obtaining certificate.
Certificate saved in /root/.getssl/yourdomain.com/yourdomain.com.crt
The intermediate CA cert is in /root/.getssl/yourdomain.com/chain.crt
copying domain certificate to /etc/ssl/yourdomain.com.crt
copying private key to /etc/ssl/yourdomain.com.key
copying CA certificate to /etc/ssl/chain.crt
# 重启 Web 服务器
reloading SSL services
Reloading nginx configuration (via systemctl):             [  OK  ]
yourdomain.com - certificate installed OK on server
certificate obtained for yourdomain.com
```

Tips: 如遇到 `getssl: this script requires one of: nslookup drill dig host` 错误，尝试安装依赖包。

```
yum install bind-utils

```

### 撤销证书

执行 `getssl -r path/to/cert path/to/key [CA_server]` 命令可以申请撤销已颁发的证书。需要指定证书和私钥文件的路径。`CA_server` 用于指定 CA 服务器，一般不需要填写。

```
./getssl -r /etc/ssl/yourdomain.com.crt /etc/ssl/yourdomain.com.key
 ```

### 自动续期

执行 `crontab -e` 编辑任务调度文件。添加一个任务。这样，GetSSL 将在每天凌晨检查一次，自动续期或更新证书版本。注意，不要删除 GetSSL 脚本文件。

``` sh
23 5 * * * /root/getssl -u -a -q
```


相关环境：Aliyun ECS / CentOS 7 x64 / Nginx 1.12