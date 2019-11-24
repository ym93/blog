---
title: Serverless 上车指南
date: 2019-11-24 13:01:51
categories:
  - Web Back-end
tags:
  - Serverless
  - FaaS
  - OpenWhisk
---

> Build and run applications without thinking about servers. —— AWS

<!-- more -->

## **什么是 Serverless**

Serverless，即无服务器计算，是一种云架构。

Serverless 消除基础设施管理任务，使开发者能够将更多运维职责转移给云。让开发者在不考虑服务器的情况下，构建并运行应用程序和服务。同时，它支持几乎任何类型的应用或后端服务。

**用简单的话说就是：用各种服务代替服务器，你充值就可以了。**

{% img /images/posts/2019/11/serverless_brands.jpg 540 云服务商 %}

它的优势包括：无需维护服务器，可灵活拓展，按量付费（通常是按调用次数和流量），内置可用性和容错功能，以及 —— 环保。（前方高能我要上价值）据《福布斯》杂志统计，典型服务器的计算能力仅有 5%~15% 的利用率。如今，Serverless 架构将使人类更有效率地利用计算资源，减少温室气体排放。

注：可用性是指读写操作在单台服务器出问题后，在其他服务器上依然能够完成读写操作。容错是指单台或多台服务器出问题（主要是网络问题）后，正常服务的服务器依然能正常提供服务。

**Serverles 服务由一系列服务构成，包括计算服务、存储服务、数据库服务、API 网关服务等。**目前提供 Serverless 的云服务商有 AWS、阿里云、腾讯云等等。2014 年发布的 AWS Lambda 是首个公有云无服务器计算服务。

发展里程碑：

- 2012 Iron.io 联合创始人 Ken Fromm 提出“软件的未来是 Serverless” 

- 2014 首个无服务器计算产品 AWS Lambda 发布

- 2016 百花齐放：Google Cloud Functions、IBM Cloud Functions、Azure Functions

- 2016 IBM 发布开源无服务器计算平台 OpenWhisk

当人们提到 Serverless 的时候，经常会提及另一个词 —— **FaaS**，虽然不够严谨，但现时这两个概念几乎可以画上等号。**FaaS 是构建无服务器架构的一种方式，负责提供其中的“计算服务”。**它计算逻辑，但不存储数据。

在进一步了解 FaaS 之前，我认为最好先回顾一下云计算的几种类型。



## **云计算类型回顾**

IBM 软件架构师 Albert Barron 曾用披萨作为比喻，解释这些云服务的区别。显然，这个图表还不够具体。但是它清晰地呈现了这些云计算服务渐进的变化：开发者需要考虑的越来越少，使开发者关注开发本身。

{% img no-border /images/posts/2019/11/serverless_pizza_as_a_service.jpg 540 Serverless Framework %}

上图提到的几种类型：

IaaS （Infrastructure as a Service）是基础设施即服务，只提供最少量的服务，诸如网络和云主机这些基础设施，你需要登录上去自己安装系统、运行环境，还有数据库软件。典型产品有 AWS EC2、阿里云 ECS、腾讯云 CVM。

PaaS（Platform as a Service）是平台即服务，运行环境和数据库也给你准备好了，你只需上传代码包和一些配置文件。典型产品有 Google App Engine、Sina App Engine、Baidu App Engine。

SaaS（Software as a Service）是软件即服务，拿到手就能用的东西。典型产品有企业微信、企业邮箱。

IaaS 只提供最少的服务，但并不见得省钱。我个人认为它是对前端来说最不友好的服务，大部分时候只用到它资源的冰山一角，却要学习不少与开发无关的东西。对于 PaaS，基于我过去的一些使用体验，开发者仍需要写 Nginx 配置，需要考虑用什么框架去组织代码，部署和伸缩的维度是整个项目。

有没有更理想（可以偷懒）的计算服务呢？答案就是 FaaS！我认为它介于 PaaS 和 SasS 之间。

## **什么是 FaaS**

FaaS（Function as a Service）是函数即服务，是一种云计算服务。它提供一个平台，允许使用者开发、运行和管理应用程序功能，而无需构建和维护基础设施。

{% img no-border /images/posts/2019/11/serverless_faas.jpg 540 FaaS %}

**FaaS 是基于事件驱动的。**不同于传统服务端软件需要长时间运行，FaaS 平台部署的函数仅在事件触发时执行。以 AWS Lambda 为例，当平台收到一个事件时，它将启动一个容器运行你的函数，执行完毕后即释放资源。

正因此，不同于 IaaS 需要为固定的硬件和带宽付费，FaaS 通常只需要按请求数量和流量付费。

**FaaS 和 PaaS 的概念是很相似的，他们最大的差异在于伸缩能力。**PaaS 应用无法在具体请求的层面上进行伸缩，所以 FaaS 应用的成本效益更高。AWS 云架构战略副总裁 Adrian Cockcroft 如此界定两者：如果你的 PaaS 能够有效地在20毫秒内启动实例并运行半秒，那么就可以称之为 Serverless。

目前我们可以选择的典型 FaaS 服务包括：AWS Lambda、阿里云函数计算、腾讯云云函数。

## **构建和管理 Serverless 应用**

有了 FaaS 云计算服务，我们要如何构建和管理后端应用程序呢？最直接的办法，是在云服务商提供的控制台上编写和部署函数，但这显然不够科学。

Serverless Framework 是一个构建和管理 Serverless 应用的完整解决方案。2015 年，Serverless Framework 开源项目发布。直到今天，它已然成为开发者在 FaaS 平台上部署应用的主要方式。

**简单的说，你在本地写好的函数，用命令行就能部署到云服务商提供的 FaaS 服务中。**

{% img no-border /images/posts/2019/11/serverless_serverless_framework.jpg 540 Serverless Framework %}

## **Serverless 初体验**

为更进一步了解 Serverless 应用程序的开发，我摸索了一下 Serverless Framework 搭配云函数（腾讯云）的使用姿势。我认为体验可以用“有点儿爽”来形容。

首先，需要在云函数控制台上创建一个函数，帮助我们自动配置“角色”，用于向云函数提供对接腾讯云上其他资源的权限。因为后续用 Serverless Framework 部署函数的时候，会先打包上传到对象存储服务。（踩坑后才知道的）

选择预置的 HelloWorld 函数部署就可以了。给函数配置一种触发事件，我选择的是 API 网关触发。跟随提示很容易配置了 API 网关，保存，随后便得到了一个链接。和预想的一样，访问这个链接函数就会执行，浏览器上输出了代码中打印的内容。

{% img /images/posts/2019/11/serverless_scf_trigger.jpg 480 云函数触发器 %}

接着，运行如下命令全局安装 Serverless Framework CLI：

```
npm install -g serverless
```

紧接着创建一个名为 example 的新项目 —— 也称为服务，安装依赖。

```
serverless create --template tencent-nodejs --path example
cd example
npm install
```

服务的目录结构简单到不行，除去 npm 相关的只剩下两个文件。`serverless.yml` 是配置文件，暂时只需要知道写好的函数在这里引用就行了。`index.js` 就是你写函数的地方。

```
├── index.js
└── serverless.yml
```

然后，参考 [这里](https://cloud.tencent.com/document/product/1154/38811) 在本地创建一个 `~/credentials` 文件，写入腾讯云账号的鉴权凭证。确保文件路径和项目配置文件 `serverless.yml` 中声明的一致。

```
[default]
tencent_appid = appid
tencent_secret_id = secretid
tencent_secret_key = secretkey
```

恭喜！你已经可以部署函数上云了。

默认情况下，这个服务中已经包含了一个 HelloWorld 函数。我们直接修改配置文件，给这个函数加上一个触发器。

```yaml
functions:
  function_one:
    handler: index.main_handler
    description: My First Serverless Function # 函数描述
    events:
      - apigw:
          parameters:
            stageName: release     # 部署环境
            serviceId: service-xxx # API 网关服务 ID
            httpMethod: POST       # HTTP 方法
```

箭在弦上，执行以下命令部署函数。

```
serverless deploy
```

执行部署命令后会生成一个 `.serverless` 目录，把打包好的文件放在这个目录下，然后上传到对象存储，最后完成代码的部署。

{% img /images/posts/2019/11/serverless_serverless_framework_deploy.jpg 540 Serverless Framework 部署 %}

终端上打印出了新部署的函数信息。可能遇到了什么问题，没有像预期的那样部署到 release 环境，但是这个 API 已经能正常使用了。

你可能还会用到这些命令：

```sh
serverless deploy -f function_one  # 重新部署函数
serverless invoke -f function_one  # 调用云端函数
serverless logs -f function_one -t # 实时获取函数的云端调用日志
serverless remove                  # 移除整个服务
```

随后我反复多次修改触发器，然后用 `deploy -f` 命令部署，发现**存量触发器并不会删除，而是在原有基础上增加了新的触发器**。一开始这个设定令我感到不解，它意味着不能做到把一个接口直接从 `GET` 改成 `POST`，但同时也避免了一个误操作导致事故。在我提单询问是否支持覆盖配置后，腾讯云运维小哥表示记录下了这个需求。

## **搭建 Serverless 平台**

除了直接使用云服务商提供的 FaaS 服务，我们可以搭建自己的 Serverless 平台吗？答案就是前文中提到的开源项目 —— OpenWhisk。

### **OpenWhisk 简介**

OpenWhisk 是一个事件驱动的计算平台，也被称为 Serverless 或 FaaS，它在事件触发或直接调用时执行代码。

{% img no-border /images/posts/2019/11/serverless_openwhisk.jpg 540 OpenWhisk %}       

事件（Event）是我们可以响应的一些行为。包括：收到一个 HTTP 请求，数据库记录发生变化，温度传感器检测到温度过高，GitHub 仓库提交了新代码……诸如此类。

操作（Action）是指代码片段（可以理解为函数），或嵌入 Docker 容器中的二进制码。操作用于响应事件，当事件触发时，操作会立即部署并执行。换言之，不触发事件就不会执行代码，也就不会消耗服务器资源。

触发器（Trigger）是一个特定的事件声明，可以人为触发也可以在满足条件的情况下自动触发。每个触发器都通过规则（Rule）与操作相关联。我们调用触发器，触发器定义的规则决定执行哪些操作。

包（Package）用于与其他服务集成，例如团队协作工具 Slack，代码托管平台 GitHub，使这些平台上发生的一些事件能够触发我们的触发器。

### **OpenWhisk 工作原理**

作为一个开源项目，OpenWhisk 站在巨人的肩膀上，包括 Nginx，Kafka，Docker，CouchDB。**这些组件集合在一起构成了一个“基于事件的无服务器编程服务”。**

{% img no-border /images/posts/2019/11/serverless_openwhisk_principle.jpg 450 OpenWhisk 工作原理 %} 

OpenWhisk 提供基于 HTTP，遵循 RESTful 设计的面向用户的 API。

用户的请求首先经过 Nginx —— 一个高性能的 Web 服务器，它主要用作 SSL 终端，负责请求的解密和响应的加密，以及转发请求到下一个组件。

紧接着，请求到达控制器（Controller），在这里被解析成“对操作的调用”。控制器先通过请求中的信息识别用户身份，确认他有权调用这个操作。然后从数据库（CouchDB）加载操作。每个操作在数据库中的记录包含：代码、默认参数、资源限制等信息。

然后，作为控制器一部分的负载均衡器（Load Balancer）—— 负责持续检查调用器（Invoker）的健康状况，会选择一个可用的调用器来调用操作。

控制器和调用器间使用 Kafka 通信，其缓冲和持久化功能，帮助解决系统崩溃导致消息丢失，以及高负载阻塞调用的问题。一旦 Kafka 收到消息，就会对用户的 HTTP 请求响应一个 ActivationId，用户将在稍后使用它异步地查询操作调用的结果。

**最后，OpenWhisk 的心脏 —— 基于 Docker 实现的调用器执行代码。Docker 建立起的自封装环境使每个操作以迅速、隔离和可控的方式调用。**每一次操作调用都会产生一个新容器，随后注入代码，执行完毕就销毁。



### **OpenWhisk 体验**

无！:(

很遗憾，试了几种方式都没能部署成功。不过这已经不重要了。因为部署 OpenWhisk 不会是企业使用 FaaS 的首选，这显然不够“Serverless”，也违背了让我们考虑得更少的初衷。

**或许你更应该考虑的是：选择哪一家云服务商提供的 Serverless 服务。**

&nbsp;

## 参考资料

部分参考资料如下：

[Serverless Computing - AWS](https://aws.amazon.com/serverless/)

[从 IaaS 到 FaaS —— Serverless 架构的前世今生 - AWS](https://aws.amazon.com/cn/blogs/china/iaas-faas-serverless/)

[IaaS，PaaS，SaaS 的区别 - 阮一峰的网络日志]([http://www.ruanyifeng.com/blog/2017/07/iaas-paas-saas.html](http://www.ruanyifeng.com/blog/2017/07/iaas-paas-saas.html))

[什么是 Serverless 架构和 FaaS 函数即服务？- 知乎专栏](https://zhuanlan.zhihu.com/p/31386919)

[Function as a service - Wikipedia](https://en.wikipedia.org/wiki/Function_as_a_service)

[Serverless Framework 快速入门 - 腾讯云](https://cloud.tencent.com/document/product/1154/39005)

[OpenWhisk 简介：轻松创建微服务 - IBM](https://www.ibm.com/developerworks/cn/opensource/os-introducing-openwhisk-microservices-made-easy/)

&nbsp;