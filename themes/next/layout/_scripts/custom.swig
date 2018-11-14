{# Set WeChat share title. #}
<script type="text/javascript">
  if (window.navigator.userAgent.indexOf('MicroMessenger') >= 0 && document.title.indexOf(" | ") > 0) {
    document.title = document.title.substring(0, document.title.lastIndexOf(" | "));
  }
</script>
