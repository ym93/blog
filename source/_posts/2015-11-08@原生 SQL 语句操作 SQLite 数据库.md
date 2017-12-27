---
title: 原生 SQL 语句操作 SQLite 数据库
id: 250
comment: false
categories:
  - 安卓
date: 2015-11-08 12:15:40
time: 201511081215
tags:
  - Android
  - Java
---

如果你既不具备数据库基础，又对 SQLite 没有任何了解，建议你先阅读相关文章补充一下理论知识。如果你具备数据库基础、希望更直接地了解 SQLite ，那么接下来的内容可能正是你想要的。

<!-- more -->

在 Android 中操作 SQLite 数据库有两种方式：使用封装的 API 、直接执行原生 SQL 语句。

在这个 demo 中我将直接使用原生 SQL 语句操作数据库。
<!--more-->

新建一个应用并命名为 _SQLitePractice_ ，创建默认的 Activity 。不用修改布局，使用 LogCat 输出日志来监控代码的执行。

在 AndroidManifest.xml 中添加权限：

``` java
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.caiyiming.sqlitepractice"
  android:versionCode="1"
  android:versionName="1.0" >
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"></uses-permission>
  <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"></uses-permission>
  <uses-sdk
    android:minSdkVersion="8"
    android:targetSdkVersion="19" />
  <application
    android:allowBackup="true"
    android:icon="@drawable/ic_launcher"
    android:label="@string/app_name"
    android:theme="@style/AppTheme" >
    <activity
      android:name=".MainActivity"
      android:label="@string/app_name" >
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
  </application>
</manifest>
```

编写 MainActivity.java 文件。

添加 `SQLitePractice` 方法用于执行测试代码，它将在 Activity 的 `onCreate` 方法中被执行。每执行一步操作，判断是否成功并使用 LogCat 输出日志。

``` java
public class MainActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    SQLitePractice();
  }

  protected void SQLitePractice(){
    String mSQL;
    Cursor mCursor;
    String mId = null;
    String mUsername = null;
    String mPassword = null;
    // 创建文件夹
    File mFolder  = new File("/data/data/com.caiyiming.sqlitepractice/databases/");
    if (!mFolder.exists()) {
      mFolder.mkdirs();
    }
    // 创建数据库
    SQLiteDatabase mDB;
    mDB = SQLiteDatabase.openOrCreateDatabase("/data/data/com.caiyiming.sqlitepractice/databases/user.db", null);
    if (mDB.isOpen()) {
      Log.d("MainActivity", "数据库打开成功！");
    } else{
      Log.d("MainActivity", "数据库打开失败！");
    }
    // 创建数据表
    mSQL = "CREATE TABLE IF NOT EXISTS user(_id Integer Primary Key Autoincrement, username Text, password Text)";
    mDB.execSQL(mSQL);
    mSQL = "SELECT * FROM sqlite_master WHERE name='user'";
    mCursor = mDB.rawQuery(mSQL, null);
    if (mCursor.getCount()!=0) {
      Log.d("MainActivity", "数据表创建成功！");
    } else{
      Log.d("MainActivity", "数据表创建失败！");
    }
    // 插入数据
    mSQL = "SELECT * FROM user WHERE username='小蔡'";
    mCursor = mDB.rawQuery(mSQL, null);
    if (mCursor.getCount()==0) {
      mSQL = "INSERT INTO user('username','password') VALUES('小蔡', '0123456789')";
      mDB.execSQL(mSQL);
    }
    if (mCursor.getCount()!=0) {
      Log.d("MainActivity", "数据插入成功！");
    } else{
      Log.d("MainActivity", "数据插入成功！");
    }
    // 查询数据
    mSQL = "SELECT * FROM user WHERE username='小蔡'";
    mCursor = mDB.rawQuery(mSQL, null);
    if (mCursor.moveToFirst()) {
      mId = mCursor.getString(mCursor.getColumnIndex("_id"));
      mUsername = mCursor.getString(mCursor.getColumnIndex("username"));
      mPassword = mCursor.getString(mCursor.getColumnIndex("password"));
      Log.d("MainActivity", "查询数据成功！");
      Log.d("MainActivity", "编号:"+mId+", 用户:"+mUsername+", 密码:"+mPassword);
    } else{
      Log.d("MainActivity", "查询数据失败！");
    }
    // 修改数据
    mSQL = "UPDATE  user SET password='9876543210' WHERE username='小蔡'";
    mDB.execSQL(mSQL);
    mSQL = "SELECT * FROM user WHERE username='小蔡'";
    mCursor = mDB.rawQuery(mSQL, null);
    mCursor.moveToFirst();
    mUsername = mCursor.getString(mCursor.getColumnIndex("username"));
    mPassword = mCursor.getString(mCursor.getColumnIndex("password"));
    if (mPassword.equals("9876543210")) {
      Log.d("MainActivity", "数据修改成功！");
      Log.d("MainActivity", "编号:"+mId+", 用户:"+mUsername+", 密码:"+mPassword);
    } else{
      Log.d("MainActivity", "修改数据失败！");
      Log.d("MainActivity", "编号:"+mId+", 用户:"+mUsername+", 密码:"+mPassword);
    }
    // 删除数据
    mSQL = "DELETE FROM user WHERE username='小蔡'";
    mDB.execSQL(mSQL);
    mSQL = "SELECT * FROM user WHERE username='小蔡'";
    mCursor = mDB.rawQuery(mSQL, null);
    if (!mCursor.moveToFirst()) {
      Log.d("MainActivity", "删除数据成功！");
    }
    // 关闭数据库
    mDB.close();
    if (!mDB.isOpen()) {
      Log.d("MainActivity", "数据库关闭成功！");
    } else{
      Log.d("MainActivity", "数据库关闭失败！");
    }
  }

}
```

执行程序，新建一个标签为"MainActivity"的筛选，观察 LogCat 输出的日志。

{% img /images/posts/2015/2015-11-08@android-sqlite.png 480 控制台日志 %}

通过 LogCat 日志可以了解到，代码中对 SQLite 数据库的操作都已经执行了。