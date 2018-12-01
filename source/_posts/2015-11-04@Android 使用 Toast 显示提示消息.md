---
title: Android 使用 Toast 显示提示消息
categories:
  - 安卓
date: 2015-11-04 10:34:38
tags:
  - Android
  - Java
---

Toast 是 Android 中用来显示信息的一种机制，能够在屏幕上显示一段提示消息。

新建一个 demo 应用并命名为 _ToastPractice_ ，生成默认的 Activity 。

<!-- more -->

1、修改 activity_main.xml ，添加一个按钮。

``` xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:paddingBottom="@dimen/activity_vertical_margin"
  android:paddingLeft="@dimen/activity_horizontal_margin"
  android:paddingRight="@dimen/activity_horizontal_margin"
  android:paddingTop="@dimen/activity_vertical_margin"
  tools:context="com.caiyiming.toastpractice.MainActivity" >
  <Button
    android:id="@+id/buttonToastShort"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="短提示"/>
</RelativeLayout>
```

2、修改 MainActivity.java ，添加按钮并绑定点击事件。点击该按钮将实例化 Toast 对象、在屏幕上显示短消息。

``` java
public class MainActivity extends ActionBarActivity {

  private Button mBtn_1;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mBtn_1 = (Button) findViewById(R.id.buttonToastShort);
    mBtn_1.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View v) {
        Toast mToast = Toast.makeText(getApplicationContext(), "这是一个短提示。", Toast.LENGTH_SHORT);
        mToast.show();
      }
    });
  }

}
```

程序运行效果：

{% img side-by-side /images/posts/2015/11/android_toast_1.png 220 点击按钮 %}

{% img side-by-side /images/posts/2015/11/android_toast_2.png 220 显示 Toast %}


`makeText` 方法的第三个参数用于设置 Toast 出现的时长。Toast.LENGTH_SHORT 相当于2-3秒时长，使用 Toast.LENGTH_LONG 将使 Toast 显示更久。