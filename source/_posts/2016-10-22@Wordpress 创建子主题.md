---
title: WordPress 创建子主题
categories:
  - Other
date: 2016-10-22 16:06:26
tags:
  - WordPress
---

Wordpress 的主题总是有许多不尽如人意的地方，经常需要自定义样式、文本。然而直接修改主题源文件的体验并不优雅。使用子主题可以避免修改在主题升级后丢失，总之值得尝试，创建子主题的方式也 非常简单。

<!-- more -->

接下来以自带主题 Twenty Fifteen 为例演示创建一个子主题。

第一步，在 wp-content/themes/ 下新建一个文件夹，作为子主题的文件夹，该文件夹可以随意命名，我将该文件夹命名为 twentyfifteen-child 。

第二步，在 twentyfifteen-child 文件夹下新建一个 style.css 文件，代码如下。

``` css
/*
Theme Name:     Twenty Fifteen Child
Theme URI:      http://example.com/
Description:    Child theme for the Twenty Fifteen theme 
Author:         Your name here
Author URI:     http://example.com/
Template:       twentyfifteen
Version:        1.0
*/

@import url(../twentyfifteen/style.css);
```

Template 后填写父主题的文件夹名称，Theme Name 后填写子主题的名称，其他项目非必填。然后导入父主题的 CSS 文件。

至此，子主题已创建完毕，可以在主题中看到新增了 Twenty Fifteen Child 主题。如果觉得没有预览图片逼死强迫症，可以将父主题文件夹下的 screenshot.png 拷贝到子主题的文件夹里，或自己做一张预览图。

如需修改样式，可以直接写进子主题的style.css文件中覆盖原样式。如需修改页面的 HTML 或 PHP 代码，拷贝相应文件到子主题文件夹下，修改该文件即可。如需修改某个方法，可在子主题文件夹下创建 functions.php 文件，该文件中的方法将覆盖父主题中的同名方法。