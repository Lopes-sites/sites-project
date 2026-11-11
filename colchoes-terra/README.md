# Colchões Terra — Móveis para alojamento de obra

Proposta de site novo (HTML, CSS e JS, sem build) para a Colchões Terra, fábrica de beliches, colchões e móveis para alojamentos de obra desde 1976. Os textos, produtos, medidas e contatos vieram do site atual da empresa (colchoesterra.com.br).

## O que tem
- **Catálogo em abas** por área do canteiro: alojamento, vestiário, refeitório, escritório e convivência.
- **Calculadora do alojamento:** a pessoa informa quantos trabalhadores e os turnos do refeitório, e o site monta uma lista estimada (beliches, colchões, roupeiros, mesas, roupa de cama) com botão para mandar a lista no WhatsApp de empresas. As regras de cálculo estão comentadas em `script.js`.

## Antes de publicar para o cliente
- **Confirmar com a empresa:** horário (o site antigo mostra 8h30–18h e 7h30–17h30), o WhatsApp de pessoa física (o texto e o link do site antigo apontam para números diferentes) e as normas citadas (o site antigo fala em NR 18 e 21; usamos só NR 18).
- **Fotos:** as imagens são carregadas direto do site antigo da empresa. Se aquele site sair do ar, elas somem; o ideal é salvar as fotos em `assets/` e trocar os links.
- **Faixa de prévia:** remover o `<div class="aviso-previa">` no topo do `index.html`.
- **WhatsApp:** os números ficam no topo do `script.js` (`WHATS_EMPRESA` e `WHATS_LOJA`).
