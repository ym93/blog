---
title: Promise 的原理与简单实现
categories:
  - Web Front-end
tags:
  - ES6
  - JavaScript
  - Promise
---


## 什么是 Promise

起初，人们使用回调函数进行异步编程。回调函数是指一个可被另一个函数访问，并在后者执行后调用的函数。过多的回调函数嵌套形成难以阅读和维护的回调地狱（Callback Hell / Pyramid of Doom）。

``` js
login(function () {
  getUserInfo(function () {
    getProductList(function () {
      ...
    })
  })
})
```

这时候人们开始思考更佳的异步解决方案，Promise 应运而生。

`promise` 这个词的原意是约定。在现实生活中，约定往往不是立即做一件事，而是在满足一定条件下做或不做某事。

电影《泰坦尼克号》中杰克对罗斯说“你跳，我也跳（You jump, I jump）”。由于杰克不知道罗斯跳不跳，何时跳，后者的行为可以视为一个需要等待的异步操作。罗斯的行为可能从犹豫到跳，或者从犹豫到不跳。杰克准备好了两种情况的应对方案。所以杰克说的话实际上声明了一个 Promise。

Promise 是一个表示异步操作的最终结果的对象。它帮助我们跟进异步操作的状态，并根据结果执行不同的代码。

在 ES6 中我们通常会这样使用 Promise ：

``` js
const promise = new Promise((resolve, reject) => {
  // 异步操作 ...
  // 如果操作完成
  resolve(value)
  // 否则
  reject(error)
})
promise.then(value => {
  // 完成
}).catch(error => {
  // 拒绝或抛出异常
})
```

Promise 的构造函数接收一个立即执行的函数 `executor`，这个函数通常包含异步操作。`executor` 的两个参数 `resolve` 和 `reject` 函数用于更新 Promise 的状态。

`then` 方法注册完成时的回调，该回调函数能够访问终值 `value`（如果有）。`catch` 方法注册拒绝时的回调，该回调函数能够访问拒绝的原因 `error`（如果有）。Promise 的状态更新后，相应的回调函数将被执行。

## Promise/A+ 规范

Promise 最早由社区提出，后来逐渐形成了几种规范。目前较权威的规范是 [Promise/A+](https://promisesaplus.com/) ，ES6 正是遵循此规范实现，使 Promise 正式成为了 JavaScript 标准的一部分。

简单的说一个 Promise：

1. 存在三种状态：pending 表示异步操作尚未结束，fulfilled 表示完成（成功），rejected 表示拒绝（失败）。
2. 状态的改变只能从 pending 到 fulfilled / rejected 。人生无法重来，Promise 也一样。
3. 必须提供一个 `then` 方法用于注册回调函数。
4. 完成时有一个终值（eventual value），拒绝时有一个不能完成的原因（reason）。

经常使用 ES6 Promise 的同学应该会注意到，ES6 使用 resolved 状态替代了标准中的 fulfilled ，并且实现了标准中没有要求的 `catch`、`all` 等实用特性。

此外，规范并没有说明 Promise 对象如何产生。ES6 使用构造函数创建 Promise 对象。

## 实现基础的 Promise

根据前述规范实现一个基础的 Promise 构造函数：

``` JS
function MyPromise (executor) {

  var that = this

  // 初始状态为 pending
  this.status = 'pending'

  this.onFulfilled = null
  this.onRejected = null

  // 用于注册完成和拒绝回调的实例方法 then
  this.then = function (onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  }

  // 完成时执行的局部函数 fulfill
  function fulfill (eventualValue) {
    if (that.status === 'pending') {
      that.status = 'fulfiled'
      typeof that.onFulfilled === 'function' && that.onFulfilled(eventualValue)
    }
  }

  // 拒绝时执行的局部函数 reject
  function reject (reason) {
    if (that.status === 'pending') {
      that.status = 'rejected'
      typeof that.onRejected === 'function' && that.onRejected(reason)
    }
  }

  // 实例化时立即执行的函数 executor
  executor(fulfill, reject)

}
```

然后可以这样使用 MyPromise：

``` js
const promise = new MyPromise((fulfill, reject) => {
  // 异步操作 ...
  // 如果操作完成
  fulfill(200)
  // 否则
  reject('Some reasons')
})

promise.then(value => {
  console.log('Eventual Value: ', value)
}, reason => {
  console.log(reason)
})
```

## 增加链式调用

你可能注意到，通过上面的构造函数创建的 Promise 只能注册一个完成回调，并不支持这样的链式调用：

``` js
promise.then(value => {
  // 第一个回调
}).then(value => {
  // 第二个回调
})
```

因此需要稍作改进：

1. 为了存储多个回调函数，`onFulfilled` 属性应该是一个数组，每次调用 `then` 方法都追加一个回调函数。
2. `then` 方法返回当前 promise 实例，以实现链式调用。（事实上也是规范的要求）
3. 完成时执行 `onFulfilled` 数组中的所有函数。

``` js
this.onFulfilled = []

this.then = function (onFulfilled, onRejected) {
  this.onFulfilled.push(onFulfilled)
  this.onRejected = onRejected
  return this
}

function fulfill (eventualValue) {
  if (that.status === 'pending') {
    that.status = 'fulfiled'
    for (var i = 0; i < that.onFulfilled.length; i++) {
      typeof that.onFulfilled[i] === 'function' && that.onFulfilled[i](eventualValue)
    }
  }
}
```

## 增加 catch 方法

接下来实现一个类似 ES6 Promise 的 `catch` 方法。

`catch` 方法可以注册拒绝回调，行为类似 `then(null, onRejected)` ，同时可以处理 `executor` 抛出的错误。

首先增加一个 `catch` 方法：

``` js
this.catch = function (onRejected) {
  this.onRejected = onRejected
  return this
}
```

然后修改执行 `executor` 的语句。使用 `try...catch` 语句捕获错误，并在出错时执行 `onRejected` 方法。

``` js
setTimeout(function () {
  try {
    executor(fulfill, reject)
  } catch (e) {
    if (typeof that.onRejected === 'function') that.onRejected(e)
    else throw e
  }
})
```

包裹 `setTimeout` 的目的是延迟执行，确保执行 `executor` 时失败回调已经注册完毕。

## 实现 Promise.all 

前面实现的 Promise 已经可以胜任“等一件事完成再做另一件事”的工作。那如果我们要等两件甚至更多件事完成，最后再做某事呢？比如做菜时等菜切好、油烧热再下锅。

ES6 中实现的 `Promise.all` 接收一个数组，返回一个 Promise 实例。这个实例在数组内所有 `promise` 完成时才会完成，任何一个 `promise` 拒绝都将导致其拒绝。

下面的代码实现了一个 `all` 方法：

``` js
MyPromise.all = function (promises) {
  return new MyPromise(function (fulfill, reject) {
    var index = 0
    function next () {
      promises[index].then(function () {
        index++
        if (index < promises.length) next()
        else fulfill()
      }).catch(function (reason) {
        reject(reason)
      })
    }
    next()
  })
}
```
