const babel = require('@babel/core')
const { compileScss } = require('../utils')

// 编译样式
hexo.extend.renderer.register('scss', 'css', function(data, options){
  return compileScss({ file: data.path })
}, true)

// 编译脚本
hexo.extend.renderer.register('js', 'js', function(data, options){
  const { code } = babel.transformSync(data.text)
  return code
}, true)