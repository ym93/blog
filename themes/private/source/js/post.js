/** 添加表格样式  */
const applyTableStyle = function() {
  const nodes = document.body.querySelectorAll('table')
  for (let i = 0; i < nodes.length; i++) {
    const table = nodes[i]
    const wrapEl = document.createElement('div')
    wrapEl.className = 'table-wrap'
    table.parentNode.replaceChild(wrapEl, table)
    wrapEl.appendChild(table)
  }
};
applyTableStyle()