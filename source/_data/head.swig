{# 使用 YimingBlog App 浏览时在根节点添加类名
<script type="text/javascript">
  if (window.navigator.userAgent.indexOf('YimingBlog') > 0) {
    var element = document.getElementsByTagName('html')[0];
    var array = element.className.split(' ');
    array.push('in-app');
    element.className = array.join(' ');
  }
</script>
#}