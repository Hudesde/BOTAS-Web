/* ===========================================================================
   BOTAS — sitio estático · lógica de cliente
   - Conmutación de pestañas (con soporte de #hash)
   - Menú móvil
   - Cuenta regresiva
   - Envío del formulario a Web3Forms (con fallback mailto)
   =========================================================================== */
(function () {
  "use strict";

  /* ---- CONFIGURACIÓN EDITABLE ------------------------------------------- */
  var LAUNCH_DATE = new Date("2026-08-15T00:00:00-06:00"); // 15 ago 2026, CST (Oaxaca)
  var CONTACT_EMAIL = "aatr010423@gmail.com";
  var WEB3FORMS_PLACEHOLDER = "TU_ACCESS_KEY_DE_WEB3FORMS";
  /* ----------------------------------------------------------------------- */

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ===== Pestañas ======================================================== */
  var tabs   = $$(".tab");
  var panels = $$(".panel");
  var topbar = $(".topbar");

  function activate(id, push) {
    if (!document.getElementById(id)) { id = "que-es"; }
    panels.forEach(function (p) { p.classList.toggle("is-active", p.id === id); });
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-tab") === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (push && history.replaceState) { history.replaceState(null, "", "#" + id); }
    if (topbar) { topbar.classList.remove("nav-open"); }
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  // Cualquier elemento con [data-tab] cambia de pestaña (pestañas, CTAs, marca)
  $$("[data-tab]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      activate(el.getAttribute("data-tab"), true);
    });
  });

  window.addEventListener("hashchange", function () {
    activate((location.hash || "#que-es").slice(1), false);
  });

  /* ===== Menú móvil ====================================================== */
  var toggle = $(".nav-toggle");
  if (toggle && topbar) {
    toggle.addEventListener("click", function () {
      var open = topbar.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ===== Cuenta regresiva =============================================== */
  var box      = $(".countdown-box");
  var dlBtn    = $("#download-btn");
  var dlNote   = $("#download-note");
  var targetTxt = $(".countdown__target");
  var fields   = { days: $('[data-cd="days"]'), hours: $('[data-cd="hours"]'),
                   mins: $('[data-cd="mins"]'), secs: $('[data-cd="secs"]') };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };

  function launchReady() {
    if (box) { box.classList.add("is-live"); }
    if (targetTxt) { targetTxt.innerHTML = "<strong>¡Ya está disponible!</strong>"; }
    if (dlBtn) {
      dlBtn.classList.remove("is-disabled");
      dlBtn.removeAttribute("aria-disabled");
      dlBtn.textContent = "Descargar BOTAS";
    }
    if (dlNote) { dlNote.textContent = "Gracias por tu interés. ¡Que lo disfrutes!"; }
  }

  function tick() {
    var diff = LAUNCH_DATE.getTime() - Date.now();
    if (diff <= 0) { launchReady(); clearInterval(timer); return; }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600);  s -= h * 3600;
    var m = Math.floor(s / 60);    s -= m * 60;
    if (fields.days)  fields.days.textContent  = d;
    if (fields.hours) fields.hours.textContent = pad(h);
    if (fields.mins)  fields.mins.textContent  = pad(m);
    if (fields.secs)  fields.secs.textContent  = pad(s);
  }
  var timer;
  if (box) { tick(); timer = setInterval(tick, 1000); }

  /* ===== Formulario de contacto (Web3Forms) ============================= */
  var form   = $("#contact-form");
  var status = $("#form-status");
  var submit = $("#submit-btn");

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot anti-spam
      if (form.botcheck && form.botcheck.checked) { return; }

      // Validación básica
      if (!form.checkValidity()) {
        setStatus("Revisa los campos requeridos.", "err");
        form.reportValidity && form.reportValidity();
        return;
      }

      var key = form.access_key ? form.access_key.value : "";
      if (!key || key === WEB3FORMS_PLACEHOLDER) {
        setStatus(
          "El formulario aún no está configurado. Mientras tanto, escríbeme a " + CONTACT_EMAIL + ".",
          "err"
        );
        return;
      }

      var data = Object.fromEntries(new FormData(form).entries());
      if (submit) { submit.disabled = true; }
      setStatus("Enviando…", "");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            setStatus("¡Gracias! Tu mensaje fue enviado. Te responderé pronto.", "ok");
            form.reset();
          } else {
            setStatus("No se pudo enviar. Escríbeme a " + CONTACT_EMAIL + ".", "err");
          }
        })
        .catch(function () {
          setStatus("Hubo un problema de red. Escríbeme a " + CONTACT_EMAIL + ".", "err");
        })
        .finally(function () { if (submit) { submit.disabled = false; } });
    });
  }

  /* ===== Estado inicial ================================================== */
  activate((location.hash || "#que-es").slice(1), false);
})();
