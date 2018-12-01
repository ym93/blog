---
title: 使用 Laravel Excel 导入导出 Excel & CSV
categories:
  - 后端
date: 2017-02-16 23:32:28
tags:
  - Laravel
  - PHP
---

Laravel Excel 是一个开源库，使用它可以很轻易地在 Laravel 项目上实现导入和导出 Excel、CSV 文件。Laravel Excel 基于另一个开源项目 PHPExcel ，所以如果你的应用不是运行在 Laravel 上， 你也可以尝试使用 PHPExcel 。

<!-- more -->

### 安装

在 composer.json 中添加相应的包。

``` js
"maatwebsite/excel": "~2.1.0"
```
然后在命令行执行以下代码安装 Laravel Excel 。

``` sh
composer update
```
修改 Laravel 的配置文件 config/app.php ，在 $providers 数组中添加一个服务提供者。

``` php
'Maatwebsite\Excel\ExcelServiceProvider'
```
接着在 $aliasses 数组中添加一个门面。

``` php
'Excel' => 'Maatwebsite\Excel\Facades\Excel'
```

### 配置

如果你想要查看或者修改 Laravel Excel 提供的配置，在命令行执行以下代码，然后你就会在 config 文件夹下得到一个配置文件。

``` sh
php artisan vendor:publish
```

### 使用

在控制器中引用这个包。如果之前已经添加过门面，也可以直接引用门面。

``` php
use Maatwebsite\Excel\Facades\Excel;
```

``` php
use Excel;
```

### 导入


``` php
// 加载文件
Excel::load('file.xls', function($reader) {

  // 获取数据的集合
  $results = $reader->get();

  // 获取第一行数据
  $results = $reader->first();

  // 获取前10行数据
  $reader->take(10);

  // 跳过前10行数据
  $reader->skip(10);

  // 以数组形式获取数据
  $reader->toArray();

  // 打印数据
  $reader->dump();

  // 遍历工作表
  $reader->each(function($sheet) {

    // 遍历行
    $sheet->each(function($row) {

    });

  });

  // 获取指定的列
  $reader->select(array('firstname', 'lastname'))->get();

  // 获取指定的列
  $reader->get(array('firstname', 'lastname'));

});

// 选择名为sheet1的工作表
Excel::selectSheets('sheet1')->load();

// 根据索引选择工作表
Excel::selectSheetsByIndex(0)->load();
```

### 导出


``` php
// 生成文件
Excel::create('Filename', function($excel) {

  // 设置文档标题和作者
  $excel->setTitle('Our new awesome title');
  $excel->setCreator('Maatwebsite')
    ->setCompany('Maatwebsite');

  // 设置文档描述
  $excel->setDescription('A demonstration to change the file properties');

  // 创建工作表
  $excel->sheet('Sheetname', function($sheet) {

    // 通过数组写入值（二维数组）
    $sheet->fromArray($array);

    // 给第一行写入值（一维数组）
    $sheet->row(1, $array);

    // 设置某一列的宽
    $sheet->setWidth('A', 5);

    // 批量设置列宽
    $sheet->setWidth([
        'A' => 5,
        'B' => 10
    ]);

  });

});

// 生成为指定的格式并下载
Excel::create()->export('xls');

// 生成为指定的格式并存储在app/storage/exports目录
Excel::create()->store('xls');

// 生成为指定的格式并存储在指定的目录
Excel::create()->store('xls', storage_path('excel/exports'));

// 存储后返回文件数据（包含路径等）
Excel::create()->store('xls', false, true);
```

Laravel Excel 还提供了很多包含表格样式修改在内的其他 API 。感兴趣的话可以阅读 [官方文档](http://www.maatwebsite.nl/laravel-excel/docs) 了解。

相关环境：Windows 7 x64 / VirtualBox 5.1.8 / Laravel Homestead / Laravel 5.3