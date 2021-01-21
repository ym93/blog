const CleanCSS = require('clean-css')
const sass = require('sass')

const compileScss = function ({ file, data, minify = true } = {}) {
  const buffer = sass.renderSync({ file, data }).css
  let css = buffer.toString()
  if (minify) {
    const { errors, styles } = new CleanCSS().minify(css)
    if (errors.length) throw errors[0]
    css = styles
  }
  return css
}
module.exports = {
  compileScss
}