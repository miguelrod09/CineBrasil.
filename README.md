# CineBrasil 🎬

Projeto de portfólio feito com HTML, CSS e JavaScript. Inclui catálogo, páginas de filmes, seleção de sessões e assentos, resumo e pagamento **fictício**, com ingresso demonstrativo.

## Como executar

Abra a pasta no VS Code e use Live Server no `index.html`. Os caminhos de arquivos foram ajustados para funcionar também em subpastas, como no GitHub Pages.

## Teste do fluxo

Início → filme → escolha do horário → assentos → pagamento fictício → ingresso demonstrativo.

## Limitações

Não existe backend, reserva multiusuário, autenticação ou cobrança real. Assentos ocupados são ilustrativos. Não use dados reais de cartão. Filmes e horários são demonstrativos.

## Fluxo de compra

Selecione filme, sessão e assentos. A página de pagamento apresenta opções de cartão com dados pré-preenchidos não editáveis e PIX com QR Code ilustrativo. O fluxo não processa transações, nem solicita dados bancários reais. A confirmação pode ser impressa.

## Identidade das abas

Cada página usa um favicon SVG próprio na pasta `icones/`. Os cartazes de Batman, Jigsaw e Jumper são exibidos no resumo de pagamento e no ingresso.


## Melhorias de navegação e perfil
- O card inteiro é clicável usando o link de detalhes existente (também acessível por teclado).
- Minha conta salva apenas nome e cidade no `localStorage` do navegador, sem login ou cadastro real.
- Meus pedidos registra novas compras concluídas no `localStorage` do navegador. Pedidos antigos salvos somente em `sessionStorage` não são recuperáveis automaticamente.
- Para autenticação, sincronização, disponibilidade real de assentos e pagamento real, será necessário backend e banco de dados. Não informe dados reais de cartão no ambiente demonstrativo.


## Acesso demonstrativo
Abra `login.html` pelo Live Server e selecione Bruce Wayne. A sessão usa sessionStorage; os pedidos continuam salvos localmente em localStorage. Não há autenticação real nem banco de dados. Não use este login para dados pessoais ou financeiros.


## Neon Experience
- Transições leves de entrada e navegação, microinterações nos botões, cards e assentos.
- Respeita a preferência do sistema por movimento reduzido.
- O retrato de Bruce Wayne (Christian Bale, *The Dark Knight*, 2008) é carregado de uma URL externa de referência; requer internet e pode deixar de funcionar. Há fallback visual local. Antes de publicar, obtenha autorização/licença para uso da fotografia e hospede uma cópia permitida em `imagens/bruce-wayne.jpg`, atualizando as referências.
- Não houve alteração no catálogo de cartazes, preços, login demonstrativo ou armazenamento local dos pedidos.


## Gotham Edition
Cabeçalho dividido em navegação à esquerda e perfil à direita; login com fundo cinematográfico e silhueta vetorial original de morcego (não reproduz um logotipo de marca). Respeita preferência por movimento reduzido.
