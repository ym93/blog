
const CleanCSS = require('clean-css')
const babel = require('@babel/core')
const cheerio = require('cheerio')
const { minify } = require('html-minifier')

hexo.extend.filter.register('after_render:js', function(str, data){
  const { code } = babel.transformSync(str)
  return code
})

hexo.extend.filter.register('after_render:css', function(str, data){
  const { errors, styles } = new CleanCSS().minify(str)
  if (errors.length) throw errors[0]
  return styles
})


hexo.extend.filter.register('after_render:html', function(str, data){
  const { config } = this
  const { config: themeConfig } = this.theme
  // 添加表格容器
  const $ = cheerio.load(str)
  $('table')
    .replaceWith(function() {
      const table = $(this).clone()
      const el = $('<div></div>')
      el.addClass('table-wrap')
      el.append(table)
      return el
    })
  str = $.html()
  if (process.env.NODE_ENV === 'production') {
    // 替换资源链接为 CDN
    const reg = new RegExp('(src|href)="' + config.root + '(img|css|js)', 'g')
    str = str.replace(reg, `$1="${themeConfig.cdn_base_url}$2`)
    // 压缩
    str = minify(str, {
      removeComments: true,
      collapseWhitespace: true
    })
  }
  return str
})