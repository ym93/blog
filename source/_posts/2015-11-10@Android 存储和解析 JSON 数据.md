---
title: Android 存储和解析 JSON 数据
id: 265
comment: false
categories:
  - 安卓
date: 2015-11-10 01:07:49
time: 201511100107
tags:
  - Android
  - Java
  - JSON
---

> JSON是一种轻量级的数据交换格式。JSON 采用完全独立于语言的文本格式，易于阅读和编写，同时也易于机器解析和生成（一般用于提升网络传输速率）。

JSON 中的数据以键值对（key-value）的形式存在的。
<!--more-->
``` java
{
  "用户": {
    "姓氏": "唐",
    "名字": "三藏",
    "邮箱": "email@example.com"
  }
}
```

新建一个 demo 应用并命名为 _JSONPractice_ ，生成默认的 Activity 。

修改 activity_main.xml ，添加一个 TextView 控件。

``` xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:padding="10dp">

  <TextView
    android:id="@+id/textView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:singleLine="false"/>

</RelativeLayout>
```

在 MainActivity 类中新建一个 TextView ，并在 `onCreate` 方法中将其实例化。它将用于显示解析后的信息。

``` java
private TextView mTextView;

@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  setContentView(R.layout.activity_main);
  mTextView = (TextView) findViewById(R.id.textView);
}
```
 

在 MainActivity 类中添加 `JSONWrite` 方法，用于以 JSON 格式将数据保存到文本文件，然后在日志中打印数据。

``` java
protected void JSONWrite(){
  // 待存储的信息
  String mCompany = "蔡一鸣博客 CAIYIMING BLOG";
  String mAddress = "中国 福建省 厦门市";
  String mTelephone = "0592-1234567";
  String[] mDataName = {"孙悟空", "猪悟能", "沙悟净"};
  String[] mDataAge = {"20", "19", "21"};
  double[] mDataSalary = { 3500.0, 2900.0, 4000.0};
  Date[] mDataTime = {new Date(), new Date(), new Date()};
  // 创建外层 JSON 对象
  JSONObject mAllData = new JSONObject();
  // 创建 JSON 数组
  JSONArray mArray = new JSONArray();
  // 创建单个员工的 JSON 对象
  for (int i=0; i<mDataName.length; i++) {
    JSONObject mTemp = new JSONObject();
    try {
      mTemp.put("Name", mDataName[i]);
      mTemp.put("Age", mDataAge[i]);
      mTemp.put("Salary", mDataSalary[i]);
      mTemp.put("Time", mDataTime[i]);
    } catch(JSONException e){
    }
    // 将单个员工的 JSON 对象放进 JSON 数组
    mArray.put(mTemp);
  }
  try {
    // 将所有数据存入外层 JSON 对象
    mAllData.put("Employees", mArray);
    mAllData.put("Company", mCompany);
    mAllData.put("Address", mAddress);
    mAllData.put("Telephone", mTelephone);
  } catch(JSONException e){
  }
  // 若存储介质不存在则终止操作
  if (!Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
    return;
  }
  // 新建文件对象 路径为 JSONPractice\JSON.txt（File.separator 等于 \ 符号）
  File mFile = new File(Environment.getExternalStorageDirectory()+File.separator+"JSONPractice"+File.separator+"JSON.txt");
  // 如果不存在 JSONPractice 则新建
  if (!mFile.getParentFile().exists()) {
    mFile.getParentFile().mkdirs();
  }
  // 新建打印流并打印数据
  PrintStream mOut = null;
  try {
    mOut = new PrintStream(new FileOutputStream(mFile));
    mOut.print(mAllData.toString());
    Log.d("MainActivity", "JSON.txt保存成功！");
  } catch(FileNotFoundException e){
    // 若文件不存在则打印日志
    Log.d("MainActivity", "JSON.txt保存失败！");
  } finally{
    // 若打印流非空则关闭打印流
    if (mOut!=null) {
      mOut.close();
    }
  }
  // 检查文件是否存在并打印日志
  String mContent = "";
  if (mFile.exists()) {
    try {
      InputStream mInputStream = new FileInputStream(mFile); 
      InputStreamReader mInputReader = new InputStreamReader(mInputStream);
      BufferedReader mBufferReader = new BufferedReader(mInputReader);
      String mLine;
      // 分行读取并打印
      while (( mLine = mBufferReader.readLine()) != null) {
        mContent += mLine;
      }
      Log.d("MainActivity",  mContent);
      mInputStream.close();
    } catch (java.io.FileNotFoundException e) {
    } catch (IOException e) {
    }
  }
  }
```

添加 `JSONRead` 方法，用于读取 `JSONWrite` 方法保存的文件，并将 JSON 数据解析出来，然后以其他格式在屏幕上输出。

``` java
protected void JSONRead(){
  File mFile = new File(Environment.getExternalStorageDirectory()+File.separator+"JSONPractice"+File.separator+"JSON.txt");
  String mContent = "";
  if (mFile.exists()) {
    try {
    // 读取数据
    InputStream mInputStream = new FileInputStream(mFile); 
    InputStreamReader mInputReader = new InputStreamReader(mInputStream);
    BufferedReader mBufferReader = new BufferedReader(mInputReader);
    String mLine;
    while (( mLine = mBufferReader.readLine()) != null) {
      mContent += mLine;
    }
    mInputStream.close();
    // 解析数据
    try {
      JSONTokener mJT = new JSONTokener(mContent);
      JSONObject mJO = (JSONObject) mJT.nextValue();
      // 解析单位信息
      String mCompany = mJO.getString("Company");
      String mTelephone = mJO.getString("Telephone");
      String mAddress = mJO.getString("Address");
      // 解析员工信息
      JSONArray mEmployees = mJO.getJSONArray("Employees");
      // 员工一
      JSONObject mEmployeeOne = mEmployees.getJSONObject(0);
      String[] mEmOneInfo = new String[4];
      mEmOneInfo[0] = mEmployeeOne.getString("Name");
      mEmOneInfo[1] = mEmployeeOne.getString("Age");
      mEmOneInfo[2] = mEmployeeOne.getString("Salary");
      mEmOneInfo[3] = mEmployeeOne.getString("Time");
      String mEmOne = "";
      for ( int i=0; i<=3; i++) {
      mEmOne = mEmOne + mEmOneInfo[i] + " ";
      }
      // 员工二
      JSONObject mEmployeeTwo = mEmployees.getJSONObject(1);
      String[] mEmTwoInfo = new String[4];
      mEmTwoInfo[0] = mEmployeeTwo.getString("Name");
      mEmTwoInfo[1] = mEmployeeTwo.getString("Age");
      mEmTwoInfo[2] = mEmployeeTwo.getString("Salary");
      mEmTwoInfo[3] = mEmployeeTwo.getString("Time");
      String mEmTwo = "";
      for ( int i=0; i<=3; i++) {
      mEmTwo = mEmTwo + mEmTwoInfo[i] + " ";
      }
      // 员工三
      JSONObject mEmployeeThree = mEmployees.getJSONObject(1);
      String[] mEmThreeInfo = new String[4];
      mEmThreeInfo[0] = mEmployeeThree.getString("Name");
      mEmThreeInfo[1] = mEmployeeThree.getString("Age");
      mEmThreeInfo[2] = mEmployeeThree.getString("Salary");
      mEmThreeInfo[3] = mEmployeeThree.getString("Time");
      String mEmThree = "";
      for ( int i=0; i<=3; i++) {
       mEmThree = mEmThree + mEmThreeInfo[i] + " ";
      }
      String mOutput = null;
      // 汇总数据并输出
      mOutput = "单位："+mCompany+"\n"+"电话："+mTelephone+"\n"+"地址："+mAddress+
        "\n\n员工信息\n\n"+mEmOne+"\n"+mEmTwo+"\n"+mEmThree;
      mTextView.setText(mOutput);
    } catch (JSONException e) { }
    } catch (java.io.FileNotFoundException e){ } catch (IOException e){ }
  }
}
```

修改 `onCreate` 方法，在声明周期中执行 JSONWrite 、JSONRead 方法。

``` java
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  setContentView(R.layout.activity_main);
  mTextView = (TextView) findViewById(R.id.textView);
  // 将信息以 JSON 格式保存到本地
  JSONWrite();
  // 读取并解析文件中的 JSON 数据
  JSONRead();
}
```

运行应用，LogCat 中打印了 JSON 数据，说明 `JSONWrite` 方法执行成功，Activity 输出格式化的内容，说明 `JSONRead` 方法执行成功。

{% img /images/posts/2015/2015-11-10@android-json-1.png 480 控制台日志 %}

{% img /images/posts/2015/2015-11-10@android-json-2.png 240 屏幕输出内容 %}