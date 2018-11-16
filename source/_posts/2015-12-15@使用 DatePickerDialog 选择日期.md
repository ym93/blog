---
title: 使用 DatePickerDialog 选择日期
id: 443
comment: false
categories:
  - 安卓
date: 2015-12-15 15:59:22
tags:
  - Android
  - Java
---

新建一个工程并命名为 DatePickerDialogDemo ，使用 LinearLayout 布局。

在布局中分别添加一个 TextView 用于输出选择的日期、一个 Button 用于触发日期选择窗口。
<!--more-->

MainActivity.xml:

``` xml
LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical"
  android:padding="15dp"
  tools:context="${relativePackage}.${activityClass}" >
  <TextView
    android:id="@+id/textviewText"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="" />
  <Button 
    android:id="@+id/buttonPickDate"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="选择日期"/>
</LinearLayout>
```

新建一个类，继承自 DialogFragment 并实现 DatePickerDialog 接口。

`onDateSet` 方法在日期选择完成后被执行，它将调用 MainActivity 中的静态方法，更新 TextView 中的内容，把日期显示出来。

UtilSelectDate.java:

``` java

public class UtilSelectDate extends DialogFragment implements DatePickerDialog.OnDateSetListener {

  // 初始化变量
  int mYear;
  int mMonth;
  int mDay;

  // 初始化日期选择对话框
  @Override
  public Dialog onCreateDialog(Bundle savedInstanceState) {
  // 设置初始日期为本年本月本日
    final Calendar mCal=Calendar.getInstance();
    int year = mCal.get(Calendar.YEAR);
    int month = mCal.get(Calendar.MONTH);
    int day = mCal.get(Calendar.DAY_OF_MONTH);
    // 返回日期选择对话框
    return new DatePickerDialog(getActivity(), this, year, month, day);
  }

  // 日期选择完成事件
  @Override
  public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
  mYear = year;
  mMonth = monthOfYear+1;
  mDay = dayOfMonth;
  // 调用 MainActivity 中的方法更新日期
  MainActivity.updateText(mYear, mMonth, mDay);
  }

}
```

MainActivity 继承自 FragmentActivity ，点击按钮后，实例化一个日期选择窗口并显示。

`updateText` 方法在 UtilSelectDate 类的 `onDateSet` 方法中调用，实现日期选择完成后的屏幕输出。

MainActivity.java:

``` java
public class MainActivity extends FragmentActivity {

  private Button mPickDate;
  private static TextView mText;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    // 实例化控件
    mText = (TextView) findViewById(R.id.textviewText);
    mPickDate = (Button) findViewById(R.id.buttonPickDate);
    // 按钮点击事件
    mPickDate.setOnClickListener(new OnClickListener(){
    @Override
    public void onClick(View arg0) {
    DialogFragment mFragment=new UtilSelectDate();
    mFragment.show(MainActivity.this.getSupportFragmentManager(), null);
    }
    });

  }

  // 屏幕输出日期
  static void updateText(int year, int month, int day){
    mText.setText(String.valueOf(year)+"年"+String.valueOf(month)+"月"+String.valueOf(day)+"日");
  }

}
```

需要注意的是，如果是在 Fragment（而不是 FragmentActivity ）中使用，执行`show` 方法的语句需要改为：

``` java
mFragment.show(getFragmentManager(), null);
```