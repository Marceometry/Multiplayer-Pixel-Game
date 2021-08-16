<h1 align="center"> Multiplayer Pixel Game </h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>
</p>

<br>

<p align="center">
  <img alt="Project Mockup" src=".github/mockup.png" width="100%">
</p>

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Socket.io](https://socket.io/)
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

## 💻 Projeto

<h4>Acesse em: https://multiplayer-pixel-game.herokuapp.com/</h4>

Este projeto consiste em um jogo simples multiplayer onde os jogadores devem "comer" frutas para ganhar pontos. Esta versão foi baseada na playlist [Meu primeiro jogo multiplayer](https://www.youtube.com/playlist?list=PLMdYygf53DP5SVQQrkKCVWDS0TwYLVitL), do canal do [Felipe Deschamps](https://www.youtube.com/c/FilipeDeschamps) no YouTube.

## ✨ Detalhes do projeto original

- Backend com `Node.js` e `Socket.io` para realizar a conexão em tempo real com todos os clientes
- Boas práticas de arquitetura de software, como os Design Patterns `Observer` e `Factory`
- Funcionalidades de movimento dos jogadores e detecção de colisão com as 'frutas'

## 💣 Funcionalidades que eu adicionei

- Pontuação dos jogadores de acordo com a quantidade de frutas "comidas"
- Opção de adicionar "bombas" que diminuem a pontuação dos jogadores caso ocorra uma colisão
- Cronômetro indicando o tempo que falta para acabar a partida
- Placar que lista os jogadores com maior pontuação
- Ao lado esquerdo da tela, informações sobre a quantidade de frutas e bombas que o jogador colidiu
- Teletransporte para o outro lado da tela quando a borda é ultrapassada
- Possibilidade de adicionar um username customizado
- Possibilidade de escolher a cor do personagem
- Página de administrador com menu de opções para começar e parar o jogo, definir a velocidade do spawn de frutas, remover todas as frutas, etc.

## 🚀 Como executar

- Clone o repositório
- Instale as dependências com `npm i`
- Inicie o servidor com `node server.js`

Agora você pode acessar [`localhost:8000`](http://localhost:8000) do seu navegador.

---

<h4 align="center"> Feito com ♥ por Marcelino Teixeira </h4>
