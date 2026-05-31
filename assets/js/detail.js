/* ============================================================
   Страница аттракциона (attraction.html?a=slug).
   Данные берутся из window.DIVO по slug.
   ============================================================ */
(function () {
  const root = document.getElementById("detail");
  if (!root || !window.DIVO) return;

  const slug = new URLSearchParams(location.search).get("a");
  const a = DIVO.bySlug(slug);

  if (!a) {
    document.title = "Аттракцион не найден · Диво Остров";
    root.innerHTML = `
      <section class="section container">
        <p class="label">[ 404 ]</p>
        <h1 class="display">Аттракцион<br>не найден</h1>
        <p class="lead">Возможно, ссылка устарела. Вернитесь в каталог и выберите аттракцион.</p>
        <p style="margin-top:32px"><a class="link" href="attractions.html">Все аттракционы <i>→</i></a></p>
      </section>`;
    return;
  }

  document.title = `${a.name} · Диво Остров`;
  const idx = DIVO.attractions.indexOf(a);
  const prev = DIVO.attractions[(idx - 1 + DIVO.attractions.length) % DIVO.attractions.length];
  const next = DIVO.attractions[(idx + 1) % DIVO.attractions.length];
  const cat = DIVO.cats[a.category];

  const meter = Array.from({ length: 5 }, (_, i) => `<i${i < a.intensity ? "" : ' class="off"'}></i>`).join("");
  const specs = Object.entries({
    Категория: cat.label,
    Интенсивность: `${a.intensity} / 5`,
    ...labelSpecs(a.specs),
  });

  function labelSpecs(s) {
    const map = { height: "Высота", speed: "Скорость", age: "Допуск", riders: "Вместимость", duration: "Длительность" };
    const out = {};
    Object.keys(map).forEach((k) => { if (s[k]) out[map[k]] = s[k]; });
    return out;
  }

  root.innerHTML = `
    <section class="detail-hero cat-${a.category}">
      <div class="container">
        <nav class="crumbs reveal"><a href="attractions.html">Аттракционы</a><span>/</span><b>${cat.label}</b></nav>
        <p class="label reveal">[ ${DIVO.index(a)} · ${cat.label} ]</p>
        <h1 class="display reveal">${a.name}</h1>
        <p class="detail-hero__tagline reveal">${a.tagline}</p>
        <div class="detail-meter reveal" title="Интенсивность ${a.intensity}/5"><span>Интенсивность</span><span class="meter meter--lg">${meter}</span></div>
      </div>
    </section>

    <section class="section detail-body">
      <div class="container detail-grid">
        <div class="detail-about">
          ${a.about.map((p, i) => `<p class="reveal" data-delay="${i * 80}">${p}</p>`).join("")}
          <ul class="highlights reveal">
            ${a.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>
        </div>
        <aside class="detail-specs reveal">
          <h2 class="detail-specs__title">Характеристики</h2>
          <dl>
            ${specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
          </dl>
          <a class="btn btn--solid" href="visit.html">Спланировать визит <i>→</i></a>
        </aside>
      </div>
    </section>

    <nav class="section pager">
      <div class="container pager__inner">
        <a class="pager__item pager__item--prev reveal" href="${DIVO.url(prev)}">
          <span class="pager__dir">← Предыдущий</span>
          <span class="pager__name">${prev.name}</span>
        </a>
        <a class="pager__item pager__item--next reveal" href="${DIVO.url(next)}">
          <span class="pager__dir">Следующий →</span>
          <span class="pager__name">${next.name}</span>
        </a>
      </div>
    </nav>`;

  if (window.__observeReveals) window.__observeReveals(root);
})();
