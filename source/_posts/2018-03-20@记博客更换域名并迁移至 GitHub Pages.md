---
title: 记博客更换域名并迁移至 GitHub Pages
date: 2018-03-20 11:14:57
time: 201803201114
categories:
  - 后端
tags:
  - GitHub Pages
  - SSL
  - HTTPS
  - CDN
  - DNS
---

最近在 Namecheap 注册了一个新域名 `yiming.blog` ，打算单独用于博客，替换掉原有的域名。无奈目前 `.blog` 域名无法在国内备案，只能考虑迁移到境外主机。为了避免不必要的资源浪费，我决定将其迁移到 GitHub Pages，并使用 CDN 提供 HTTPS 能力。

<!-- more -->

### 部署代码

[GitHub Pages](https://pages.github.com/) 是 GitHub 提供的静态网页托管服务。相信不需要多余的笔墨介绍。只需创建一个名称为 `{username}.github.io` 的仓库并提交网页代码，然后在 `Settings` 中启用 GitHub Pages 即可上线你的个人静态网站。`{username}` 表示你的用户名。

### 绑定域名

首先，登录域名注册商的后台修改 DNS 设置，添加一条 CNAME 记录，将主域名指向 `{username}.github.io` 。然后在代码仓库的根目录下新建一个 `CNAME` 文件，写入域名。这样就可以用独立域名访问你的网站了。需要注意的是，一个 GitHub Pages 仅支持绑定一个域名，即使 `CNAME` 文件中存在多个域名也只会匹配第一个。

### 启用 HTTPS

GitHub Pages 支持在使用默认二级域名 `{username}.github.io` 的情况下启用 HTTPS ，绑定独立域名则无法开启。于是我决定使用 [Cloudflare](https://www.cloudflare.com) 的免费 DNS 服务为托管站点赋能 HTTPS 。

首选需要将域名交给 Cloudflare 解析，登录域名注册商的后台，修改域名的 NS 服务器：

```
kiki.ns.cloudflare.com
ram.ns.cloudflare.com
```

别忘了在 Cloudflare 的控制面板中设置主域名的 CNAME 记录指向 `{username}.github.io` 。然后在 `Crypto` 标签页中将 SSL 状态设置为 `Flexible` 。这时候已经可以用 `https://{你的域名}` 访问站点了。

接下来，为了使所有的 `http` 访问都重定向到 `https` ，即禁用非安全链接访问，应该启用 `Always use HTTPS` 功能。或者在 `Page Rules` 标签页中设置两条 URL 规则：

```
www.example.com/*  Forwarding URL (301)  https://example.com/$1
http://yiming.blog/*  Always Use HTTPS
```

一是将带 `www` 的二级域名永久重定向至主域名，有利于集中搜索引擎权重，二是始终使用 `https` 访问。

更新：

2018年5月1日，GitHub 宣布自定义域名支持 HTTPS，可以直接在 Pages 设置中启用。

### 旧域名重定向

搜索引擎不会立刻知晓网站更换了域名，所以依然会有访问者打开旧的链接。为了不影响访问，同时通知搜索引擎更换收录的域名，需要将旧域名的链接全部 301 重定向到新域名。

假设旧域名为 `www.foo.com` ，新域名为 `bar.com` ，这是一个 Nginx 的配置示例：

```
server {
  listen 80;
  server_name www.foo.com;
  return 301 https://bar.com$request_uri;
}
server {
  listen 443;
  server_name www.foo.com;
  return 301 https://bar.com$request_uri;
}
```

至此，域名更换与迁移大功告成。
