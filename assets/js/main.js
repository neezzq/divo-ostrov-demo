// ===== Данные об аттракционах =====
const ATTRACTIONS = [
  {
    name: "Катапульта",
    cat: "extreme",
    emoji: "🚀",
    desc: "Молниеносный взлёт на 80 метров за 4 секунды, свободное падение и вращение. Самый острый адреналин парка.",
    meta: ["80 м", "4 сек"],
    grad: "linear-gradient(150deg,#ff2e4d,#b3001f)"
  },
  {
    name: "Бустер",
    cat: "extreme",
    emoji: "🎢",
    desc: "Легендарный аттракцион и, пожалуй, самый страшный на острове: эмоции на высоте 50 метров над землёй.",
    meta: ["50 м", "18+"],
    grad: "linear-gradient(150deg,#e4002b,#7a0016)"
  },
  {
    name: "Ракета",
    cat: "extreme",
    emoji: "☄️",
    desc: "Стремительные виражи и перегрузки, от которых захватывает дух. Для настоящих любителей скорости.",
    meta: ["Скорость", "16+"],
    grad: "linear-gradient(150deg,#ff5640,#c20024)"
  },
  {
    name: "Американские горки",
    cat: "extreme",
    emoji: "🎟",
    desc: "Классика больших парков: крутые подъёмы, петли и спуски на огромной скорости.",
    meta: ["Петли", "Хит"],
    grad: "linear-gradient(150deg,#ff3355,#a30020)"
  },
  {
    name: "Крылатые качели",
    cat: "extreme",
    emoji: "🪂",
    desc: "Взрослые качели поднимают на высоту 25 метров и плавно раскачивают из стороны в сторону. Рост от 130 см.",
    meta: ["25 м", "130 см+"],
    grad: "linear-gradient(150deg,#ff6a3d,#d10030)"
  },
  {
    name: "Колесо обозрения",
    cat: "family",
    emoji: "🎡",
    desc: "Панорама Крестовского острова, заливов и парка с высоты птичьего полёта. Романтика для всех возрастов.",
    meta: ["Панорама", "Для всех"],
    grad: "linear-gradient(150deg,#ff4d6d,#c2002b)"
  },
  {
    name: "Автодром",
    cat: "family",
    emoji: "🚗",
    desc: "Весёлые гонки на электромобилях с лёгкими столкновениями. Зарядитесь азартом всей компанией.",
    meta: ["Гонки", "Компания"],
    grad: "linear-gradient(150deg,#ff7a45,#e10030)"
  },
  {
    name: "Катамараны",
    cat: "family",
    emoji: "🦢",
    desc: "Неспешная прогулка по водной глади парка. Спокойный отдых среди зелени и каналов острова.",
    meta: ["Вода", "Отдых"],
    grad: "linear-gradient(150deg,#ff5a8a,#c30033)"
  },
  {
    name: "Башня свободного падения",
    cat: "family",
    emoji: "🗼",
    desc: "Плавный подъём вверх и захватывающий спуск. Лёгкий экстрим, доступный почти всей семье.",
    meta: ["Высота", "Семья"],
    grad: "linear-gradient(150deg,#ff3d5e,#9e001c)"
  },
  {
    name: "Сказочный поезд",
    cat: "family",
    emoji: "🚂",
    desc: "Уютное путешествие по парку для больших и маленьких. Идеальный старт знакомства с островом.",
    meta: ["Прогулка", "Для всех"],
    grad: "linear-gradient(150deg,#ff6f61,#d8002f)"
  },
  {
    name: "Детские карусели",
    cat: "kids",
    emoji: "🎠",
    desc: "Яркие лошадки, машинки и сказочные персонажи кружатся под весёлую музыку. Любимая классика малышей.",
    meta: ["3+", "Малыши"],
    grad: "linear-gradient(150deg,#ff7ea3,#e23a5e)"
  },
  {
    name: "Детский картинг",
    cat: "kids",
    emoji: "🏎️",
    desc: "Первые гонки юного водителя на безопасной трассе. Море восторга и настоящие эмоции скорости.",
    meta: ["Трасса", "5+"],
    grad: "linear-gradient(150deg,#ff8a5b,#e4002b)"
  },
  {
    name: "Батутный городок",
    cat: "kids",
    emoji: "🤸",
    desc: "Прыгай сколько хочешь! Надувные батуты и лабиринты, где энергия детей находит выход.",
    meta: ["Прыжки", "Городок"],
    grad: "linear-gradient(150deg,#ff6b8b,#d4002c)"
  },
  {
    name: "Паровозик с горкой",
    cat: "kids",
    emoji: "🐛",
    desc: "Маленькие американские горки для самых юных гостей — первый безопасный экстрим в их жизни.",
    meta: ["Мини-горки", "3+"],
    grad: "linear-gradient(150deg,#ff9a8b,#e2335a)"
  },
  {
    name: "Чашки",
    cat: "kids",
    emoji: "🫖",
    desc: "Кружащиеся чашки, скорость которых вы задаёте сами. Весёлое головокружение для всей семьи.",
    meta: ["Вращение", "Семья"],
    grad: "linear-gradient(150deg,#ff7ab0,#e02b66)"
  }
];

const CAT_LABEL = { extreme: "Экстрим", family: "Семейный", kids: "Детский" };

// ===== Рендер карточек =====
const cardsEl = document.getElementById("cards");

function render(filter = "all") {
  const list = filter === "all" ? ATTRACTIONS : ATTRACTIONS.filter((a) => a.cat === filter);
  cardsEl.innerHTML = list
    .map(
      (a, i) => `
    <article class="card" style="--card-grad:${a.grad}; animation-delay:${i * 0.05}s">
      <span class="card__emoji">${a.emoji}</span>
      <span class="card__tag">${CAT_LABEL[a.cat]}</span>
      <h3>${a.name}</h3>
      <p>${a.desc}</p>
      <div class="card__meta">${a.meta.map((m) => `<span>• ${m}</span>`).join("")}</div>
    </article>`
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
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
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

// ===== Анимация счётчиков в hero =====
const counters = document.querySelectorAll(".hero__stats b[data-count]");
const animate = (el) => {
  const target = +el.dataset.count;
  const dur = 1400;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        animate(en.target);
        counterIO.unobserve(en.target);
      }
    });
  },
  { threshold: 0.5 }
);
counters.forEach((c) => counterIO.observe(c));

// ===== Год в футере =====
document.getElementById("year").textContent = new Date().getFullYear();
