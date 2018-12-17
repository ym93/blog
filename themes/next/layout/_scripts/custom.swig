{# WeChat & App page title #}
<script type="text/javascript">
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('MicroMessenger') > 0 || ua.indexOf('YimingBlog') > 0) && document.title.indexOf(" | ") > 0) {
    document.title = document.title.substring(0, document.title.lastIndexOf(" | "));
  }
</script>
