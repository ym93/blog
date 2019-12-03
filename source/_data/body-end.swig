{# 使用微信或 YimingBlog App 浏览文章时移除标题中的网站名称 #}
<script type="text/javascript">
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('MicroMessenger') > 0 || ua.indexOf('YimingBlog') > 0) && document.title.indexOf(" | ") > 0) {
    document.title = document.title.substring(0, document.title.lastIndexOf(" | "));
  }
</script>
