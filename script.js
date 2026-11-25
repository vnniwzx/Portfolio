// Portfólio · Vinicius Furtado
(function () {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // tema claro / escuro
  document.getElementById("theme").addEventListener("click", function () {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
    document.querySelector('meta[name="theme-color"]').content = next === "dark" ? "#0F1012" : "#F4F2ED";
  });

  // texto digitado
  const words = ["produtos web", "sistemas", "sites", "soluções"];
  const el = document.getElementById("typed");
  if (!reduce) {
    let w = 0, i = words[0].length, deleting = true;
    setTimeout(function tick() {
      if (deleting) {
        i--;
        if (i <= 0) { deleting = false; w = (w + 1) % words.length; }
      } else {
        i++;
        if (i >= words[w].length) { deleting = true; el.textContent = words[w]; return setTimeout(tick, 1800); }
      }
      el.textContent = words[w].slice(0, Math.max(i, 0)) || "​";
      setTimeout(tick, deleting ? 45 : 90);
    }, 2200);
  }

  // revelar ao rolar
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (n, k) {
    n.style.transitionDelay = (k % 3) * 70 + "ms";
    io.observe(n);
  });
  document.querySelectorAll(".agenda li").forEach(function (li, k) { li.style.transitionDelay = 250 + k * 110 + "ms"; });

  // barra de progresso, nav e link ativo
  const bar = document.getElementById("progress");
  const nav = document.querySelector(".nav");
  const links = Array.from(document.querySelectorAll(".links a"));
  const sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
    nav.classList.toggle("scrolled", scrollY > 10);
    let current = -1;
    sections.forEach(function (s, k) { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) current = k; });
    links.forEach(function (a, k) { a.classList.toggle("active", k === current); });
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // brilho que segue o mouse nos cards de projeto
  document.querySelectorAll(".proj").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", e.clientX - r.left + "px");
      card.style.setProperty("--y", e.clientY - r.top + "px");
    });
  });

  // copiar e-mail
  const toast = document.getElementById("toast");
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(function () { toast.classList.remove("show"); }, 2000);
  }
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      const text = b.dataset.copy;
      const done = function () { showToast("E-mail copiado"); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { location.href = "mailto:" + text; });
      else location.href = "mailto:" + text;
    });
  });
})();
