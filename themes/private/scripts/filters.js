hexo.extend.filter.register('after_post_render', function (data) {
  // 图片懒加载
  data.content = data.content.replace(/<img(.*)>/g, '<img$1 loading="lazy">');
  return data;
});