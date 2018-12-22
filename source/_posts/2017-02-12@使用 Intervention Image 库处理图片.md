---
title: 使用 Intervention Image 库处理图片
categories:
  - Web Back-end
date: 2017-02-12 13:05:49
tags:
  - Laravel
  - PHP
---

Intervention Image 是一个开源图片处理库。使用它需要 PHP>=5.4、FileInfo 拓展、GD 库或 Imagick 拓展。

### 安装

执行以下命令使用 Composer 安装 Intervention Image 的最新版本。

<!-- more -->

``` sh
composer require intervention/image
```

### 使用

Intervention Image 并不依赖于 Laravel 或其他框架，使用时只需包含 Composer 的 autoload 文件，然后实例化 Image 对象。

``` php
// 包含autoload文件
require 'vendor/autoload.php';

// 导入ImageManager类
use Intervention\Image\ImageManager;

// 创建ImageManager实例并指定要使用的驱动(默认GD库)
$manager = new ImageManager(array('driver' => 'imagick'));

// 创建Image实例然后操作图片
$image = $manager->make('public/foo.jpg')->resize(300, 200);
```

也可以在导入类时设置一个别名。

``` php
// 包含autoload文件
require 'vendor/autoload.php';

// 导入ImageManager类
use Intervention\Image\ImageManagerStatic as Image;

// 创建ImageManager实例并指定要使用的驱动(默认GD库)
Image::configure(array('driver' => 'imagick'));

// 创建Image实例然后操作图片
$image = Image::make('public/foo.jpg')->resize(300, 200);
```

### 在 Laravel 中使用

Intervention Image 提供了服务提供者、门面以便快速集成到 Laravel 框架。

打开 Laravel 的配置文件 `config\app.php` ，在 `$providers` 数组中添加一个服务提供者。

``` php
Intervention\Image\ImageServiceProvider::class
```
在 `$aliases` 数组中添加一个门面。

``` php
'Image' => Intervention\Image\Facades\Image::class
```

Intervention Image 默认使用 GD 库处理图片，如果需要切换到 Imagick ，执行以下命令创建配置文件。

``` sh
php artisan vendor:publish --provider="Intervention\Image\ImageServiceProviderLaravel5"
```

### 常用操作

``` php
// 创建一个Image对象
$img = Image::make('public/foo.jpg');

// 获取图片文件大小
$size = $img->filesize();

// 获取图片尺寸（像素）
$width  = $img->width();
$height = $img->height();

// 调整图片尺寸
$img->resize(300, 200);

// 调整图片的宽或高
$img->resize(300, null);
$img->resize(null, 200);

// 调整图片的宽同时保持图片比例
$img->resize(300, null, function ($constraint) {
    $constraint->aspectRatio();
});

// 调整图片的高同时保持图片比例
$img->resize(null, 200, function ($constraint) {
    $constraint->aspectRatio();
});

// 避免处理时造成文件大小增加
$img->resize(null, 400, function ($constraint) {
    $constraint->aspectRatio();
    $constraint->upsize();
});

// 转码为其他格式并压缩图片
$img->encode('jpg', 75);

// 转码为 Data URL
$img->encode('data-url');

// 裁剪图片
$img->crop(100, 100, 25, 25);

// 旋转-45度
$img->rotate(-45);

// 垂直翻转及水平翻转
$img->flip('v');
$img->flip('h');

// 以最优方案裁剪为600*360
$img->fit(600, 360);

// 以最优方案裁剪为200*200
$img->fit(200);

// 以默认质量保存图片
$img->save('public/bar.jpg');

// 以给定质量保存图片
$img->save('public/bar.png', 60);
```

我只记录了部分常用的接口，更多 API 及其用法可以 [阅读](http://image.intervention.io/) 官方文档了解。

相关环境：Windows 7 x64 / VirtualBox 5.1.8 / Laravel Homestead / Laravel 5.3