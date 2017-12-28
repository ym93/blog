---
title: 使用 apiDoc 自动生成 API 文档
date: 2017-12-27 00:23:59
time: 201712270023
categories:
  - 前端
---

前段时间尝试写 API 服务器，为了方便管理数量可能越来越多的接口（未雨绸缪），必须考虑创建文档的方案。我选择了 apiDoc 作为第一款文档生成工具。apiDoc 是一个通过代码中的注释生成 API 文档的工具，它简单易用，并且支持多种常用编程语言。

<!-- more -->

{% img /images/posts/2017/2017-12-27@frontend-apidoc.png 450 使用 apiDoc 生成的文档 %}

### 安装

使用 NPM 全局安装 apiDoc ：

``` sh
npm install apidoc -g
```

### 配置

在项目根目录下新建 `apidoc.json` 配置文件。注意：`json` 文件不能包含注释，下面的注释只是为了方便解释选项含义。

``` js
{
  "name": "example",  // 项目名称
  "version": "0.1.0",  // 项目版本
  "description": "apiDoc basic example",  // 项目描述
  "title": "Custom apiDoc browser title",  // 文档标题
  "url" : "https://api.github.com/v1",  // 链接前缀
  "template": { // 模板配置
    "forceLanguage": "zh_cn"
  },
  "order": [ // 排列顺序
    "Auth",
    "Users",
    "Goods"
  ]
}
```

其中，`title` 是文档的主标题，留空使用 `name` 渲染。

`url` 是链接前缀，文档中的 API 链接都会带上这个前缀。这样做的好处是不必总是写完整的 API 链接，即使换域名也只需修改一处。

模板相关配置 `template` 并不是必要的，这里我指定了渲染的语言为简体中文。

`order` 同样是一个可选的配置项，用于设置分组的显示顺序。

### 撰写

使用注释撰写 API 信息。一个简单的接口描述只需声明 `@api`、`@apiName`、`@apiGroup` 三个参数。

``` php
/**
 * @api {get} /user/:id 获取用户
 * @apiName GetUser
 * @apiGroup User
 */
```

`@api` 必须，声明请求类型、路径、标题（显示在文档中）。`@apiName` 声明接口显示在文档中的容器 id ，官方建议必填，实际上不声明也会自动生成。`@apiGroup` 必填，声明接口分组。

在此基础上进一步声明参数和响应。

``` php
/**
 * ...
 *
 * @apiParam {Number} id 用户 id
 *
 * @apiSuccess (200) {String} name  用户名
 * @apiSuccess (200) {String} email 用户的邮箱地址
 *
 * @apiSuccessExample {json} 请求成功：
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "张三",
 *       "email": "foo@example.com"
 *     }
 *
 * @apiError UserNotFound 未找到指定的用户
 *
 * @apiErrorExample 请求失败：
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
```

`@apiParam` 选填，声明一个参数的类型、参数名、描述。

`@apiSuccess` 选填，声明请求成功后的响应分组、字段类型、字段（或成功代码）、字段描述。`@apiSuccessExample` 选填，声明请求成功后响应内容的格式、标题和示例。声明错误的 `@apiError` 和 `@apiSuccessExample` 与之类似。

Tips: 分组名称不可以直接使用中文。应该用 `@apiDefine` 声明一个值为中文组名的变量，然后在声明 API 分组时使用它。

``` php
/**
 * @apiDefine Auth 认证
 */

/**
 * @api {post} /auth
 * @apiGroup Auth
 */
```

### 生成

``` sh
apidoc -i ./ -o apidoc
```

`-i` 或 `--input` 参数表示输入目录。`-o` 或 `--output` 参数表示输出目录。`-i ./ -o apidoc` 的意思是：扫描当前目录下的文件，然后在当前目录下的 `apidoc` 文件夹中生成文档。

另外，可以使用 `-f` 或 `--file-filters` 参数过滤文件类型。

``` sh
apidoc -f ".*\\.js$" -f ".*\\.ts$"
```

ENV: Windows 7 x64 / Node.js 6.10.1 / npm 3.10.10 / apiDoc 0.17.6