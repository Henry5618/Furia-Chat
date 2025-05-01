# 🐯 Live Chat FURIA

Um chat ao vivo com comandos personalizados e bot temático do time FURIA.
 - Desenvolvido como projeto acadêmico.

## 🔧 Funcionalidades

- Autenticação com nome de usuário
- Chat em tempo real via WebSocket
- Comandos especiais com `!` (respostas automáticas do bot)
- Comandos disponíveis:
  - `!proximojogo`
  - `!elenco`
  - `!resultados`
  - `!torcida`
  - `!historico`
  - `!mascote`

## 🚀 Como rodar o projeto

1. Clone o repositório:
     - git clone https://github.com/Henry5618/Furia-Chat.git
   
2. Acesse a pasta e instale dependências:
   ```
   cd furia-chat
   npm install
   ```
3. Inicie o servidor:
   ```bash
   cd backend
   npm run dev
   ```
4. Abra o `index.html` no navegador.

## 📁 Estrutura

- `index.html`: Estrutura da landing page
- `chat.html`: Estrutura do login e chat
- `style.css`: Estilização da interface
- `script.js`: Lógica do chat (front-end)
- `server.js`: Servidor WebSocket (Node.js)

## 👨‍💻 Tecnologias

- HTML, CSS, JavaScript
- WebSocket
- Node.js (`ws`)

## 📚 Objetivo

Este projeto simula um chat temático esportivo com respostas automáticas e interatividade, focando em praticar:
- Manipulação do DOM
- Comunicação em tempo real
- Interação homem-máquina via comandos

## 📅 Entrega

Projeto desenvolvido para fins acadêmicos.