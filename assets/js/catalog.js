/* ============================================================
   Каталог аттракционов (attractions.html) — сетка + фильтр.
   ============================================================ */
(function () {
  const grid = document.getElementById("grid");
  const tabs = document.getElementById("tabs");
  if (!grid || !window.DIVO) return;

  const meter = (lvl) =>
    Array.from({ length: 5 }, (_, i) => `<i${i < lvl ? "" : ' class="off"'}></i>`).join("");

  function card(a, i) {
    return `
    <a class="tile reveal cat-${a.category}" href="${DIVO.url(a)}" style="--i:${i}">
      <span class="tile__no">${DIVO.index(a)}</span>
      <span class="tile__cat">${DIVO.cats[a.category].label}</span>
      <h3 class="tile__name">${a.name}</h3>
      <p class="tile__short">${a.short}</p>
      <span class="tile__foot">
        <span class="meter" title="Интенсивность ${a.intensity}/5">${meter(a.intensity)}</span>
        <span class="tile__go">Подробнее <i>→</i></span>
      </span>
    </a>`;
  }

  function render(filter = "all") {
    const list = DIVO.byCategory(filter);
    grid.innerHTML = list.map(card).join("");
    if (window.__observeReveals) window.__observeReveals(grid);
  }

  const valid = ["extreme", "family", "kids"];
  const initial = valid.includes(location.hash.slice(1)) ? location.hash.slice(1) : "all";
  if (tabs) {
    tabs.querySelectorAll(".tab").forEach((t) => t.classList.toggle("is-active", t.dataset.filter === initial));
  }
  render(initial);

  if (tabs) {
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab");
      if (!btn) return;
      tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
      btn.classList.add("is-active");
      render(btn.dataset.filter);
    });
  }
})();
