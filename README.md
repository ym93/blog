# blog

>我的个人博客

## 配置

添加变量 `hour` 和 `minute`，用于支持在永久链接里使用发布时间的小时和分钟。

``` js
// hexo/lib/plugins/filter/post_permalink.js
function postPermalinkFilter(data) {
  const config = this.config;
  const meta = {
    /* ... */
    hour: data.date.format('HH'),
    minute: data.date.format('mm')
  };
  ...
}
```

添加默认的开放图谱缩略图，用于在 Facebook 和 Twitter 等海外平台上分享时显示。

``` js
// hexo/lib/plugins/helper/open_graph.js
if (!images.length) result += og('og:image', urlFn.resolve(url || config.url, '/images/logo.jpg'), false);
```

## 运行

启动本地服务器：

```
hexo server
```

## 更换主题

以 NexT 主题为例，迁移自定义代码。

```
/themes/next/_config.yml        # 主题配置
/themes/next/layout/_custom     # 自定义页面结构
/themes/next/source/css/_custom # 自定义样式
```

需要关注的主题配置项有：

- Favicon
- 菜单
- 边栏头像
- 搜索
- 统计