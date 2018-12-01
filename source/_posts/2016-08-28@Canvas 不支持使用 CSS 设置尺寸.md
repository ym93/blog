---
title: Canvas 不支持使用 CSS 设置尺寸
categories:
  - 前端
date: 2016-08-28 23:47:11
tags:
  - HTML
  - Canvas
  - JavaScript
---

如果用 Canvas 画一个图形（我这里生成的是用户头像），生成 DataUrl 后把图片保存到本地，就会发现图形增加了不必要的宽度和高度。如果保存的格式是 jpg ，那么多余的部分就会表现为黑边。如果保存的格式是 png ，那么多余的部分就会表现为透明但仍占用宽高的图像。

<!-- more -->

通过排查我发现原因在于 Canvas 的默认宽高是300px*150px，它并不会因为你在上面 drawImage 而自动调整宽高去适应你的图形。所以你生成的图像总是有多余的部分，总是300px*150px的尺寸，显然我不能够这样保存用户的头像。

于是我希望通过修改 Canvas 的尺寸来解决这个问题，使其尺寸固定，和我要生成图像尺寸一致。

但是在通过 CSS 给 Canvas 添加 `style="width:120px; height:120px;"` 后，Canvas 只是通过拉伸改变了尺寸，图像被扭曲、黑边仍然存在。

原来，Canvas 并不支持用 CSS 来调整大小。可用的方案有两种，一是直接在标签内设置，二是通过 JS 设置。

直接在标签内设置宽高：

``` xhtml
<canvas id="canvas" width="200" height="100"></canvas>
```

通过 JS 设置宽高：

``` js
var canvas = document.getElementById("canvas");
canvas.width = 200;
canvas.height = 100;
```