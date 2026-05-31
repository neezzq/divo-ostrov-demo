/* ============================================================
   Общий каркас сайта: шапка, подвал, переходы, анимации.
   Подключается на каждой странице. Активный пункт меню берётся
   из <body data-page="...">.
   ============================================================ */
(function () {
  const page = document.body.dataset.page || "";

  const NAV = [
    { href: "index.html", label: "Главная", key: "home" },
    { href: "attractions.html", label: "Аттракционы", key: "catalog" },
    { href: "visit.html", label: "Посещение", key: "visit" },
  ];

  // ---------- Шапка ----------
  const headerHTML = `
    <header class="nav" id="nav">
      <div class="container nav__inner">
        <a href="index.html" class="brand" aria-label="Диво Остров — на главную">
          <span class="brand__mark">Д</span>
          <span class="brand__name">Диво&nbsp;Остров</span>
        </a>
        <nav class="nav__links" id="navLinks" aria-label="Навигация">
          ${NAV.map((n) => `<a href="${n.href}"${n.key === page ? ' class="is-active"' : ""}>${n.label}</a>`).join("")}
        </nav>
        <a href="visit.html" class="nav__cta">Как добраться<i>→</i></a>
        <button class="burger" id="burger" aria-label="Меню" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </header>`;

  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__cta">
          <h2 class="footer__big">До встречи<br>на острове</h2>
          <a href="attractions.html" class="link link--light">Выбрать аттракцион <i>→</i></a>
        </div>
        <div class="footer__grid">
          <div class="footer__brand">
            <span class="brand__mark">Д</span>
            <p>Крупнейший парк аттракционов Санкт-Петербурга на Крестовском острове.</p>
          </div>
          <nav class="footer__col" aria-label="Разделы">
            <h4>Разделы</h4>
            <a href="index.html">Главная</a>
            <a href="attractions.html">Аттракционы</a>
            <a href="visit.html">Посещение</a>
          </nav>
          <div class="footer__col">
            <h4>Контакты</h4>
            <p>Кемская ул., 1, Санкт-Петербург</p>
            <p>Ежедневно 11:00 – 22:00</p>
            <a href="https://divo-ostrov.ru" target="_blank" rel="noopener">divo-ostrov.ru</a>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© <span id="year"></span> Диво Остров</span>
          <span>Демо-сайт парка аттракционов</span>
        </div>
      </div>
    </footer>`;

  const headSlot = document.querySelector("[data-site-header]");
  const footSlot = document.querySelector("[data-site-footer]");
  if (headSlot) headSlot.outerHTML = headerHTML;
  if (footSlot) footSlot.outerHTML = footerHTML;

  // ---------- Переход между страницами (плавное затемнение) ----------
  const veil = document.createElement("div");
  veil.className = "veil";
  document.body.appendChild(veil);
  requestAnimationFrame(() => document.body.classList.add("is-ready"));

  const sameSite = (a) =>
    a &&
    a.href &&
    a.origin === location.origin &&
    !a.target &&
    !a.hasAttribute("download") &&
    !a.getAttribute("href").startsWith("#") &&
    !a.getAttribute("href").startsWith("mailto:");

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!sameSite(a)) return;
    const url = new URL(a.href);
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => (location.href = a.href), 480);
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.body.classList.remove("is-leaving");
  });

  // ---------- Шапка: фон при скролле ----------
  const nav = document.getElementById("nav");
  const onScroll = () => nav && nav.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- Бургер ----------
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open);
      document.body.classList.toggle("no-scroll", open);
    });
  }

  // ---------- Reveal с задержкой-каскадом ----------
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  const observeReveals = (root = document) =>
    root.querySelectorAll(".reveal:not(.is-in)").forEach((el, i) => {
      if (!el.style.transitionDelay) el.style.transitionDelay = (el.dataset.delay || i % 6 * 70) + "ms";
      io.observe(el);
    });
  window.__observeReveals = observeReveals;
  observeReveals();

  // ---------- Год ----------
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ---------- Премиальный курсор (только мышь) ----------
  if (matchMedia("(pointer:fine)").matches) {
    document.body.classList.add("has-cursor");
    const dot = document.createElement("div");
    dot.className = "cursor";
    document.body.appendChild(dot);
    let x = innerWidth / 2, y2 = innerHeight / 2, tx = x, ty = y2;
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const loop = () => {
      x += (tx - x) * 0.18; y2 += (ty - y2) * 0.18;
      dot.style.transform = `translate(${x}px, ${y2}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", (e) => {
      dot.classList.toggle("is-active", !!e.target.closest("a, button, .cabin"));
    });
  }
})();
