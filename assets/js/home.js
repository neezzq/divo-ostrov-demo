/* ============================================================
   Главная — колесо обозрения с каталогом аттракционов.
   Кабинки вращаются по кругу, оставаясь вертикальными,
   и ведут на страницу аттракциона.
   ============================================================ */
(function () {
  const rotor = document.getElementById("rotor");
  if (!rotor || !window.DIVO) return;

  const items = DIVO.attractions;
  const n = items.length;
  const step = 360 / n;

  // спицы
  const spokes = Array.from({ length: n }, (_, i) =>
    `<span class="spoke" style="transform:rotate(${i * step}deg)"></span>`
  ).join("");

  // кабинки
  const cabins = items
    .map((a, i) => {
      const angle = i * step;
      return `
      <div class="arm" style="--a:${angle}deg">
        <div class="orient">
          <a class="cabin cat-${a.category}" href="${DIVO.url(a)}" aria-label="${a.name}">
            <span class="cabin__no">${DIVO.index(a)}</span>
            <span class="cabin__name">${a.name}</span>
          </a>
        </div>
      </div>`;
    })
    .join("");

  rotor.innerHTML = `<span class="rim"></span>${spokes}${cabins}`;

  // синхронная длительность для встречного вращения
  const SPIN = 60; // секунд на оборот
  rotor.style.setProperty("--spin", SPIN + "s");

  // подсветка кабинки = название в центре
  const hubName = document.getElementById("hubName");
  rotor.querySelectorAll(".cabin").forEach((c) => {
    c.addEventListener("mouseenter", () => {
      if (hubName) hubName.textContent = c.querySelector(".cabin__name").textContent;
    });
    c.addEventListener("mouseleave", () => {
      if (hubName) hubName.textContent = "Выберите кабинку";
    });
  });
})();
