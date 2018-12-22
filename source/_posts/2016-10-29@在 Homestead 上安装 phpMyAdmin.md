---
title: 在 Homestead 上安装 phpMyAdmin
categories:
  - Web Back-end
date: 2016-10-29 12:36:39
tags:
  - Homestead
  - phpMyAdmin
---

近期使用 Homestead 作为开发环境，由于命令行方式操作数据库效率低（学艺不精），于是准备安装一个 GUI 工具来辅助学习/开发，首选已经熟练使用的 phpMyAdmin 。

<!-- more -->

第一步，[下载](https://www.phpmyadmin.net/) 最新版本的 phpMyAdmin ，解压到代码目录下。

第二步，修改服务器的配置文件 `~\.homestead\Homestead.yaml` ，添加一个新的站点。

```
folders:
  - map: ~/Code
    to: /home/vagrant/Code
sites:
  - map: phpmyadmin.app
    to: /home/vagrant/Code/phpmyadmin/
    ...
```

第三步，修改 hosts 文件，新增一行内容，注意 ip 需要和 Homestead 配置文件中的一致。

```
192.168.10.10 phpmyadmin.app
```

好了！现在访问 phpmyadmin.app 即可使用 phpMyAdmin 。

相关环境：Windows 7 x64 / VirtualBox 5.1.8 / Laravel Homestead / Laravel 5.2