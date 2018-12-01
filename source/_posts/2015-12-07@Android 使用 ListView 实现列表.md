---
title: Android 使用 ListView 实现列表
categories:
  - 安卓
date: 2015-12-07 15:19:12
tags:
  - Android
  - Java
---

第一步，在 Activity 的布局文件中添加 ListView 控件。

<!-- more -->

``` xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  tools:context="${relativePackage}.${activityClass}" >

  <ListView 
    android:id="@+id/listviewList"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"/>

</RelativeLayout>
```

第二步，新建一个布局文件 layout_listview_item.xml ，作为列表中子项目的布局。

这里我添加了一个 ImageView 和两个 TextView ，LinearLayout 和 RelativeLayout 仅用于排版。

``` xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  android:padding="10dp" >

  <LinearLayout 
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <RelativeLayout 
      android:layout_width="wrap_content"
      android:layout_height="match_parent"
      android:paddingRight="5dp"
      android:gravity="center">
      <ImageView 
      android:id="@+id/imageviewImage"
      android:layout_width="25dp"
      android:layout_height="25dp"/>
    </RelativeLayout>

    <RelativeLayout 
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:gravity="center">
      <TextView 
      android:id="@+id/textviewTextOne"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"/>
    <TextView 
      android:id="@+id/textviewTextTwo"
      android:layout_below="@id/textviewTextOne"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"/>
    </RelativeLayout>

  </LinearLayout>

</RelativeLayout>
```

第三步，在 Activity 的代码中实现 ListView 。

``` java
public class MainActivity extends Activity {

  // 声明控件
  private ListView mListView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    // 实例化控件
    mListView = (ListView) findViewById(R.id.listviewList);
    // 生成动态数组
    ArrayList<HashMap<String, Object>> mListItem = new ArrayList<HashMap<String, Object>>();
    for(int i=0; i<10; i++) {
      // 新建 HashMap 对象
      HashMap<String, Object> mMap = new HashMap<String, Object>(); 
      // 插入图像
      mMap.put("ItemImage", R.drawable.ic_launcher );
      // 插入文本
      mMap.put("ItemTitle", "Item");
      // 插入变量
      mMap.put("ItemText", "This is Item No."+i);
      mListItem.add(mMap);  //添加进动态数组
    }
    // 生成适配器
    SimpleAdapter mSimpleAdapter = new SimpleAdapter(this, mListItem, // 数据对象
      R.layout.layout_listview_item, // 子项目布局文件
      new String[] {"ItemImage", "ItemTitle", "ItemText"}, // 数组中内容的key
      new int[] {R.id.imageviewImage, R.id.textviewTextOne, R.id.textviewTextTwo } // 对应控件的ID
    ); 
    // 添加并显示
    mListView.setAdapter(mSimpleAdapter);
    // 处理点击事件
    mListView.setOnItemClickListener(new OnItemClickListener() {
      @Override  
      public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,  
          long arg3) {
        Toast.makeText(getBaseContext(), "点击了第" + arg2 + "个项目", Toast.LENGTH_SHORT).show();
      }  
    });
    // 处理长按事件
    mListView.setOnCreateContextMenuListener(new OnCreateContextMenuListener() {
      @Override  
      public void onCreateContextMenu(ContextMenu menu, View v, ContextMenuInfo menuInfo) {  
        menu.setHeaderTitle("长按菜单"); // 窗口标题
        menu.add(0, 0, 0, "菜单第一行"); // 菜单子项
        menu.add(0, 1, 0, "菜单第二行");
        menu.add(0, 2, 0, "菜单第三行");
      }  
    }); 
  }

  // 长按菜单点击事件 
  @Override  
  public boolean onContextItemSelected(MenuItem mItem) {
    Toast.makeText(getBaseContext(), "点击了长按菜单中的第" + mItem.getItemId() + "个项目", Toast.LENGTH_SHORT).show();
    return super.onContextItemSelected(mItem);  
  }

}
```

实现效果：

{% img side-by-side /images/posts/2015/12/android_list_view_1.png 220 列表 %}

{% img side-by-side /images/posts/2015/12/android_list_view_2.png 220 点击事件 %}

{% img side-by-side /images/posts/2015/12/android_list_view_3.png 220 长按事件 %}