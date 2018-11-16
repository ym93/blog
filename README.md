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

## 运行

```
hexo server
```

