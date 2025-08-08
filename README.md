# API de Posts e Comentários - Desafio Back-end Jr da SmartNX

Este repositório contempla uma API RESTful desenvolvida em Node.js para o desafio de Desenvolvedor Back-end Jr da empresa SmartNX. A aplicação permite o gerenciamento completo de usuários, posts e comentários, com autenticação baseada em JSON Web Token (JWT).

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para a construção da API.
- **Sequelize**: ORM para abstração de dados.
- **PostgreSQL**: Banco de dados relacional.
- **JSON Web Token (JWT)**: Para autenticação e autorização.
- **Docker**: Para containerização da aplicação e do banco de dados.

## Pré-requisitos

É necessário ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) ou [PostgreSQL](https://www.postgresql.org/) (para rodar localmente)

## Passos iniciais de configuração da API
### 1. Clonar o Repositório

```bash
git clone https://github.com/WalacePaula/backend-jr-api.git
cd backend-jr-api
```
### 2. Configurar as Variáveis de Ambiente

Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
- Linux/Mac/Git Bash

```bash
cp .env.example .env
```
- Windows (cmd)

```bash
copy .env.example .env
```
- Windows (PowerShell)
```bash
Copy-Item ".env.example" ".env"
```
Edite o novo arquivo `.env` criado com suas informações:

- No campo  `DB_USER` insira o nome de usuário do banco.

- No campo `DB_PASSWORD` insira a senha do usuário do banco.

- No campo `JWT_SECRET` insira a chave secreta para uso no JWT. Você pode usar um gerador de chaves ou criar uma string aleatória longa.

## Executar a API com Docker
Lembre-se de ter instalado o Docker Desktop.

Com o Docker Desktop em execução (basta abrir o Docker Desktop), rode:

```bash
docker-compose up
```
A API estará disponível em `http://localhost:4000`, e o banco de dados estará acessível na porta `5432`.

## Executar a API Localmente

### 1. Configurar o Banco de Dados

Crie um banco de dados com o mesmo nome especificado na variável `DB_NAME` do seu arquivo `.env`. Certifique-se de que seu servidor PostgreSQL está rodando. 

### 2. Instalar as Dependências
No terminal, na pasta raiz do projeto, execute:

```bash
npm install
```

### 2. Executar a Aplicação com Node.js

Para iniciar o servidor em modo de desenvolvimento (com recarregamento automático):

```bash
npm run dev
```
A API estará disponível em `http://localhost:4000`.

## Endpoints da API

O prefixo para todas as rotas é `/api`. Todas as rotas de Posts e Comentários exigem um token JWT no cabeçalho `Authorization: Bearer <token>`.

### Usuários
- `POST /users` - Cria um novo usuário.
- `POST /users/login` - Autentica um usuário e retorna um token JWT.

### Posts
- `POST /posts` - Cria um novo post.
- `GET /posts` - Lista todos os posts e seus comentários.
- `PUT /posts/:postId` - Atualiza um post específico.
- `DELETE /posts/:postId` - Deleta um post específico.

### Comentários
- `POST /posts/:postId/comments` - Adiciona um comentário a um post.
- `DELETE /posts/:postId/comments/:commentId` - Deleta um comentário específico.
