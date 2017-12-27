---
title: Homestead 开发环境配置
id: 932
comment: false
categories:
  - 后端
date: 2016-10-23 14:43:09
time: 201610231443
tags:
  - Homestead
---

Laravel Homestead 是一套完整的 PHP 开发环境，类似 WampServer 。不同的是，Homestead 运行于虚拟机之中，而 WampServer 则直接将服务端软件安装在本机上。
<!--more-->

Homestead 的安装依赖于虚拟机软件和 Vagrant 。Vagrant 是一个快速搭建开发环境的工具，类似装系统用的 Ghost ，可以直接把别人打包好的开发环境（包括系统和服务端软件），Copy/Paste 到一台设备中，省去逐一安装服务端软件的麻烦。

接下来的实践完全基于官方文档，并且已成功在 Win7 64bit 下安装了 Homestead 。

### 安装虚拟机软件

虚拟机软件可选择 VirtualBox 或 VMware ，虽然官方推荐使用效率更高的 VMware ，但为了节约时间我安装了开源且免费的 [VirtualBox](https://www.virtualbox.org/) ，版本5.1.8。

### 安装 Vagrant

访问[官网](https://www.vagrantup.com/)下载并安装 Vagrant 。

### 添加 Vagrant Box

Vagrant Box 是使用 Vagrant 将一整套开发环境打包成的 .box 镜像文件。在命令行工具中执行以下命令即可添加 Homestead 镜像，等待下载/安装完毕。如果下载失败，可参考[解决方案](http://www.caiyiming.com/article/20161024.html)。

```
vagrant box add laravel/homestead
```
 

### 安装 Homestead

使用 Git 命令拷贝 Homestead 的代码并保存到 Home 目录的 Homestead 文件夹下。命令行中的 ~ 目录即为 Home 目录，如果你不知道 Home 目录的路径，尝试在“计算机”的地址栏输入 `%homepath%` 访问。

```
cd ~
git clone https://github.com/laravel/homestead.git Homestead
```

定位到 Homestead 文件夹，创建 Homestead 配置文件。

```
cd ~/Homestead
bash init.sh
```

### 配置 Homestead

用编辑器打开 Home 目录下的隐藏文件夹 .homestead 中的 Homestead.yaml 文件，该文件为 Homestead 的配置文件。

```
# 服务器的局域网 IP 地址
ip: "192.168.10.10"

# 服务器可用内存
memory: 2048

# 服务器可用 CPU 核心数
cpus: 1

# 虚拟机软件
provider: virtualbox

# SSH 公钥
authorize: ~/.ssh/id_rsa.pub

# SSH 私钥
keys:
  - ~/.ssh/id_rsa

# 本机与虚拟机的路径关联
folders:
  - map: ~/Code
    to: /home/vagrant/Code

# 域名绑定
sites:
    - map: 192.168.10.10
      to: /home/vagrant/Code

# 默认数据库名称
databases:
    - homestead
```

_provider_ 应该根据本机已安装的虚拟机软件，设为 `virtualbox` 、 `vmware_fusion` 或 `vmware_workstation` 。_authorize/keys_ 必须与 ~/.ssh 下的对应的密钥文件名称一致。_folders_ 用于关联本机与虚拟机目录，即本机 ~/Code 路径下的文件，相当于也存在于虚拟机的代码根目录 /home/vagrant/Code 路径下，map 路径必须存在。_sites_ 关联域名与虚拟机目录，可设置多站点，此处直接关联了 IP 访问根目录。
 

运行虚拟机

在 ~\Homestead 目录下，执行该命令。

```
vagrant up
```
 

测试开发环境

写一个 PHP 文件放到 ~\Code 路径下。

``` php
echo 'Hello World!';
```

打开浏览器，访问192.168.10.10，看看浏览器是否打印出了 _Hello World!_ 。

 

ENV: Windows 7 x64 / VirtualBox 5.1.8 / Laravel Homestead / Laravel 5.2

 