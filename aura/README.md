# Aura — Estúdio de beleza

Site estático (HTML + CSS + JS, sem build) replicado do Figma "Aura — Estúdio de beleza".

- `index.html` — página completa (Navegação, Hero, Manifesto, Serviços, Portfólio, Experiência, O estúdio, Equipe, Depoimentos, Localização, Dúvidas, Agendamento, Rodapé) + chat da Aura.
- `styles.css` — desktop baseado no frame de 1440px; mobile (≤900px) no frame de 390px. Entre 901 e 1239px o desktop é reduzido proporcionalmente.
- `script.js` — chat de prévia (4 estados: boas-vindas, serviços, agendamento, WhatsApp) e links de WhatsApp.
- `assets/` — fotos recortadas dos exports do Figma (troque pelos originais em alta resolução, mesmos nomes).

## Personalizar
- Número do WhatsApp: `WHATSAPP_NUMBER` em `script.js`.
- Revisar um estado do chat direto: `index.html#chat=servicos` (ou `inicio`, `agendar`, `whatsapp`).

Abra `index.html` no navegador ou publique a pasta em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages).
