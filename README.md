# sites-project

Portfólio de sites estáticos (HTML, CSS e JS, sem build). Cada site fica em uma pasta própria, e a raiz (`index.html`) é a vitrine: um card por site, com captura no computador e no celular, que leva ao site ao clicar.

| Pasta | Site |
|---|---|
| [`aura/`](aura/) | Aura — Estúdio de beleza |
| [`clara/`](clara/) | Clara — Dermatologia |

## Publicação
Publicado pela Vercel a partir deste repositório: cada push na `main` atualiza o site. Como não tem build, na Vercel use o preset **Other**, sem comando de build e com a raiz do projeto como diretório de saída.

## Novo site
1. Crie uma pasta com o site (ex.: `novo-site/index.html`).
2. Gere as capturas em `assets/previews/`: `novo-site-desktop.jpg` (página inteira, 960px de largura) e `novo-site-mobile.jpg` (390×844).
3. No `index.html` da raiz, copie o bloco `<a class="card">` do Aura, troque link, imagens e textos e atualize o contador de projetos.
