---
title: 将 WordPress 移动到子目录
categories:
  - 其他
date: 2017-03-13 17:46:10
tags:
  - WordPress
---

WordPress 默认安装在网站的根目录，这无疑会使目录结构看起来很混乱。查阅文档后发现 WordPress 本身允许用户将其文件移动到子目录。

<!-- more -->

首先，在根目录下创建用于存放 WordPress 文件的文件夹。例如： `wordpress` 。

然后，在后台修改常规选项，将“WordPress地址”修改为指向子目录的链接。保存，不需要理会错误提示。

``` xhtml
http://example.com/wordpress
```

注意，“站点地址”不需要修改。

最后，将 index.php 拷贝到根目录下。编辑 index.php ，修改其引用的文件路径。如果存在 .htaccess 等 Web 引擎配置文件，也要拷贝到根目录下。

``` php
require('./wordpress/wp-blog-header.php');
```

若设置过固定链接，需要到后台重新保存一次固定链接设置。若无法正常访问站点，检查 Rewrite 规则或目录权限。

记得使用新链接登录后台。

``` xhtml
http://example.com/wordpress/wp-admin/
```