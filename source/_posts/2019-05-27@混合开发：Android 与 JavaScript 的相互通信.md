---
title: 混合开发：Android 与 JavaScript 的相互通信
tags:
  - Hybrid App
  - WebView
  - JsBridge
  - Java
  - JavaScript
categories:
  - Android
date: 2019-05-27 00:37:22
---


现代移动应用开发已经广泛运用了 Hybrid 模式，催生了 Hybrid App（混合模式移动应用），即在原生壳中内嵌网页，部分功能由 HTML5 实现的移动应用。

这种方案能大幅减少开发时间和成本，易于更新维护。因此以淘宝、京东为代表的电商 app，经常使用网页实现需灵活更新的页面。

<!-- more -->

Hybrid 的基础是原生与网页的相互通信。在 Android 平台可以认为是 Java 和 JavaScript 的相互调用。



## Android 调用 JavaScript

### loadUrl

在 Android 中调用 JavaScript 最简单的方式是使用 `WebView.loadUrl` 方法。

`loadUrl` 用于加载给定的链接。在链接中使用 `javascript` 伪协议，浏览器将执行 `:` 后面的 JavaScript 代码。

下面这行代码执行了 JS 中的 `showMessage` 函数：

``` java
mWebView.loadUrl("javascript:showMessage('Hello, Web!')");
```

这种方式的缺点是无法取得返回值，适合不需要返回值的场景。

### evaluateJavascript

Android 4.4 以后提供了 `WebView.evaluateJavascript` 方法。它用于异步执行 JavaScript，当返回值非空时执行回调，据说有着比 `loadUrl` 更高的执行效率。

下面这段代码同样执行了 JS 中的 `showMessage` 函数，并且能够在 `onReceiveValue` 方法中拿到返回值。

```java
mWebView.evaluateJavascript("javascript:showMessage('Hello, Web!')", new ValueCallback<String>() {
  @Override
  public void onReceiveValue(String value) {
    // 打印返回值
    log.d(value);
  }
});
```



## JavaScript 调用 Android

### shouldOverrideUrlLoading

`WebViewClient.shouldOverrideUrlLoading` 用于拦截即将加载的链接，重写默认行为。

因此，我们可以事先约定一系列伪协议链接：

```
myapp://showToast?text=Hello
```

然后在 Android 中拦截 WebView 加载的链接。对于符合约定格式的链接，执行相应的操作。对于其他链接，保持默认的加载行为。

```java
private static final String APP_SCHEME = "myapp:";
...

mWebView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if (url.startsWith(APP_SCHEME)) {
            // 解析链接
            urlData = URLDecoder.decode(url.substring(APP_SCHEME.length()), "UTF-8");
            // 执行相应操作...
            return true;
        }
        return false;
    }
});
```

在网页中调用时只需要当作一个重定向就够了。

```javascript
window.location.href = 'myapp://showToast?text=Hello'
```

### addJavascriptInterface

`WebView.addJavascriptInterface` 用于绑定接口，使 JavaScript 能够调用 Android 代码。

简单地说，我们在 Android 里声明接口。接口包含我们想要暴露给网页调用的方法，它以对象的形式注入到 JavaScript 的 `Window` 对象下。最后，JavaScript 调用接口对象的方法，执行接口中的原生代码。

首先创建一个接口类：

``` java
public class WebAppInterface {

  Context mContext;

  // 初始化接口并设置上下文
  WebAppInterface(Context c) {
    mContext = c;
  }

  // 显示短消息的接口
  @JavascriptInterface
  public void showToast(String text) {
    Toast.makeText(mContext, text, Toast.LENGTH_SHORT).show();
  }

}
```

注意，Android 4.2 以上使用 `@JavascriptInterface` 注解的方法才会暴露给 JavaScript。

然后向 WebView 添加这个接口，并将其命名为 `Android`。

``` java
mWebView.addJavascriptInterface(new WebAppInterface(this), "Android");
```

当网页加载完成时，WebView 也将注入一个 `Window.Android` 对象。

通过这个对象就可以调用接口中的原生方法了：

```javascript
Android.showToast('Hello, Android!')
```



## 使用 JsBridge

JsBridge 是一个成熟的，用于原生和网页双向通信的开源库。它封装了上文提到的通信方式，并且提供包含传参、返回值和回调的完整方案。JsBridge 会向网页注入一个 `Window.WebViewJavascriptBridge`  对象。

JsBridge 的使用方法非常简单。

在布局文件中使用 `com.github.lzyzsd.jsbridge.BridgeWebView` 替代默认的 `WebView` 控件。

接着注册一个 Java 处理器：

``` java
webView.registerHandler("showToast", new BridgeHandler() {
  @Override
  public void handler(String data, CallBackFunction function) {
    // 执行原生代码...
    function.onCallBack("return value");
  }
});
```

在 JavaScript 中调用 Java 处理器：

``` javascript
WebViewJavascriptBridge.callHandler('showToast', 'Hello, Android!', responseData => {
  // 打印返回值
  console.log(responseData)
})
```

类似的，我们也可以注册 JavaScript 处理器：

``` javascript
WebViewJavascriptBridge.registerHandler('showMessage', (data, responseCallback) => {
  // 执行网页脚本...
  responseCallback('return value')
})
```

然后在 Java 中调用 JavaScript 处理器：

``` java
webView.callHandler("showMessage", "Hello, JavaScript!", new CallBackFunction() {
  @Override
  public void onCallBack(String data) {
    // 打印返回值
    log.d(data);
  }
});
```

访问 [GitHub](https://github.com/lzyzsd/JsBridge) 了解更多 JsBridge 的使用说明。



相关环境：macOS 10.14 / Android Studio 3.3 / JsBridge 1.0