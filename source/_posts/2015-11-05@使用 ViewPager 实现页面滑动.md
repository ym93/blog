---
title: 使用 ViewPager 实现页面滑动
id: 204
comment: false
categories:
  - 安卓
date: 2015-11-05 22:35:22
time: 201511052235
tags:
  - Android
  - Java
---

新建一个 demo 应用，命名为 _ViewPagerPractice_ 。

1、创建3个布局文件，添加不同的背景和文字，作为3个页面（Fragment）的布局。
<!--more-->

``` xml
<!-- fragment_one.xml -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical" 
  android:background="#FF4040">
  <TextView
    android:id="@+id/fragment_left_text"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Fragment One!"
    android:textColor="#FFF"
    android:padding="10dp"/>
</LinearLayout>
```

``` xml
<!-- fragment_two.xml -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical" 
  android:background="#FFD700">
  <TextView
    android:id="@+id/fragment_middle_text"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Fragment Two!"
    android:textColor="#FFF"
    android:padding="10dp"/>
</LinearLayout>
```

``` xml
<!-- fragment_three.xml -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical" 
  android:background="#4876FF">
  <TextView
    android:id="@+id/fragment_right_text"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Fragment Three!"
    android:textColor="#FFF"
    android:padding="10dp"/>
</LinearLayout>
```

2、创建3个类，继承 Fragment ，用于构建并返回3个不同布局的 Fragment 。

``` java
// FragmentOne.java
public class FragmentOne extends Fragment {
  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState) {
    View v = inflater.inflate(R.layout.fragment_one, parent, false);
    return v;
  }
}
```

``` java
// FragmentTwo.java
public class FragmentTwo extends Fragment {
  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState) {
    View v = inflater.inflate(R.layout.fragment_two, parent, false);
    return v;
  }
}
```

``` java
// FragmentThree.java
public class FragmentThree extends Fragment {
  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState) {
    View v = inflater.inflate(R.layout.fragment_three, parent, false);
    return v;
  }
}
```

3、编辑 Activity 类，使其继承自 FragmentActivity 。

``` java
// MainActivity.java
public class MainActivity extends FragmentActivity {

  // 声明变量
  private ViewPager mViewPager;
  private ArrayList<Fragment> mFragmentList;
  private FragmentOne mFragmentOne;
  private FragmentTwo mFragmentTwo;
  private FragmentThree mFragmentThree;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 实例化 ViewPager 并设为视图
    mViewPager = new ViewPager(this);
    mViewPager.setId(R.id.viewPager);
    setContentView(mViewPager);

    // 实例化3个 Fragment 并存入数组
    mFragmentOne = new FragmentOne();
    mFragmentTwo = new FragmentTwo();
    mFragmentThree = new FragmentThree();
    mFragmentList = new ArrayList<Fragment>();
    mFragmentList.add(mFragmentOne);
    mFragmentList.add(mFragmentTwo);
    mFragmentList.add(mFragmentThree);

    // 为 ViewPager 适配数据
    FragmentManager mFragmentManager = getSupportFragmentManager();
    mViewPager.setAdapter(new FragmentStatePagerAdapter(mFragmentManager) {
      @Override
      public int getCount() {
        return mFragmentList.size();
      }
      @Override
      public Fragment getItem(int id) {
        return mFragmentList.get(id);
      }
    });
    //设置第2个Fragment为初始显示界面
    mViewPager.setCurrentItem(1);
  }

}
```

运行应用，可以看到已经实现了三屏滑动切换。

{% img side-by-side /images/posts/2015/2015-11-05@android-view-pager-1.png 220 当前页 %}

{% img side-by-side /images/posts/2015/2015-11-05@android-view-pager-2.png 220 切换上一页 %}

{% img side-by-side /images/posts/2015/2015-11-05@android-view-pager-3.png 220 切换下一页 %}