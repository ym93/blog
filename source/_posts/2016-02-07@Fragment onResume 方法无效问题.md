---
title: Fragment onResume 方法无效问题
categories:
  - 安卓
date: 2016-02-07 13:17:22
tags:
  - Android
---

`onResume` 在 Activity 中是个非常常用的生命周期方法，它在 Activity 每次显示时都被执行，可用于刷新 UI 等操作。

Fragment 和 Activity 一样存在 `onResume` 方法，但我发现直接覆写 `onResume` 方法后，当 Fragment 显示到前台时不会执行这个方法。网上有人推荐使用 `setUserVisibleHint` 方法。

<!-- more -->

``` java
@Override
public void setUserVisibleHint(boolean isVisibleToUser) {
  super.setUserVisibleHint(isVisibleToUser);
  if (isVisibleToUser) {
    // 相当于 Fragment 的 onResume
  } else {
    // 相当于 Fragment 的 onPause
  }
}
```

但我尝试后也发现没有效果，不知道是什么原因。

我的使用场景是，当用户退出 AnotherActivity ，返回 MainActivity 的时候，我希望 MainActivity 内已经存在的 Fragment 可以刷新 UI（查询数据库内是否有变更的内容）。我尝试过在 `onResume` 和 `setUserVisibleHint` 这两个方法下执行刷新 UI 的方法，都不成功；在 AnotherActivity 退出前调用 Fragment 内刷新 UI 的方法，也不成功。

最后我的解决方案是，手动执行，让 MainActivity 来通知 Fragment 执行 `onResume` 方法。

``` java
@Override
public void onResume() {
  super.onResume();
  // 添加需要的操作
}
```

在 MainActivity 下创建一个静态方法。

``` java
public static void resumeFragment() {
  fragment.onResume();
}
```

当需要执行 Fragment 的 `onResume` 方法时：

``` java
MainActivity.resumeFragment();
```

还有一种方法，直接在 MainActivity 的 `onResume` 方法里刷新 Fragment 的 UI ，也有效果。

``` java
if( fragment.isAdded() ) {
  // Fragment 中的静态方法
  fragment.refreshProfile();
}
```