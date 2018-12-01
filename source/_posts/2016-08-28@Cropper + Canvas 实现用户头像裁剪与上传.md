---
title: Cropper + Canvas 实现用户头像裁剪与上传
categories:
  - 前端
date: 2016-08-28 23:14:24
tags:
  - Canvas
  - JavaScript
---

第一步：使用 Github 上的开源项目 [cropper](https://github.com/fengyuanchen/cropper) 实现选择被裁剪图片、裁剪操作和不同大小头像的预览，这个项目可以返回（被裁减图片上）需要裁出的部分的坐标和尺寸。

<!-- more -->

第二步：通过 cropper 直接取到 x、y、w、h 四个值，就是你要裁取的图片相对原图的坐标和尺寸。

第三步：使用 HTML5 的 FileReader 读取文件，然后使用 Canvas 绘制用户的头像。

``` js
//初始化canvas对象
var canvas=document.getElementById('my-canvas');
var context = canvas.getContext('2d');
//读取被图片源文件
var file = input.files[0];
var reader = new FileReader(); reader.readAsDataURL(file);
reader.onload=function(e){
  var img = new Image();
  img.src = this.result;
  if( file!=null ){
    //生成裁剪后的图片
    context.drawImage(img, x, y, w, h, 0, 0, 120, 120);
    //将图片转换成DataUrl
    var imageData = canvas.toDataURL('image/jpeg',0.9);
  }
}
```

这里用到的 `drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)` 方法，参数含义如下，sx、sy 是目标矩形的起始（左上端）坐标，sw、sh 是目标矩形的宽高，dx、dy 是目标矩形绘制在 Cavans 画布上的起始位置的坐标（一般取0），dw、dh 是目标矩形绘制后的宽高（可以通过这2个参数标准化头像尺寸）。此外 `toDataURL` 方法的第1个参数表示要生成的图片格式，默认是 png ，第2个参数是可选的，表示图片压缩等级，可以取0-1之间的值。

第四步：至此已经得到了图片的 DataURL ，通过 POST 方式提交，服务端接收保存图片即可。