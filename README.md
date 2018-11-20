# blog

## 配置

为永久链接（Permalinks）添加两个变量：`hour` 和 `minute` 。

``` js
// hexo/bin/plugins/filter/post_permalink.js
function postPermalinkFilter(data) {
  const config = this.config;
  const meta = {
    ...
    hour: data.date.format('HH'),
    minute: data.date.format('mm')
  };
  ...
}
```

添加默认分享图片。

``` js
// hexo/lib/plugins/helper/open_graph.js
result += og('og:image', urlFn.resolve(url || config.url, '/images/logo.jpg'), false);
```

## 运行

```
hexo server
```

