# Prumo — Barbearia (demonstração)

Site de exemplo para mostrar a barbearias. A Prumo Barbearia não existe: nome, preços, horários e endereço são ilustrativos, e a faixa vermelha no topo avisa isso. O estilo segue o site da DPR (fundo claro e seções escuras, títulos com serifa, fotos grandes).

- `index.html`: faixa de demonstração, topo, capa, destaques, trabalhos (carrossel), serviços e preços, o espaço, como agendar, contato com mapa e rodapé.
- `styles.css`: computador e celular (até 960px vira menu de celular).
- `script.js`: links de WhatsApp, menu do celular, carrossel e o aviso "aberto agora" pelo horário de São Paulo.

## Fotos
Todas do Unsplash, licença gratuita, carregadas direto de `images.unsplash.com`: Nathon Oski (capa e barba em preto e branco), Redd Francisco (degradê e cadeira de couro), Nate Johnston (corte na tesoura), Allef Vinicius (barba completa), Andrea Donato (ferramentas) e Joshua Lawrence (cadeiras).

## Transformar no site de um cliente
1. Trocar nome, bairro, serviços, preços, horários e endereço no `index.html`.
2. Trocar as fotos pelas do cliente.
3. Em `script.js`, pôr o WhatsApp do cliente em `WHATSAPP`, ajustar as mensagens e os horários em `HORARIOS`.
4. Tirar a faixa `.demo` e a linha `<meta name="robots" content="noindex">`.
