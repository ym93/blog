---
title: 使用 AlertDialog 实现自定义对话框
id: 660
comment: false
categories:
  - 安卓
date: 2016-02-08 20:11:58
tags:
  - Android
  - Java
---

首先创建 AlertDialog 对话框的布局文件：

``` xml
<LinearLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="300dp"
  android:layout_height="200dp"
  android:paddingTop="@dimen/dialog_margin_top"
  android:paddingBottom="@dimen/dialog_margin_bottom"
  android:paddingLeft="@dimen/long_margin"
  android:paddingRight="@dimen/long_margin"
  android:layout_gravity="center"
  android:background="#ffffff" >
  <TextView
    android:id="@+id/textview"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"/>
</LinearLayout>
```
<!--more-->

构造 AlertDialog ：

``` java
// 创建一个AlertDialog对象，
AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
alertDialog.show();
// 设置AlertDialog的布局
alertDialog.getWindow().setContentView(R.layout.dialog);
// 子控件的初始化和使用和Activity下类似
TextView textview = (TextView)alertDialog.getWindow().findViewById(R.id.textview);
title.setText("example");
```

AlertDialog 的关闭方法：

``` java
alertDialog.dismiss();
```

如果想要为 AlertDialog 使用自定义主题，首先在 style.xml 文件内新建一个主题。这里我继承了系统自带的 Theme.AppCompat.Light.Dialog.Alert 主题，然后一项配色，命名为 AppDialogTheme 。

``` xml
<style
  name="AppDialogTheme"
  parent="Theme.AppCompat.Light.Dialog.Alert">
  <item name="colorAccent">@color/colorRed</item>
</style>
```

然后在 AlertDialog 的构造方法中，增加指定主题样式的参数。

``` java
AlertDialog alertDialog = new AlertDialog.Builder(
  MainActivity.this, R.style.AppDialogTheme
).create();
```

AlertDialog 显示时默认不可以使用输入法。如果需要在弹出的对话框中使用 EditText 、让用户输入内容，需要在执行 `show` 方法后加入另外两行代码。

``` java
// 允许输入法弹出
alertDialog.getWindow().clearFlags( WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_ALT_FOCUSABLE_IM );
alertDialog.getWindow().setSoftInputMode( WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE );
```