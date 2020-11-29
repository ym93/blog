---
title: 手动下载和安装 Homestead
categories:
  - back-end
date: 2016-10-24 14:09:43
tags:
  - Homestead
---

在配置 Homestead 开发环境的过程中，执行以下命令将下载1G左右的镜像文件（Vagrant Box），然后安装包含完整 Homestead 环境的虚拟机。由于资源服务器位于海外，经常导致下载速度缓慢、下载失败等问题。

<!-- more -->

```
vagrant box add laravel/homestead
```

我们可在命令行中找到 _box: Downloading_ 开头的一行，后面就是 Vagrant Box 文件的下载链接。将链接复制到迅雷等工具下载，得到拓展名为 box 的镜像文件。

```
vagrant box add laravel/homestead
==> box: Loading metadata for box 'laravel/homestead'
...
box: Downloading:  https://atlas.hashicorp.com/laravel/boxes/homestead/versions/0.5.0/providers/virtualbox.box
```

然后选择以下任意一种方式安装虚拟机。


### 方法一

第一步，执行以下命令通过刚刚下载的镜像文件添加虚拟机。

```
# Linux
vagrant box add laravel/homestead ~/virtualbox.box

# Windows
vagrant box add laravel/homestead file:///d:/virtualbox.box
```

注意，此时通过 `vagrant up` 命令启动虚拟机时，仍会下载镜像文件。这是因为 Vagrant 认为该虚拟机的版本过低，于是自动下载最新版本的镜像（即使刚刚离线安装的虚拟机已是最新版）。

第二步，解决版本识别错误问题。只需修改 Vagant 的索引文件即可解决，该文件参考路径如下。

```
C:\Users\YIMING\\.vagrant.d\data\machine-index\index
```

```
"box":{
	"name":"laravel/homestead",
	"provider":"virtualbox",
	"version":"0.5.0"}
}
```

该方法需目录下已存在 index 文件可供修改，或者你已经很熟悉这个文件的格式。index 文件以 JSON 格式存储着已（通过Vagrant）安装的虚拟机的信息。将 version 字段修改为可用的版本号即可，然后再次尝试 `vagrant up` 启动虚拟机。

### 方法二

第一步，执行 `vagrant box add laravel/homestead` 触发下载镜像文件，然后马上按 Ctrl+C 取消。

第二步，在 ~\\.vagrant.d\tmp 目录下找到下载时生成的缓存文件。文件名类似：

```
boxb1926d351572dd849646d59563156601f026e2a5
```

第三步，将之前手动下载的镜像文件重命名为缓存文件的文件名，并覆盖缓存文件。

第四步，执行 `vagrant box add laravel/homestead` ，下载进度将直接显示为100%，并开始添加虚拟机。

简单总结一下。这两种方法都是我探索后发现的、退而求其次地安装 Homestead 虚拟机的方法。前者直接用命令通过本地镜像安装，但会出现 Vagrant 认错版本的尴尬（或许日后的版本更新可以修复）。后者则用本地镜像文件，替换掉缓存文件，欺骗 Vagrant 下载已完成从而执行安装。后者不需要纠正版本识别错误。

相关环境：Windows 10 x64 / VirtualBox 5.1.8 / Laravel Homestead