const css = hexo.extend.helper.get('css').bind(hexo)

// 页面样式
hexo.extend.injector.register('head_end', () => {
  return css('css/home.css')
}, 'home')
hexo.extend.injector.register('head_end', () => {
  return css('css/404.css')
}, '404')
hexo.extend.injector.register('head_end', () => {
  return css('css/post.css')
}, 'post')
hexo.extend.injector.register('head_end', () => {
  return css('css/category.css')
}, 'category')
hexo.extend.injector.register('head_end', () => {
  return css('css/archive.css')
}, 'archive')
hexo.extend.injector.register('head_end', () => {
  return css('css/tag.css')
}, 'tag')
hexo.extend.injector.register('head_end', () => {
  return css('css/categories.css')
}, 'categories')
hexo.extend.injector.register('head_end', () => {
  return css('css/about.css')
}, 'about')