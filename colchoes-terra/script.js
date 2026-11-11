// =============================================================
// NÚMEROS DE WHATSAPP (tirados do site atual da empresa)
// Formato: 55 + DDD + número, só dígitos.
// =============================================================
const WHATS_EMPRESA = "5511955861863"; // atendimento CNPJ
const WHATS_LOJA    = "5511974638992"; // loja física / pessoa física

function linkWhats(numero, mensagem) {
  return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
}

// Liga todos os botões de WhatsApp ao número certo
function ligarBotoes(classe, numero, mensagem) {
  document.querySelectorAll("." + classe).forEach(function (botao) {
    botao.href = linkWhats(numero, mensagem);
    botao.target = "_blank";
    botao.rel = "noopener";
  });
}
ligarBotoes("whats-empresa", WHATS_EMPRESA, "Olá! Vim pelo site da Colchões Terra e gostaria de um orçamento para alojamento de obra.");
ligarBotoes("whats-loja", WHATS_LOJA, "Olá! Vim pelo site da Colchões Terra e quero informações da loja.");

// =============================================================
// ABAS DO CATÁLOGO
// Ao clicar numa aba, mostra o painel dela e esconde os outros.
// As setas do teclado também trocam de aba (acessibilidade).
// =============================================================
const abas = Array.from(document.querySelectorAll(".aba"));

function abrirAba(abaEscolhida) {
  abas.forEach(function (aba) {
    const ativa = aba === abaEscolhida;
    aba.setAttribute("aria-selected", ativa);
    aba.tabIndex = ativa ? 0 : -1;
    document.getElementById(aba.getAttribute("aria-controls")).hidden = !ativa;
  });
}

abas.forEach(function (aba, i) {
  aba.addEventListener("click", function () { abrirAba(aba); });
  aba.addEventListener("keydown", function (e) {
    let proxima = null;
    if (e.key === "ArrowRight") proxima = abas[(i + 1) % abas.length];
    if (e.key === "ArrowLeft")  proxima = abas[(i - 1 + abas.length) % abas.length];
    if (proxima) { proxima.focus(); abrirAba(proxima); }
  });
});

// =============================================================
// CALCULADORA DO ALOJAMENTO
// Regras simples, de propósito, para ser fácil de ajustar:
//  - 1 beliche para cada 2 pessoas
//  - 1 colchão, travesseiro, lençol, cobertor e toalha por pessoa
//  - 1 porta de roupeiro por pessoa (roupeiros de 8 portas)
//  - mesas de 6 lugares para quem come no mesmo turno
// =============================================================
const campoQtd = document.getElementById("trabalhadores");

function calcular() {
  // Lê o número digitado e garante que fica entre 1 e 2000
  let n = parseInt(campoQtd.value, 10);
  if (isNaN(n) || n < 1) n = 1;
  if (n > 2000) n = 2000;

  const turnos = Number(document.querySelector('input[name="turnos"]:checked').value);
  const comRoupa = document.getElementById("roupa").checked;
  const porTurno = Math.ceil(n / turnos);

  // Cada item: [quantidade, nome, detalhe]
  const itens = [
    [Math.ceil(n / 2), "Beliches de madeira", "1,20 m entre camas, padrão NR 18"],
    [n, "Colchões de solteiro", "Espuma D28 ou D33, 1,88 x 0,78 m"],
    [Math.ceil(n / 8), "Roupeiros de aço de 8 portas", "Uma porta com cadeado por pessoa"],
    [Math.ceil(porTurno / 6), "Mesas de refeitório de 6 lugares", porTurno + " pessoas por turno"]
  ];
  if (comRoupa) {
    itens.push([n, "Travesseiros", "Poliéster, 0,50 x 0,70 m"]);
    itens.push([n, "Jogos de lençol de solteiro", "Microfibra ou percal"]);
    itens.push([n, "Cobertores de microfibra", "Solteiro"]);
    itens.push([n, "Toalhas de banho", "Felpudas, 1,30 x 0,60 m"]);
  }

  // Monta as linhas da tabela
  document.getElementById("lista-titulo").textContent =
    "Alojamento para " + n + (n === 1 ? " pessoa" : " pessoas");
  document.getElementById("lista-itens").innerHTML = itens.map(function (item) {
    return "<tr><td>" + item[0] + "</td><td>" + item[1] + "<small>" + item[2] + "</small></td></tr>";
  }).join("");

  // Monta a mensagem do WhatsApp com a lista pronta
  const texto = "Olá! Fiz uma estimativa no site para um alojamento de " + n + " pessoas (" + turnos + " turno(s) no refeitório):\n" +
    itens.map(function (item) { return "- " + item[0] + " " + item[1]; }).join("\n") +
    "\nPodem me passar um orçamento?";
  const botao = document.getElementById("enviar-lista");
  botao.href = linkWhats(WHATS_EMPRESA, texto);
  botao.target = "_blank";
  botao.rel = "noopener";
}

// Botões de - e +
document.getElementById("menos").addEventListener("click", function () {
  campoQtd.value = Math.max(1, (parseInt(campoQtd.value, 10) || 1) - 10);
  calcular();
});
document.getElementById("mais").addEventListener("click", function () {
  campoQtd.value = Math.min(2000, (parseInt(campoQtd.value, 10) || 0) + 10);
  calcular();
});

// Recalcula a cada mudança no formulário
document.getElementById("form-calculo").addEventListener("input", calcular);
calcular();
