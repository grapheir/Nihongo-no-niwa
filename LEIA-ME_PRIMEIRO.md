# Nihongo no Niwa — pacote para GitHub Pages

Este pacote contém uma cópia estática do site aprovado em 19/09/2026. Ele pode ser publicado gratuitamente em um repositório público com o GitHub Pages.

Site principal no Sites: <https://nihongo-no-niwa-anna.annamleal.chatgpt.site>

## Arquivos do site

- `index.html`: página, estilos, navegação e tela do quiz.
- `content.js`: banco de kanji, leituras, significados e contextos.
- `grammar.js`: verbos, forma て e exercícios de ～ながら.
- `app.js`: rodízio, correção, pontuação, diagnóstico e revisão.
- `.nojekyll`: informa ao GitHub Pages que os arquivos devem ser publicados diretamente, sem processamento do Jekyll.
- `documentacao/CRITERIOS_PEDAGOGICOS.md`: princípios didáticos que devem orientar conteúdos futuros.
- `documentacao/REVISAO_E_VALIDACAO.md`: resumo da revisão aprovada e dos testes realizados.

## Publicação pelo navegador

1. Entre em <https://github.com/new> e crie um repositório público, por exemplo `nihongo-no-niwa`.
2. Extraia este arquivo ZIP no computador.
3. No repositório, escolha **Add file → Upload files** e envie todo o conteúdo extraído. `index.html` precisa ficar na raiz do repositório, e não dentro de outra pasta.
4. Confirme o envio em **Commit changes**.
5. Abra **Settings → Pages**.
6. Em **Build and deployment**, selecione **Deploy from a branch**.
7. Selecione a branch **main**, a pasta **/(root)** e clique em **Save**.
8. Quando a publicação terminar, o endereço normalmente será `https://SEU-USUARIO.github.io/nihongo-no-niwa/`.

O GitHub informa que uma publicação pode levar alguns minutos para aparecer. Em **Settings → Pages**, o botão **Visit site** mostra o endereço correto.

## Cuidados importantes

- Um site do GitHub Pages é público na internet. Não coloque senhas, dados pessoais ou materiais que não possam ser compartilhados.
- Para atualizar o site, substitua os arquivos modificados e faça um novo commit.
- Antes de ampliar o banco, siga `documentacao/CRITERIOS_PEDAGOGICOS.md` e valide as respostas. Não use perguntas que peçam apenas para classificar uma leitura como kun ou on.
- O pacote é uma cópia da versão atual. O site do Sites e uma futura cópia no GitHub Pages não se atualizam automaticamente entre si.

## Referências oficiais

- Criar um site: <https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site>
- Configurar a origem da publicação: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
