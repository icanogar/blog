---
layout: page
title: "Categórico"
permalink: /posts/
main_nav: true
---

{% for category in site.categories %}
  {% capture cat %}{{ category | first }}{% endcapture %}
  <h2 id="{{cat}}">{{ cat }}</h2>
  {% for desc in site.descriptions %}
    {% if desc.cat == cat %}
      <p class="desc"><em>{{ desc.desc }}</em></p>
    {% endif %}
  {% endfor %}
  <ul class="posts-list">
  {% for post in site.categories[cat] %}
    <li>
      <strong>
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </strong>
      {% comment %} --- NUEVO: Traduccion de la fecha --- {% endcomment %}
      {% assign nombre_mes_ingles = post.date | date: "%B" %}
      {% comment %} Traducimos el nombre del mes al espanol {% endcomment %}
      {% include traducir-mes.html mes=nombre_mes_ingles %}
      <span class="post-date">- {{ post.date | date: "%-d" }} de {{ nombre_mes_espanol }} de {{ post.date | date: "%Y" }}</span>
      {% comment %} --- FIN del bloque nuevo --- {% endcomment %}
    </li>
  {% endfor %}
  </ul>
  {% if forloop.last == false %}<hr>{% endif %}
{% endfor %}
<br>