// Aura — chat de prévia (respostas demonstrativas, sem IA em tempo real)
(function () {
  // Entre 901px e 1239px o layout desktop é reduzido proporcionalmente,
  // mantendo as proporções exatas do frame de 1440px.
  var DESIGN_MIN = 1240;
  function fit() {
    var root = document.documentElement;
    var w = window.innerWidth; // não é afetado pelo zoom
    root.style.zoom = (w > 900 && w < DESIGN_MIN) ? String(w / DESIGN_MIN) : '';
  }
  fit();
  window.addEventListener('resize', fit);

  // Troque pelo número do salão (somente dígitos, com DDI e DDD).
  var WHATSAPP_NUMBER = '5500000000000';
  var WHATSAPP_MSG = 'Olá! Vim pelo site da Aura e gostaria de agendar um horário.';
  var waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MSG);

  document.querySelectorAll('.js-whatsapp').forEach(function (a) {
    a.href = waUrl;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  var fab = document.querySelector('.chat-fab');
  var chat = document.getElementById('aura-chat');
  var steps = chat.querySelectorAll('.chat-step');

  function go(name) {
    steps.forEach(function (s) { s.hidden = s.dataset.step !== name; });
  }
  function open() {
    go('inicio');
    chat.hidden = false;
    fab.hidden = true;
    fab.setAttribute('aria-expanded', 'true');
    chat.querySelector('.chat-close').focus();
  }
  function close() {
    chat.hidden = true;
    fab.hidden = false;
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
  }

  fab.addEventListener('click', open);
  chat.querySelector('.chat-close').addEventListener('click', close);
  chat.addEventListener('click', function (e) {
    var b = e.target.closest('[data-go]');
    if (b) go(b.dataset.go);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !chat.hidden) close();
  });

  // Atalho para revisar um estado: index.html#chat=servicos
  var m = location.hash.match(/chat=(\w+)/);
  if (m) { open(); go(m[1]); }
})();
