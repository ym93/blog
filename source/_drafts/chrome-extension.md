---
title: Chrome 扩展：从入门到造一个书签同步插件
categories:
  - Web Front-end
tags:
  - Chrome
  - WebComponents
---

## 认识 Chrome 扩展

扩展（Extension）是用于修改或者增加浏览器功能的小型软件。“扩展”这个称谓可能稍显陌生，在国内人们更习惯于称它们为**浏览器插件**。它们使用 HTML，JavaScript, CSS 等网页开发技术构建。

**你可以理解为，扩展就是在浏览器中持续运行的网页，当你需要时随时唤醒它，而不需要等待加载。**扩展之于 Chrome 浏览器，就像小程序之于微信。

{%img no-border /images/posts/2019/12/chrome_extension_adblock.png 450 Chrome 扩展 %}

Chrome 扩展经历了：

- 2009年9月，谷歌开发者网站公布扩展。
- 2009年12月，Google Chrome 扩展程序中心公测，发布大约300个扩展。
- 2010年1月，Google Chrome 扩展程序中心正式上线，包含大约1500个扩展。
- 2010年12月，“扩展中心”升级为我们今天熟知的 Chrome 网上应用店。

**时至今日，Chrome 网上应用店托管着大约19万个扩展。**

[图：一些常见的扩展]

它们之中有大名鼎鼎的广告拦截程序 Adblock Plus，网页长截屏工具 Full Page Screen Capture，也有前端开发同学们熟悉的调试工具 Vue Devtools，React Developer Tools。

为什么扩展能够提供如此多样的功能？

除了程序猿们的努力，更重要的一点是 **Chrome 开放了各种强大的接口**赋能开发者。翻看文档可以发现，`chrome.tabs` 接口提供了“读取和修改页面内容”的能力，使得“屏蔽广告”成为可能。

这并不意味着扩展可以不受限制地访问你浏览的内容。和手机上的 app 类似，扩展需要获取权限才能使用相应的能力，同时受用户和 Chrome 网上应用店监督。

## Crome 扩展的结构

扩展程序由一些“组件”构成。它们都由常见的 web 技术编写，各自负责不同的工作。

{%img no-border /images/posts/2019/12/chrome_extension_structure.png 580 Chrome 扩展结构 %}

**清单**

每个扩展都必须有一个 JSON 格式的清单文件（Manifest），作为扩展程序的配置文件，用于记录一些必不可少的信息。例如：名称和描述，需要使用哪些权限，可以如何与用户交互。

只要有这个文件，扩展就可以被浏览器识别和安装 —— 即使它不具备任何实用功能。

**背景页**

背景页（Background Page）是一个在后台持续运行的页面。

虽然称之为一个“页面”，但实际对用户是不可见的。背景页随着浏览器打开（扩展加载）而运行，直到浏览器关闭才会停止。它负责维护扩展的全局状态，还可以和其他扩展通信。

**弹窗**

弹窗（Popup）是扩展与用户交互最常用的方式。其实就是我们平常在浏览器的地址栏右侧，点击扩展按钮会显示的弹窗，通常提供一些设置选项。

弹窗的生命周期很短，切换标签页就会销毁，再次点击图标会打开一个新的弹窗实例。所以重要的临时数据和操作一定要放在背景页当中。

**内容脚本**

内容脚本（Content Scripts）是运行于网页的上下文环境中的脚本。它可以注入网页中，通过 DOM 读取和修改用户正在浏览的网页中的内容。

现在知道广告屏蔽插件如何让牛皮癣消失了吧？

**选项页**

选项页（Options Page）的本质是一个完整可见的网页，它的定位是向用户提供更多定制选项。

对于一些功能复杂的扩展，弹窗能够提供的交互是不够的。在工具栏右键点击扩展图标，选择菜单中的“选项”，即可浏览扩展的选项页。

## Hello World

接下来我们动手编写一个没什么卵用的 Chrome 扩展，它能够帮助你具备最基础的扩展开发能力。

### 从清单开始

首先，新建一个目录并创建清单文件 `manifest.json`。

```json
{
  "name": "Chrome Extension Example",
  "version": "1.0",
  "description": "Hello, Chrome extension!",
  "manifest_version": 2
}
```

[完整](https://developer.chrome.com/extensions/manifest) 的清单文件包含很多配置项，实际上必要的只有  `name`，`version` 和 `manifesct_version`。顾名思义分别是扩展的名称，版本，以及清单格式版本。

接着，通过工具栏菜单或访问 `chrome://extensions` 进入扩展程序管理。启用“开发者模式”。开启后即可通过本地目录安装扩展，调试背景页。

{%img no-border /images/posts/2019/12/chrome_extension_management.png 480 扩展管理 %}

点击“加载已解压的扩展程序”，选择刚才创建的目录，这个什么功能都没有的扩展就被安装到了浏览器上。地址栏的右侧也新增了一个按钮。

### 添加背景页

接下来添加背景页，用来打印一段文字，顺便体验一下 Chrome 拓展 API。

`chrome.storage` API 是扩展的存储接口。它提供了用于存储数据到云端（与用户的 Google 账户关联）的 `sync` 方法，以及存储数据到本地的 `local` 方法。

首先，在清单文件中注册 `storage` 权限和背景页。

```json
{
  // ...
  "permissions": ["storage"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  }
}
```

然后，创建背景页脚本 `background.js`，它将在扩展安装后打印一段文字。

```js
// background.js
chrome.runtime.onInstalled.addListener(function() {
  // 存储数据
  chrome.storage.sync.set({ msg: 'Hello, World!'}, function() {
    // 读取数据
    chrome.storage.sync.get(['msg'], function(result) {
      // 打印数据
      console.log(result.msg)
    })
  })
})
```

最后，重新加载扩展并点击“查看背景页”，弹出的控制台中打印出了：“Hello, World!”。

{%img no-border /images/posts/2019/12/chrome_extension_debug_background.png 540 调试背景页 %}

### 添加弹窗

在清单文件中使用 `browser_action` 或 `page_action` 注册弹窗。

```json
{
  // ...
  "browser_action": {
    "default_popup": "popup.html"
  }
}
```

两个配置项都可以自定义扩展按钮的图标和功能。它们的区别在于：浏览器按钮（Browser Action）默认在任何时候都可用；页面按钮（Page Action）按钮默认置灰，开发者按需为一些标签页或网址启用。用哪个取决于业务场景，这里我们用前者就行了。

接着，创建弹窗的布局文件 `popup.html`。仅仅设置了宽度，添加一串文本到 `<body/>` 中。

```html
<!-- popup.html -->
<html>
  <head>
    <style>body { width: 100px; }</style>
  </head>
  <body>Hello, World!</body>
</html>
```

重新加载扩展并点击图标，图标下方出现自定义弹窗。

{%img no-border /images/posts/2019/12/chrome_extension_popup.png 450 扩展的弹窗 %}

### 自定义图标

在按钮配置中使用 `default_icon` 设置图标。

```json
{
  // ...
  "browser_action": {
    "default_icon": {
      "16": "images/icon_16.png",
      "24": "images/icon_24.png",
      "32": "images/icon_32.png"
    },
    "default_popup": "popup.html"
  }
}
```

聪明的你应该注意到了，刚刚配置的图标和弹窗都是 `default` 开头的默认值。

这是因为 Chrome 提供了动态修改它们的接口。以浏览器按钮为例，`chrome.browserAction` API 包含了用于设置弹窗的 `setPopup`，以及用于设置图标的 `setIcon`。

## 做一个书签同步扩展



### 为什么做



## 参考资料

部分参考资料如下：

- [Google Chrome Extensions - Wikipedia](https://en.wikipedia.org/wiki/Google_Chrome#Extensions)

- [Extend the Browser - Google Chrome](https://developer.chrome.com/extensions)

- [Extension APIs - Google Chrome](https://developer.chrome.com/extensions/api_index)