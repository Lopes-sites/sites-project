# Clara — Dermatologia

Landing page estática (HTML, CSS e JS, sem build) replicada do layout: desktop no frame de 1440px e celular no frame de 390px (até 900px de largura). Entre 901px e 1239px o layout desktop é reduzido proporcionalmente.

## Antes de publicar para um cliente
- **WhatsApp:** em `script.js`, preencha `WHATSAPP_NUMBER` (só dígitos, com DDI e DDD). Enquanto estiver vazio, os botões de agendar abrem o aviso "Agendamento demonstrativo"; preenchido, abrem o WhatsApp com a mensagem inicial.
- **Dados do consultório:** troque os textos entre colchetes (nome, CRM, RQE, endereço, horários) e os avisos de "modelo demonstrativo" no `index.html`.
- **Fotos:** as imagens em `assets/` foram recortadas dos exports do Figma. Para mais nitidez, substitua pelos arquivos originais com os mesmos nomes.

## Atalhos para revisão
- `index.html#modal` abre o aviso de agendamento.
- `index.html#faq=2` abre a 2ª pergunta do FAQ.
