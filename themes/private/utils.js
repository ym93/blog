const sass = require('sass')

const compileScss = function ({ file, data, minify = true } = {}) {
  return new Promise(resolve => {
    sass.render({ file, data }, (err, result) => {
      if (err) throw err
      resolve(result.css.toString())
    })
  })
}

module.exports = {
  compileScss
}