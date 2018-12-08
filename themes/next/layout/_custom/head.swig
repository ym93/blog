{#
Custom head.
#}

{# Set class in app. #}
<script type="text/javascript">
  if (window.navigator.userAgent.indexOf('YimingBlog') >= 0) {
    var element = document.getElementsByTagName('html')[0]
    var array = element.className.split(' ');
    array.push('in-app');
    element.className = array.join(' ');
  }
</script>
