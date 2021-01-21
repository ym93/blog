const babel = require('@babel/core')
const css = hexo.extend.helper.get('css').bind(hexo)
const fs = require('fs')
const path = require('path')
const { compileScss, } = require('../utils')

// hexo.extend.injector.register('head_end', () => {
//   const css = compileScss({ file: path.join(__dirname, '../source/_css/index.scss') })
//   return `<style>${css}</style>`
// })

hexo.extend.injector.register('head_end', () => {
  const css = compileScss({ file: path.join(__dirname, '../source/_scss/layout/home.scss') })
  return `<style>${css}</style>`
}, 'home')

hexo.extend.injector.register('head_end', () => {
  const css = compileScss({ file: path.join(__dirname, '../source/_scss/layout/404.scss') })
  return `<style>${css}</style>`
}, '404')

hexo.extend.injector.register('head_end', () => {
  const css = compileScss({ file: path.join(__dirname, '../source/_scss/layout/page.scss') })
  return `<style>${css}</style>`
}, 'page')

hexo.extend.injector.register('head_end', () => {
  const css = compileScss({ file: path.join(__dirname, '../source/_scss/layout/post.scss') })
  return `<style>${css}</style>`
}, 'post')

hexo.extend.injector.register('head_end', () => {
  const css = compileScss({ file: path.join(__dirname, '../source/_scss/layout/categories.scss') })
  return `<style>${css}</style>`
}, 'categories')

hexo.extend.injector.register('head_end', () => {
  const css = compileScss({ file: path.join(__dirname, '../source/_scss/layout/about.scss') })
  return `<style>${css}</style>`
}, 'about')


hexo.extend.injector.register('body_end', () => {
  const rawCode = fs.readFileSync(path.join(__dirname, '../source/js', '_post.js'), 'utf8')
  const { code } = babel.transformSync(rawCode)
  return `<script>${code}</script>`
}, 'post')
