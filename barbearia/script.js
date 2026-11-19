// Número que recebe as mensagens dos botões (55 + DDD + número, só números)
const WHATSAPP = "5511991535191";

const MENSAGENS = {
  agendar: "Oi! Vi o site de demonstração da Prumo Barbearia e quero um site assim para a minha barbearia.",
  quero: "Oi! Vi o site de demonstração da barbearia e quero um site assim para o meu negócio.",
};

document.querySelectorAll("[data-wa]").forEach((link) => {
  const texto = MENSAGENS[link.dataset.wa] || MENSAGENS.agendar;
  link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

// Menu do celular
const topo = document.getElementById("topo");
const botaoMenu = document.getElementById("menu-botao");
botaoMenu.addEventListener("click", () => {
  const aberto = topo.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  document.body.style.overflow = aberto ? "hidden" : "";
});
document.querySelectorAll("#menu a").forEach((link) =>
  link.addEventListener("click", () => {
    if (!topo.classList.contains("aberto")) return;
    topo.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  })
);

// Carrossel de trabalhos
const trilho = document.getElementById("carrossel");
const anterior = document.getElementById("ant");
const proximo = document.getElementById("prox");
const contador = document.getElementById("contador");
const fotos = trilho.querySelectorAll("figure");

function passo() {
  const gap = parseFloat(getComputedStyle(trilho).columnGap) || 0;
  return fotos[0].getBoundingClientRect().width + gap;
}

function atualizar() {
  const total = fotos.length;
  const largura = passo();
  const visiveis = Math.max(1, Math.round((trilho.clientWidth + 1) / largura));
  const primeira = Math.min(total - visiveis, Math.round(trilho.scrollLeft / largura)) + 1;
  const ultima = Math.min(total, primeira + visiveis - 1);
  contador.textContent = visiveis > 1 ? `${primeira}–${ultima} de ${total}` : `${primeira} de ${total}`;
  anterior.disabled = trilho.scrollLeft <= 2;
  proximo.disabled = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 2;
}

anterior.addEventListener("click", () => trilho.scrollBy({ left: -passo(), behavior: "smooth" }));
proximo.addEventListener("click", () => trilho.scrollBy({ left: passo(), behavior: "smooth" }));
trilho.addEventListener("scroll", () => requestAnimationFrame(atualizar), { passive: true });
trilho.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { e.preventDefault(); proximo.click(); }
  if (e.key === "ArrowLeft") { e.preventDefault(); anterior.click(); }
});
window.addEventListener("resize", atualizar);
atualizar();

// Aberto agora? (horário de São Paulo)
// 0 = domingo ... 6 = sábado; [abre, fecha] em horas
const HORARIOS = { 1: [9, 20], 2: [9, 20], 3: [9, 20], 4: [9, 20], 5: [9, 20], 6: [9, 18] };
const NOMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function agoraEmSaoPaulo() {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo", weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
  }).formatToParts(new Date());
  const valor = (tipo) => partes.find((p) => p.type === tipo).value;
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(valor("weekday"));
  return { dia, hora: (parseInt(valor("hour"), 10) % 24) + parseInt(valor("minute"), 10) / 60 };
}

function atualizarStatus() {
  const el = document.getElementById("status");
  const { dia, hora } = agoraEmSaoPaulo();
  const hoje = HORARIOS[dia];
  if (hoje && hora >= hoje[0] && hora < hoje[1]) {
    el.classList.add("aberto");
    el.querySelector("span").textContent = `Estamos atendendo agora, até as ${hoje[1]}h.`;
    return;
  }
  el.classList.remove("aberto");
  if (hoje && hora < hoje[0]) {
    el.querySelector("span").textContent = `Fechado agora. Abrimos hoje às ${hoje[0]}h.`;
    return;
  }
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7;
    if (HORARIOS[d]) {
      const quando = i === 1 ? "amanhã" : NOMES[d];
      el.querySelector("span").textContent = `Fechado agora. Abrimos ${quando} às ${HORARIOS[d][0]}h.`;
      return;
    }
  }
}
atualizarStatus();
setInterval(atualizarStatus, 60 * 1000);
