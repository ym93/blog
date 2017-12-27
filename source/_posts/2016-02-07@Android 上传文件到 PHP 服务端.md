---
title: Android 上传文件到 PHP 服务端
id: 651
comment: false
categories:
  - 安卓
date: 2016-02-07 14:10:05
time: 201602071410
tags:
  - Android
  - Java
  - PHP
---

最近练习的小项目中用到了文件上传功能，从 Android 客户端向 PHP 服务端上传文件。

查了不少资料，看过很多 demo ，结果照搬过来都以失败告终了。经过阅读、思考和尝试后终于改出了能用的代码。
<!--more-->

实际上实现的方法都差不多，客户端发送 POST 请求向服务端上传文件，服务端判断、接收。

先谈一谈几点需要特别注意的地方。

① SD 卡的路径要用 `Environment.getExternalStorageDirectory` 获取，因为不同手机默认的 SD 卡路径可能不同。

② 在每次测试之前，确保本地文件确实存在且可读，用 PC 确定服务端链接可以访问。

③ 客户端设置的文件键名 name 必须和服务端一致。

客户端：

```
// 文件路径 建议用 Environment.getExternalStorageDirectory 方法获取 SD 卡路径
private String filePath = "/sdcard/example/image.jpg";

/**
 * 上传图片到服务端
 * @param targetUrl 服务端链接
 */
private void uploadFile(final String targetUrl) {
  Thread thread = new Thread() {
    @Override
    public void run() {
      String end = "\r\n";
      String twoHyphens = "--";
      String boundary = "******";
      try {
        URL url = new URL(targetUrl);
        HttpURLConnection httpURLConnection = (HttpURLConnection)url.openConnection();
        // 设置每次传输的流大小
        httpURLConnection.setChunkedStreamingMode(128 * 1024); //128K
        // 允许输入输出流
        httpURLConnection.setDoInput(true);
        httpURLConnection.setDoOutput(true);
        httpURLConnection.setUseCaches(false);
        // 使用 POST 方法
        httpURLConnection.setRequestMethod("POST");
        httpURLConnection.setRequestProperty("Connection", "Keep-Alive");
        httpURLConnection.setRequestProperty("Charset", "UTF-8");
        httpURLConnection.setRequestProperty("Content-Type",
            "multipart/form-data;boundary=" + boundary);
        DataOutputStream dos = new DataOutputStream(httpURLConnection.getOutputStream());
        dos.writeBytes(twoHyphens + boundary + end);
        // 设置 name 为 file
        dos.writeBytes("Content-Disposition: form-data; name=\"file\"; filename=\""
            + filePath.substring(filePath.lastIndexOf("/") + 1)
            + "\""
            + end);
        dos.writeBytes(end);
        FileInputStream fis = new FileInputStream(filePath);
        byte[] buffer = new byte[8192]; // 8k
        int count = 0;
        // 读取文件
        while ((count = fis.read(buffer)) != -1) {
          dos.write(buffer, 0, count);
        }
        fis.close();
        dos.writeBytes(end);
        dos.writeBytes(twoHyphens + boundary + twoHyphens + end);
        dos.flush();
        // ResponseCode 可以用来判断错误类型
        // int status = httpURLConnection.getResponseCode();
        InputStream is = httpURLConnection.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf-8");
        BufferedReader br = new BufferedReader(isr);
        // 获取返回内容
        String info = br.readLine();
        dos.close();
        is.close();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  };
  thread.start();
}
```

服务端：

``` php
// 定义 ROOT 为当前目录
define('ROOT', dirname(__FILE__).'/');  

// 限制拓展名为 jpg 且文件大小在5KB以内。
if((pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION) == "jpg") && ($_FILES["file"]["size"] < 5000)){
  // 上传文件失败
  if($_FILES["file"]["error"] > 0){
    echo "错误代码：" . $_FILES["file"]["error"] . "<br />"; 
  }
  // 上传文件成功
  else{
    if ( !( file_exists(ROOT. $_FILES["file"]["name"]) ) ){
      // 将临文件移动到指定路径
      move_uploaded_file($_FILES["file"]["tmp_name"], ROOT . $_FILES["file"]["name"]  );
    }
  }
}
?>
```

建议先写服务端代码，确定接口可用后再用客户端发送请求。