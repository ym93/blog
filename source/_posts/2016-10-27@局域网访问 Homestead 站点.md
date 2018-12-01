---
title: 局域网访问 Homestead 站点
categories:
  - 后端
date: 2016-10-27 14:24:26
tags:
  - Homestead
---

设置 Homestead 服务器为可被局域网内的其他设备访问，可以非常方便地测试移动端浏览效果，同时也可以把页面分享给团队的其他成员浏览。

<!-- more -->

第一步，修改脚本文件 `~\Homestead\scripts\homestead.rb` ，允许局域网中的其他设备访问虚拟机。 将 _config.vm.network_ 属性的值修改为 `public_network` 。

```
config.vm.network :public_network, ip: settings["ip"] ||= "192.168.10.10"
```

第二步，修改配置文件`~/.homestead/Homestead.yaml`，将虚拟机的 ip 修改为当前局域网网段中的 ip 。

```
ip: "192.168.1.200"
```

第三步，新增一个站点，将 ip 的访问指向代码根目录。

```
sites:
  - map: 192.168.1.200
    to: /home/vagrant/Code/
```

然后使用命令行重启虚拟机。

```
vagrant halt
vagrant up
```

同时刷新一下虚拟机的配置。

```
vagrant provision
```

现在你已可以使用同一 WIFI 下（局域网内）的手机、平板等设备通过 ip 地址访问 Homestead 服务器。

相关环境：Windows 10 x64 / VirtualBox 5.1.8 / Laravel Homestead / Laravel 5.2