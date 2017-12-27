---
title: 使用 Shadowsocks 搭建私有 VPN
date: 2017-08-07 23:09:04
time: 201708072309
categories:
  - 其他
tags:
  - Shadowsocks
  - Proxy
  - VPN
---

Shadowsocks 是一种基于 SOCKS5 协议的代理工具，可以帮助我们实现科学上网。虽然 Shadowsocks 的本质并不是 VPN ，但是在移动端它工作在 VPN 模式下，我们可以使用它搭建自己的 VPN 服务器。

<!-- more -->

{% img /images/posts/2017/2017-08-07@others-shadowsocks.png 480 使用 YouTube 观看 NASA 太空直播（720P ） %}

Shadowsocks 包含服务端和客户端。服务端运行在你的服务器上（位于海外），客户端运行在你的电脑或手机上。简单地说，当你要访问 Google 的时候，实际上由服务端访问 Google 并将其得到的内容返回到客户端。

我试用一天后发现，无论是连通率还是速度，Shadowsocks 的效果都比收费 VPN 软件好太多了。使用自己的服务器还可以独享带宽、随时更换节点，可以说是相当灵活了。

### 准备

首先，需要准备一台位于海外的云主机作为代理服务器，它将作为我们与墙外世界沟通的桥梁。

我在 Vultr 上仅花费 $5（约合人民币 35 元）购买了一台位于东京的云主机（一个月），感觉速度一般，后来换成了洛杉矶节点。节点的选择是因人而异的，只能说在我的网络环境下，使用洛杉矶的服务器速度更快。

然后，你需要具备基本的远程登录和操作 Linux 系统的能力，这就够了。

### 安装

安装 vim 编辑器。

``` sh
yum install -y vim
```

Shadowsocks 服务端基于 Python ，检查本机是否已安装 Python 环境（2.6/2.7）。

``` sh
python --version
```

下载并安装 Python 包管理工具 pip 。

``` sh
wget https://bootstrap.pypa.io/get-pip.py
python get-pip.py
```

使用 pip 安装 Shadowsocks 服务端。

``` sh
pip install shadowsocks
```

### 使用

前台启动 Shadowsocks 服务器。`-p 443` 表示服务使用 443 端口，`-k password` 表示登录密码为 password ，`-m rc4-md5` 表示使用 rc4-md5 加密（一种低安全性、高性能的加密方式）。

``` sh
ssserver -p 443 -k password -m rc4-md5
```

后台启动 Shadowsocks 服务器，参数含义与前台启动的命令相同。后台启动的好处是不会在命令行打印访问日志，也不影响我们进行其他操作。

``` sh
ssserver -p 443 -k password -m rc4-md5 --user nobody -d start
```

检查防火墙是否已开放相应的端口。

``` sh
firewall-cmd --list-ports
```

若端口未开放，执行以下命令开放端口。`--add-port=443/tcp` 表示开放 443 端口，`--permanent` 表示永久有效，否则设置将在服务器重启后失效。

``` sh
firewall-cmd --zone=public --add-port=443/tcp --permanent
```

重启防火墙使设置生效。

``` sh
firewall-cmd --reload
```

按 `Ctrl+C` 可以停止前台服务器，执行以下命令可以停止后台服务器。

``` sh
ssserver -d stop
```

### 多用户

Shadowsocks 支持不同用户使用不同的端口、密码登录。

首先，创建或编辑配置文件。

``` sh
vim /etc/shadowsocks.json
```

插入以下配置内容后保存。注意，`server` 的值应该填写主机的外网 IP 。`port_password` 的值是一个 JSON 对象，每一组键值分别填写端口号和密码。`timeout` 填写超时时间。`method` 填写加密方式，这里使用默认的 aes-256-cfb 加密。

``` json
{
  "server": "0.0.0.0",
  "port_password": {
    "8381": "foobar1",
    "8382": "foobar2",
    "8383": "foobar3",
    "8384": "foobar4"
  },
  "timeout": 300,
  "method": "aes-256-cfb"
}
```

别忘了让防火墙开放上述的 4 个端口。

前台启动加载配置文件的 Shadowsocks 服务器。

``` sh
ssserver -c /etc/shadowsocks.json
```

后台启动加载配置文件的 Shadowsocks 服务器。

``` sh
ssserver -c /etc/shadowsocks.json -d start
```

停止后台服务器。

``` sh
ssserver -c /etc/shadowsocks.json -d stop
```

### 客户端

服务端已经准备完毕，接下来需要在我们的设备上用客户端连接服务器。

在 Github 上下载 Shadowsocks 客户端的 [Windows](https://github.com/shadowsocks/shadowsocks-windows/releases) 版本和 [Android](https://github.com/shadowsocks/shadowsocks-android/releases) 版本，iOS 版本可以通过 AppStore 安装。需要其他平台的客户端，可以在科学上网后访问 [官网](https://shadowsocks.org/) 下载。

Shadowsocks 客户端的使用非常简单。在客户端中“添加服务器”，正确填写服务器的地址、端口、密码和加密方式，然后就可以连接服务端了。

ENV: Vultr Cloud Compute / CentOS 7 x64 / Python 2.7.5