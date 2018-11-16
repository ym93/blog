---
title: Android 客户端发送 GET 请求
id: 595
comment: false
categories:
  - 安卓
date: 2016-01-29 22:10:47
tags:
  - Android
  - Java
---

最近在开发涉及服务端的工程，预感到将会频繁使用客户端向服务端发送 GET 请求、服务端向客户端返回内容。

于是 review 了以前写的一个雏形天气应用，重新理顺了使用方法，在此总结以备后用。
<!--more-->

服务端我用的是 php ，功能无非是查询数据库和屏幕输出字符串，不再赘述。这里主要讲讲客户端的代码。

交互顺序大致是：客户端请求 http 链接，一般是带参数的 GET 链接。服务端做出反应，并屏幕输出内容（如登录是否成功），待客户端读取。客户端读取返回内容，并做出相应动作，如显示一个密码错误的提示。

这里客户端向服务端传递了2个参数，获取到服务端屏幕输出的信息，并通过 Handler 将信息发送给主线程。

``` java
// 获取要发送的参数
final String email = mEditEmail.getText().toString();
final String password = mEditPassword.getText().toString();
// 创建一个新线程
Thread thread = new Thread(){
  @Override
  public void run(){
    String link = "http://www.caiyiming.com/example.php?email=" + email + "&password=" + password; //要请求的链接
      try{
      // 发送 http 请求
      URL url = new URL(link);
      HttpURLConnection conn= (HttpURLConnection)url.openConnection(); conn.connect(); 
      // 读取返回的内容
      InputStream in = conn.getInputStream();
      BufferedReader reader = new BufferedReader(new InputStreamReader(in));
      String info = reader.readLine();
      // 发送消息给主线程
      Message msg = Message.obtain();
      msg.obj = info;
      msg.what = 0;
      handler.sendMessage(msg);
    } catch (MalformedURLException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
};
thread.start();
```

假设服务端收到参数后，在数据库内比对了邮箱和密码，并屏幕输出了 _success_ 或 _failure_ 来向客户端反馈校验是否成功。子线程读取到信息后通过 Handler 的 `sendMessage` 向主线程发送消息。

接下来我们需要在主线程中写一个 Handler ，用于接收子线程传递过来的 _success_ 或 _failure_ ，并在用户界面上显示简短提示。

``` java
// 处理返回的内容
Handler handler = new Handler(){
  @Override
  public void handleMessage(Message msg){
  super.handleMessage(msg);
  String info = (String)msg.obj;
  if( info.equals("success") ){
    Toast.makeText(getBaseContext(), "校验成功"), Toast.LENGTH_SHORT).show();
  } else( info.equals("failure") ){
    Toast.makeText(getBaseContext(), "校验失败"), Toast.LENGTH_SHORT).show();
  }
  }
};
```

为什么我们不在子线程中直接显示提示呢？因为 UI 的变化只能由主线程来执行，在子线程中改变界面会导致程序崩溃。这一点我也是在经历过多次崩溃的教训后才终于理解了。

在这个例子中我只让服务端输出了简短的字符串，实际使用时也可以采用 JSON 格式输出大量信息，可参考 JSON 的解析方法实现。