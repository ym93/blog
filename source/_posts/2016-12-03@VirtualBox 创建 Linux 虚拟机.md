---
title: VirtualBox 创建 Linux 虚拟机
id: 1237
comment: false
categories:
  - 后端
date: 2016-12-03 12:45:17
time: 201612031245
tags:
  - 虚拟机
---

第一步，下载 CentOS 镜像。[访问](http://www.centos.org) CentOS 官方网站，下载 ISO 镜像文件。

第二步，新建虚拟机。在 VittualBox 中点击“新建”，设置名称为“CentOS”。<!--more-->可以看到类型和版本已被 VirtualBox 自动改成了“Linux”和“Red Hat (64-bit)”。一路继续直到创建完成即可。

第三步，安装 CentOS 系统。在 VittualBox 中点击“启动”，选中本地镜像文件并启动，在字符界面中使用方向键选中“Install CentOS 7”后回车。在随后出现的图形界面中，设置语言为简体中文，在安装位置中选择本地标准磁盘，在网络和主机名中开启以太网，然后开始安装。

第四步，完成 CentOS 配置。设置 ROOT 密码并创建用户，然后点击“完成配置”，等待 CentOS 配置完成后重启即可。

相关环境：Windows 7 x64 / VirtualBox 5.1.8