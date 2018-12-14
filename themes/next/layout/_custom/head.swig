{#
Custom head.
#}

{# HTML tag class name #}
<script type="text/javascript">
  if (window.navigator.userAgent.indexOf('YimingBlog')) {
    var element = document.getElementsByTagName('html')[0];
    var array = element.className.split(' ');
    array.push('in-app');
    element.className = array.join(' ');
  }
</script>
