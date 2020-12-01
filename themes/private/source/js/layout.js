function wrapTables() {
  var nodes = document.body.querySelectorAll('table');
  for (var i = 0; i < nodes.length; i++) {
    var table = nodes[i];
    var wrapEl = document.createElement('div');
    wrapEl.className = 'table-wrap';
    table.parentNode.replaceChild(wrapEl, table);
    wrapEl.appendChild(table)
  }
};

wrapTables();