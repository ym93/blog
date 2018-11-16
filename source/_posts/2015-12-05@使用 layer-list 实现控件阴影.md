---
title: 使用 layer-list 实现控件阴影
id: 409
comment: false
categories:
  - 安卓
date: 2015-12-05 21:05:56
tags:
  - Android
---

在开发 demo 应用的过程中用到给 LinearLayout 添加阴影。

这里使用 layer-list 实现，实际上就是给 LinearLayout 添加了一个包含两层 shape 的 xml 文件作为背景，有点类似 PS 里的图层。
<!--more-->

在 drawable 文件夹下新建一个 xml 文件。

``` xml
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <!-- 阴影 -->
  <item>
    <shape android:shape="rectangle" >
      <!-- 阴影颜色 -->
      <gradient
        android:angle="90"
        android:endColor="#b7b7b7"
        android:startColor="#e8e8e8" />
      <!-- 阴影圆角 -->
      <corners android:radius="0dp" /> 
    </shape>
  </item>
  <!-- 前景 -->
  <item android:bottom="2dp"> <!-- 阴影厚度 -->
    <shape android:shape="rectangle" >
      <solid android:color="#fff" /> <!-- 前景颜色 -->
      <corners android:radius="0dp" /> <!-- 前景圆角 -->
    </shape>
  </item>
</layer-list>
```

为 LinearLayout 设置 _background_ 属性，引用此 xml 文件即可。
