// Clara Dermatologia — FAQ, agendamento e ajuste de escala
(function () {
  // Entre 901px e 1239px o layout desktop é reduzido proporcionalmente,
  // mantendo as proporções exatas do frame de 1440px.
  var DESIGN_MIN = 1240;
  function fit() {
    var w = window.innerWidth; // não é afetado pelo zoom
    document.documentElement.style.zoom = (w > 900 && w < DESIGN_MIN) ? String(w / DESIGN_MIN) : '';
  }
  fit();
  window.addEventListener('resize', fit);

  // Quando o número real existir, preencha aqui (somente dígitos, com DDI e DDD).
  // Vazio = os botões de agendar abrem o aviso "Agendamento demonstrativo".
  var WHATSAPP_NUMBER = '';
  var WHATSAPP_MSG = 'Olá! Gostaria de agendar uma consulta de dermatologia. Podem me informar os horários disponíveis?';

  var modal = document.getElementById('modal');
  var lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-x').focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.js-agendar').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (WHATSAPP_NUMBER) {
        window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MSG), '_blank', 'noopener');
      } else {
        openModal();
      }
    });
  });
  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // FAQ: uma pergunta aberta por vez
  var items = document.querySelectorAll('.faq-q');
  items.forEach(function (q) {
    q.addEventListener('click', function () {
      var open = q.getAttribute('aria-expanded') === 'true';
      items.forEach(function (o) {
        o.setAttribute('aria-expanded', 'false');
        document.getElementById(o.getAttribute('aria-controls')).hidden = true;
      });
      if (!open) {
        q.setAttribute('aria-expanded', 'true');
        document.getElementById(q.getAttribute('aria-controls')).hidden = false;
      }
    });
  });

  // Atalhos para revisão: #modal abre o aviso, #faq=2 abre a 2ª pergunta
  if (location.hash === '#modal') openModal();
  var f = location.hash.match(/faq=(\d)/);
  if (f && items[f[1] - 1]) items[f[1] - 1].click();
})();
