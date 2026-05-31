// ===== Данные об аттракционах =====
const ATTRACTIONS = [
  { name: "Катапульта", cat: "extreme", lvl: 5, h: "80 м", desc: "Молниеносный взлёт на 80 метров за 4 секунды, свободное падение и вращение — самый острый адреналин парка." },
  { name: "Бустер", cat: "extreme", lvl: 5, h: "50 м", desc: "Легендарный и, пожалуй, самый страшный аттракцион острова: эмоции на высоте 50 метров над землёй." },
  { name: "Ракета", cat: "extreme", lvl: 5, h: "—", desc: "Стремительные виражи и перегрузки, от которых захватывает дух. Для настоящих любителей скорости." },
  { name: "Американские горки", cat: "extreme", lvl: 4, h: "—", desc: "Классика больших парков: крутые подъёмы, петли и спуски на огромной скорости." },
  { name: "Крылатые качели", cat: "extreme", lvl: 4, h: "25 м", desc: "Взрослые качели поднимают на 25 метров и плавно раскачивают из стороны в сторону. Рост от 130 см." },
  { name: "Башня свободного падения", cat: "extreme", lvl: 4, h: "—", desc: "Плавный подъём вверх и захватывающий спуск с настоящей невесомостью." },

  { name: "Колесо обозрения", cat: "family", lvl: 1, h: "—", desc: "Панорама Крестовского острова, заливов и парка с высоты птичьего полёта." },
  { name: "Автодром", cat: "family", lvl: 2, h: "—", desc: "Весёлые гонки на электромобилях с лёгкими столкновениями. Азарт для всей компании." },
  { name: "Катамараны", cat: "family", lvl: 1, h: "—", desc: "Неспешная прогулка по водной глади парка среди зелени и каналов острова." },
  { name: "Сказочный поезд", cat: "family", lvl: 1, h: "—", desc: "Уютное путешествие по парку для больших и маленьких — знакомство с островом." },

  { name: "Детские карусели", cat: "kids", lvl: 1, h: "3+", desc: "Яркие лошадки и сказочные персонажи кружатся под весёлую музыку. Классика для малышей." },
  { name: "Детский картинг", cat: "kids", lvl: 2, h: "5+", desc: "Первые гонки юного водителя на безопасной трассе. Настоящие эмоции скорости." },
  { name: "Батутный городок", cat: "kids", lvl: 2, h: "3+", desc: "Надувные батуты и лабиринты, где энергия детей находит выход." },
  { name: "Паровозик с горкой", cat: "kids", lvl: 2, h: "3+", desc: "Маленькие американские горки для самых юных гостей — первый безопасный экстрим." },
  { name: "Чашки", cat: "kids", lvl: 2, h: "3+", desc: "Кружащиеся чашки, скорость вращения которых вы задаёте сами." }
];

const CAT_LABEL = { extreme: "Экстрим", family: "Семейный", kids: "Детский" };

const meter = (lvl) =>
  Array.from({ length: 5 }, (_, i) => `<span${i < lvl ? "" : ' class="off"'}>●</span>`).join("");

// ===== Рендер строк =====
const ridesEl = document.getElementById("rides");

function render(filter = "all") {
  const list = filter === "all" ? ATTRACTIONS : ATTRACTIONS.filter((a) => a.cat === filter);
  ridesEl.innerHTML = list
    .map(
      (a, i) => `
    <div class="ride" data-cat="${a.cat}" style="animation-delay:${i * 0.04}s">
      <span class="ride__num">${String(i + 1).padStart(2, "0")}</span>
      <div class="ride__body">
        <div class="ride__name">${a.name}</div>
        <div class="ride__desc">${a.desc}</div>
      </div>
      <div class="ride__specs">
        <span class="ride__cat">${CAT_LABEL[a.cat]}</span>
        <span class="ride__meter" title="Интенсивность ${a.lvl}/5">${meter(a.lvl)}</span>
        <span class="ride__h">${a.h}</span>
      </div>
    </div>`
    )
    .join("");
}
render();

// ===== Табы фильтрации =====
const tabs = document.getElementById("tabs");
tabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
  btn.classList.add("is-active");
  render(btn.dataset.filter);
});

// ===== Шапка: фон при скролле =====
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Бургер-меню =====
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }
});

// ===== Reveal при появлении =====
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ===== Год в футере =====
document.getElementById("year").textContent = new Date().getFullYear();
