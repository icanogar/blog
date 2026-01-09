---
layout: page
title: "Histórico"
permalink: /meses/
main_nav: true
---

{% comment %} 1. Agrupamos todos los posts por anio y mes (formato '2026-01') {% endcomment %}
{% assign posts_por_mes = site.posts | group_by_exp: "post", "post.date | date: '%Y-%m'" %}

{% comment %} 2. Iteramos sobre cada grupo (mes) {% endcomment %}
{% for mes in posts_por_mes %}
  {% comment %} 2.1 Extraemos el anio y el mes del nombre del grupo (ej: "2026-01") {% endcomment %}
  {% assign nombre_mes_agrupado = mes.name %}
  {% assign partes_fecha = nombre_mes_agrupado | split: "-" %}
  {% assign anio = partes_fecha[0] %}
  {% assign mes_numero = partes_fecha[1] %}

  {% comment %} 2.2 Creamos un objeto fecha temporal solo para formatear el nombre del mes en espanol {% endcomment %}
  {% capture fecha_para_formatear %}{{ anio }}-{{ mes_numero }}-01{% endcapture %}
  {% assign fecha_objeto = fecha_para_formatear | date: "%s" | date: "%Y-%m-%d" %}
  {% assign nombre_mes_ingles = fecha_objeto | date: "%B" %}

  {% comment %} 2.3 Traducimos el nombre del mes al espanol {% endcomment %}

  {% include traducir-mes.html mes=nombre_mes_ingles %}

  {% comment %} 3. Creamos el encabezado para el mes {% endcomment %}
  <h2 id="{{ anio }}-{{ mes_numero }}">{{ nombre_mes_espanol }} de {{ anio }}</h2>

{% comment %} 4. Listamos los posts de ese mes {% endcomment %}
<ul class="posts-list">
{% for post in mes.items %}
  <li>
    <strong>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </strong>
    <span class="post-date">- {{ post.date | date: "%-d" }} de {{ nombre_mes_espanol | downcase }}</span>
    {% comment %} Nueva linea: Añadimos la(s) categoría(s) como enlace(s) {% endcomment %}
    {% if post.categories.size > 0 %}
      <span class="post-categories">
        {% comment %} Para cada categoría en el post... {% endcomment %}
        {% for categoria in post.categories %}
          {% comment %} Creamos el enlace a la pagina de esa categoria {% endcomment %}
          {% capture categoria_url %}/category/{{ categoria | slugify }}/{% endcapture %}
          - en <a href="{{ categoria_url | relative_url }}" class="categoria-link">{{ categoria }}</a>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
      </span>
    {% endif %}
  </li>
{% endfor %}
</ul>

  {% comment %} 5. Aniadimos una linea separadora entre meses {% endcomment %}
  {% if forloop.last == false %}<hr>{% endif %}
{% endfor %}
<br>