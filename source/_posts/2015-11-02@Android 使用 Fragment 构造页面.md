---
title: Android 使用 Fragment 构造页面
categories:
  - Android
date: 2015-11-02 22:34:33
tags:
  - Android
  - Java
---

假设你遇到这样的场景：1、需要将相同的界面元素显示在多个不同的页面。2、需要用几个相对独立的模块构成一个页面。

单纯使用 Activity 难以满足这样的需求，需要通过 Fragment（碎片）实现。简单的说，不再直接在 Activity 上添加元素，而是在 Fragment 上添加元素，然后把这个 Fragment 添加到需要显示这些元素的 Activity 中。

<!-- more -->

你可以将一个 Fragment 添加到多个 Activity 、把多个 Fragment 添加到一个 Activity 、用一个 Fragment 替换另一个 Fragment ，让页面元素的管理更加灵活。

首先创建一个 demo 应用，命名为 _FragmentPractice_ 。

1、新建布局文件 fragment_default.xml ，它将作为 Fragment 的布局。

``` xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical">
  <TextView
    android:id="@+id/fragment_text"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="10dp"
    android:background="#FF4040"
    android:textColor="#FFF"
    android:text="●This is Fragment."/>
</LinearLayout>
```

2、新建一个类文件 DefaultFragment.java ，稍后将调用它建立一个 Fragment 对象。

``` java
public class DefaultFragment extends Fragment {
  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState){
    View v = inflater.inflate(R.layout.fragment_default, parent, false);
    return v;
  }
}
```

3、修改 Activity 的布局文件 activity_main.xml ，添加 FragmentLayout ，作为 Fragment 的容器。

``` xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical" 
  android:gravity="center_horizontal"
  android:paddingTop="30dp"
  android:background="#F2F2F2" >
  <TextView
    android:id="@+id/activity_text"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:paddingBottom="20dp"
    android:text="●This is Activity." />
  <TextView
    android:id="@+id/container_text"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:paddingBottom="10dp"
    android:textColor="#EEC900"
    android:text="●This is Container. ↓" />
  <FrameLayout
    android:id="@+id/fragmentContainer"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:background="#EEC900"
    android:padding="10dp"/>
</LinearLayout>
```

4、修改 MainActivity.java ，使其继承 FragmentActivity ，然后重写 `onCreate` 方法，在该方法中创建 Fragment 。

``` java
public class MainActivity extends FragmentActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    FragmentManager mFragmentManager = getSupportFragmentManager();
    mFragment = new DefaultFragment();
    mFragmentManager.beginTransaction().add(R.id.fragmentContainer, mFragment).commit();
  }
}
```

运行结果：

{% img /img/posts/2015/11/android_fragment.png 240  在页面中添加 Fragment %}