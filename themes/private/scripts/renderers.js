const { compileScss } = require('../utils')

hexo.extend.renderer.register('scss', 'css', function(data, options){
  return compileScss({ file: data.path })
}, true)
