/* ============================================================
   Nexora — Lógica del sitio
   (no necesitas editar este archivo; usa config.js)
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.CONFIG || {};
  var DICT = window.I18N || {};
  var lang = localStorage.getItem("nexora_lang") || "es";

  function t(key) {
    var d = DICT[lang] || {};
    return (key in d) ? d[key] : ((DICT.es && DICT.es[key]) || key);
  }

  /* ---------- Aplicar configuración (datos de la empresa) ---------- */
  function applyConfig() {
    document.title = (CFG.brand || "Nexora") + " · Consultoría de Software";
    // Nombre de marca en logo/header/footer
    document.querySelectorAll(".brand span:last-child").forEach(function (el) {
      el.textContent = CFG.brand || "Nexora";
    });
    document.querySelectorAll(".brand .logo").forEach(function (el) {
      el.textContent = (CFG.brand || "N").trim().charAt(0).toUpperCase();
    });
    setText("waDisplay", CFG.whatsappDisplay || CFG.phone);
    setText("emailDisplay", CFG.email);
    setText("phoneDisplay", CFG.phone);
    setText("locDisplay", CFG.location);
    setText("emailFoot", CFG.email);
    setText("phoneFoot", CFG.phone);
    setText("year", CFG.year || new Date().getFullYear());

    // Footer brand label is set above via querySelectorAll; bottom bar:
    var fb = document.querySelector(".footer-bottom");
    if (fb) fb.firstChild.nodeValue = "© ";

    // Enlaces de redes
    linkHref('a[aria-label="LinkedIn"]', CFG.linkedin);
    linkHref('a[aria-label="Instagram"]', CFG.instagram);
    linkHref('a[aria-label="Facebook"]', CFG.facebook);

    // Email / teléfono como enlaces
    var em = document.getElementById("emailMethod");
    if (em) em.href = "mailto:" + (CFG.email || "");
    var ph = document.getElementById("phoneMethod");
    if (ph) ph.href = "tel:" + (CFG.phoneDial || CFG.phone || "").replace(/\s/g, "");
  }
  function setText(id, val) { var el = document.getElementById(id); if (el && val != null) el.textContent = val; }
  function linkHref(sel, href) { var el = document.querySelector(sel); if (el) el.href = href || "#"; }

  /* ---------- WhatsApp helpers ---------- */
  function waLink(message) {
    var num = (CFG.whatsapp || "").replace(/[^\d]/g, "");
    var base = "https://wa.me/" + num;
    return message ? base + "?text=" + encodeURIComponent(message) : base;
  }
  function bindWhatsApp() {
    var greeting = lang === "es"
      ? "Hola " + (CFG.brand || "") + ", me gustaría más información sobre sus servicios."
      : "Hi " + (CFG.brand || "") + ", I'd like more information about your services.";
    document.querySelectorAll("[data-wa-cta]").forEach(function (a) {
      a.setAttribute("href", waLink(greeting));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }

  /* ---------- i18n ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-ph]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-ph")));
    });
    var ll = document.getElementById("langLabel");
    if (ll) ll.textContent = lang === "es" ? "EN" : "ES";
    bindWhatsApp();
  }
  function toggleLang() {
    lang = lang === "es" ? "en" : "es";
    localStorage.setItem("nexora_lang", lang);
    applyLang();
  }

  /* ---------- Header scroll + mobile menu ---------- */
  function initHeader() {
    var header = document.getElementById("header");
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });

    var btn = document.getElementById("menuBtn");
    var menu = document.getElementById("mobileMenu");
    var iOpen = document.getElementById("menuIconOpen");
    var iClose = document.getElementById("menuIconClose");
    function setMenu(open) {
      menu.classList.toggle("open", open);
      iOpen.hidden = open; iClose.hidden = !open;
    }
    btn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* ---------- Scroll reveal + counters (scroll-position based, robust) ---------- */
  var revealEls = [], counterEls = [];
  function inView(el, ratio) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.height === 0 && r.width === 0) return false;
    var need = (ratio || 0) * Math.min(r.height, vh);
    return r.top < vh - need && r.bottom > need;
  }
  function runCounter(el) {
    if (el.__done) return; el.__done = true;
    var to = parseInt(el.getAttribute("data-to"), 10) || 0;
    var suf = el.getAttribute("data-suffix") || "";
    var start = performance.now(), dur = 1600;
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(to * (1 - Math.pow(1 - p, 4))) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function checkReveal() {
    revealEls = revealEls.filter(function (el) {
      if (inView(el, 0.05)) { el.classList.add("in"); return false; }
      return true;
    });
    counterEls = counterEls.filter(function (el) {
      if (inView(el, 0.2)) { runCounter(el); return false; }
      return true;
    });
  }
  function initReveal() {
    revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    counterEls = Array.prototype.slice.call(document.querySelectorAll(".counter"));
    var onScroll = function () { window.requestAnimationFrame(checkReveal); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    checkReveal();
    // Safety net: force-show everything shortly after load, transition-free,
    // so content can never stay hidden (e.g. paused transitions / no rAF).
    setTimeout(checkReveal, 150);
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (e) {
        e.style.transition = "none";
        e.classList.add("in");
      });
      counterEls.forEach(runCounter);
      revealEls = []; counterEls = [];
    }, 1400);
  }

  /* ---------- Quote builder ---------- */
  var quote = { services: [], size: "", time: "" };
  function initQuote() {
    var root = document.getElementById("quote");
    if (!root) return;
    var steps = root.querySelectorAll(".qstep");
    var segs = root.querySelectorAll("#qprogress .seg");
    var order = ["1", "2", "3", "4"];
    var cur = 0;

    function show(idx) {
      cur = idx;
      var key = idx === -1 ? "done" : order[idx];
      steps.forEach(function (s) { s.classList.toggle("active", s.getAttribute("data-step") === key); });
      segs.forEach(function (s, i) { s.classList.toggle("done", idx === -1 ? true : i <= idx); });
    }

    // Multi-select (services)
    root.querySelectorAll("[data-multi] .qopt").forEach(function (opt) {
      opt.addEventListener("click", function () {
        opt.classList.toggle("sel");
        var v = opt.getAttribute("data-val");
        var i = quote.services.indexOf(v);
        if (opt.classList.contains("sel")) { if (i < 0) quote.services.push(v); }
        else if (i >= 0) quote.services.splice(i, 1);
      });
    });
    // Single-select (size, time)
    root.querySelectorAll("[data-single]").forEach(function (group) {
      group.querySelectorAll(".qopt").forEach(function (opt) {
        opt.addEventListener("click", function () {
          group.querySelectorAll(".qopt").forEach(function (o) { o.classList.remove("sel"); });
          opt.classList.add("sel");
          var stepEl = group.closest(".qstep");
          var v = opt.getAttribute("data-val");
          if (stepEl.getAttribute("data-step") === "2") quote.size = v;
          else quote.time = v;
        });
      });
    });

    root.querySelectorAll("[data-next]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (cur === 0 && quote.services.length === 0) { alert(t("q.selectFirst")); return; }
        if (cur < order.length - 1) show(cur + 1);
      });
    });
    root.querySelectorAll("[data-back]").forEach(function (b) {
      b.addEventListener("click", function () { if (cur > 0) show(cur - 1); });
    });

    document.getElementById("qSend").addEventListener("click", function () {
      var name = val("qName"), company = val("qCompany"), email = val("qEmail"),
          phone = val("qPhone"), details = val("qDetails");
      var svc = quote.services.map(function (k) { return t(k); }).join(", ") || "—";
      var L = lang;
      var lines = [];
      if (L === "es") {
        lines.push("Hola " + (CFG.brand || "") + ", quiero una cotización 👋");
        lines.push("");
        lines.push("• Servicios: " + svc);
        lines.push("• Tamaño: " + (quote.size ? t(quote.size) : "—"));
        lines.push("• Plazo: " + (quote.time ? t(quote.time) : "—"));
        lines.push("• Nombre: " + (name || "—"));
        if (company) lines.push("• Empresa: " + company);
        if (email) lines.push("• Correo: " + email);
        if (phone) lines.push("• Teléfono: " + phone);
        if (details) lines.push("• Detalles: " + details);
      } else {
        lines.push("Hi " + (CFG.brand || "") + ", I'd like a quote 👋");
        lines.push("");
        lines.push("• Services: " + svc);
        lines.push("• Size: " + (quote.size ? t(quote.size) : "—"));
        lines.push("• Timeline: " + (quote.time ? t(quote.time) : "—"));
        lines.push("• Name: " + (name || "—"));
        if (company) lines.push("• Company: " + company);
        if (email) lines.push("• Email: " + email);
        if (phone) lines.push("• Phone: " + phone);
        if (details) lines.push("• Details: " + details);
      }
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
      show(-1);
    });

    document.getElementById("qReset").addEventListener("click", function () {
      quote = { services: [], size: "", time: "" };
      root.querySelectorAll(".qopt.sel").forEach(function (o) { o.classList.remove("sel"); });
      ["qName", "qCompany", "qEmail", "qPhone", "qDetails"].forEach(function (id) {
        var el = document.getElementById(id); if (el) el.value = "";
      });
      show(0);
    });

    show(0);
  }
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = val("cName"), email = val("cEmail"), company = val("cCompany"),
          phone = val("cPhone"), msg = val("cMessage");
      var lines = [];
      if (lang === "es") {
        lines.push("Hola " + (CFG.brand || "") + " 👋");
        lines.push("");
        lines.push("• Nombre: " + (name || "—"));
        if (company) lines.push("• Empresa: " + company);
        if (email) lines.push("• Correo: " + email);
        if (phone) lines.push("• Teléfono: " + phone);
        lines.push("• Mensaje: " + (msg || "—"));
      } else {
        lines.push("Hi " + (CFG.brand || "") + " 👋");
        lines.push("");
        lines.push("• Name: " + (name || "—"));
        if (company) lines.push("• Company: " + company);
        if (email) lines.push("• Email: " + email);
        if (phone) lines.push("• Phone: " + phone);
        lines.push("• Message: " + (msg || "—"));
      }
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
      document.getElementById("cfForm").style.display = "none";
      document.getElementById("cfSuccess").classList.add("show");
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    applyLang();
    document.getElementById("langToggle").addEventListener("click", toggleLang);
    initHeader();
    initReveal();
    initQuote();
    initContactForm();
  });
})();
