<div class="ad">
  <a target="_blank" href="https://s.click.taobao.com/t?e=m%3D2%26s%3DCFebbz%2FHVrUcQipKwQzePCperVdZeJviEViQ0P1Vf2kguMN8XjClAgj%2BK3bu6D7xDx8CHme7ZTJfY5bsyYcvX6OlNJG%2B4TYGc7fM9LAhISuyp8ZArdvSkBmIkXBqRClNTcEU%2BDykfuSM%2BhtH71aX6uIOTs4KMj3yjpOyWSRdiSZDEm2YKA6YIrbIzrZDfgWtwGXLU4WXsy8CZuZoOOkzXFxfvOyje0ynomfkDJRs%2BhU%3D">
    <img src="/images/aliyun.jpg">
  </a>
</div>

<div class="copyright" >
  {% set current = date(Date.now(), "YYYY") %}
  &copy; {% if theme.since and theme.since != current %} {{ theme.since }} - {% endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <!--<span class="with-love">
    <i class="fa fa-{{ theme.authoricon }}"></i>
  </span>-->
  <span class="author" itemprop="copyrightHolder">{{ config.author }}</span>
</div>

{% if theme.copyright %}
<div class="powered-by">
  {{ __('footer.powered', '<a class="theme-link" href="https://hexo.io">Hexo</a>') }}
</div>

<div class="theme-info">
  {{ __('footer.theme') }} -
  <a class="theme-link" href="https://github.com/iissnan/hexo-theme-next">
    NexT.{{ theme.scheme }}
  </a>
</div>

<p>
  <a href="http://www.miitbeian.gov.cn/">闽ICP备14013901号</a>
</p>

{% endif %}
