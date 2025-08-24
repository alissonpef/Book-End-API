# Book-End API 📚

Uma API RESTful completa e segura construída com Node.js e Express, projetada para gerenciar uma biblioteca digital com usuários, livros e um sistema de empréstimos. A autenticação é baseada em JSON Web Tokens (JWT), e as rotas são protegidas para garantir a integridade dos dados e o controle de acesso.

## ✨ Funcionalidades Principais

-   **Autenticação Segura com JWT:** Sistema completo de registro e login que emite tokens JWT assinados e com tempo de expiração.
-   **Segurança de Senhas:** As senhas dos usuários são sempre criptografadas (hashed e salted) usando **bcrypt** antes de serem armazenadas, nunca em texto puro.
-   **Proteção de Rotas (Middleware):** Rotas críticas são protegidas por um middleware que valida o token JWT, garantindo que apenas usuários autenticados possam acessar ou modificar dados.
-   **Gerenciamento de Recursos (CRUD):** Operações completas de Criar, Ler, Atualizar e Deletar (CRUD) para o recurso de livros.
-   **Lógica de Negócio (Sistema de Empréstimos):** Funcionalidades para criar empréstimos e registrar devoluções, atualizando automaticamente a quantidade de exemplares disponíveis de um livro.
-   **Tratamento de Erros Centralizado:** Um middleware de erro global captura tanto erros esperados (ex: "livro não encontrado") quanto inesperados (erros de servidor), respondendo com mensagens JSON claras e códigos de status HTTP apropriados.
-   **Configuração Segura:** Utiliza variáveis de ambiente (`.env`) para gerenciar chaves secretas e outras configurações sensíveis, evitando que sejam expostas no código-fonte.

## 🛠️ Tecnologias Utilizadas

#### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

#### Ferramentas e Bibliotecas
-   **Autenticação e Segurança:** `jsonwebtoken`, `bcrypt`
-   **Variáveis de Ambiente:** `dotenv`
-   **Geração de IDs:** `uuid`

## ⚙️ Como Funciona (Fluxo Técnico)

1.  **Registro e Segurança:** Um novo usuário envia nome, e-mail e senha. A API usa **bcrypt** para gerar um hash seguro da senha antes de armazenar os dados do usuário no modelo em memória.
2.  **Autenticação e Geração de Token:** Um usuário envia e-mail e senha para a rota de login. A API encontra o usuário e usa `bcrypt.compareSync` para verificar a senha. Se for válida, um token JWT é gerado com **jsonwebtoken**, contendo um `payload` com o ID do usuário, assinado com uma chave secreta (`JWT_KEY`) e com um tempo de expiração de 1 dia.
3.  **Acesso a Rotas Protegidas:** Para acessar uma rota como `/api/books`, o cliente deve enviar um header `Authorization: Bearer <token>`. O middleware `ensureAuth` intercepta a requisição, extrai e verifica a validade do token. Se o token for válido, os dados do usuário são anexados ao objeto `req` e a requisição prossegue.
4.  **Lógica de Negócio (Empréstimos):** Quando um usuário autenticado solicita um empréstimo, a API verifica a disponibilidade do livro. Se houver exemplares, ela cria um registro de empréstimo e chama o modelo de livros para decrementar a quantidade disponível.
5.  **Tratamento de Erros Centralizado:** Se uma operação falhar (ex: um livro não é encontrado), o modelo lança uma classe de erro personalizada `HttpError` com um status e mensagem. Os controllers capturam esse erro com um bloco `try...catch` e o passam para o `error-middleware` usando `next(error)`. Este middleware final formata e envia a resposta de erro JSON apropriada.

## 🚀 Como Executar o Projeto

**Pré-requisitos:**
-   Node.js (v18 ou superior)
-   npm

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/alissonpef/Book-End-API
    cd Book-End-API
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione as seguintes linhas a ele (use uma chave JWT longa e aleatória):
      ```
      PORT=3000
      JWT_KEY=sua-chave-secreta-muito-forte-e-aleatoria-aqui
      ```

4.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  O servidor estará rodando em **http://localhost:3000**. Use uma ferramenta como Postman ou Insomnia para interagir com a API.

## 📖 Endpoints da API

| Endpoint | Método | Descrição | Autenticação Necessária? |
| :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Registra um novo usuário. | Não |
| `/auth/login` | `POST` | Autentica um usuário e retorna um token JWT. | Não |
| `/auth/test` | `GET` | Rota de teste para validar um token. | Sim |
| `/api/books` | `GET` | Lista todos os livros (ID e Título). | Sim |
| `/api/books/:id` | `GET` | Obtém os detalhes de um livro específico. | Sim |
| `/api/books` | `POST` | Cria um novo livro. | Sim |
| `/api/books/:id` | `PUT` | Atualiza os dados de um livro. | Sim |
| `/api/books/:id` | `DELETE` | Remove um livro do sistema. | Sim |
| `/api/loans` | `GET` | Lista todos os empréstimos. | Sim |
| `/api/loans/:id` | `GET` | Obtém os detalhes de um empréstimo específico. | Sim |
| `/api/loans` | `POST` | Cria um novo empréstimo (pega um livro). | Sim |
| `/api/loans/:id/return` | `POST` | Registra a devolução de um livro. | Sim |

## 📁 Estrutura do Projeto

A estrutura segue o padrão MVC (Model-View-Controller), adaptado para uma API, separando claramente as responsabilidades.

```
/
├── .env
├── .gitignore
├── package.json
└── src/
    ├── controllers/      # Lógica que conecta rotas e modelos
    ├── errors/           # Classes de erro personalizadas
    ├── middlewares/      # Funções de autenticação e tratamento de erro
    ├── models/           # Lógica de negócio e acesso aos dados
    └── routes/           # Definição dos endpoints da API
```

## 🔮 Melhorias Futuras

-   [ ] **Integração com Banco de Dados:** Substituir os arrays em memória por um banco de dados real (como PostgreSQL ou MongoDB) com um ORM/ODM (Sequelize, Prisma, Mongoose).
-   [ ] **Controle de Acesso Baseado em Papéis (RBAC):** Adicionar papéis de `admin` e `standard`. Apenas `admin` poderia gerenciar livros (CRUD), enquanto usuários `standard` só poderiam listar livros e gerenciar seus próprios empréstimos.
-   [ ] **Testes Automatizados:** Implementar testes unitários e de integração usando um framework como **Jest** ou **Mocha** para garantir a robustez e a confiabilidade da API.
-   [ ] **Validação de Dados de Entrada:** Usar uma biblioteca como **Joi** ou **express-validator** para validar os corpos das requisições de forma mais declarativa e robusta.
-   [ ] **Containerização com Docker:** Adicionar um `Dockerfile` e `docker-compose.yml` para facilitar a implantação e garantir um ambiente de execução consistente.

---

## 📫 Vamos Conectar!

Adoraria trocar ideias sobre desenvolvimento backend, Node.js, Express ou outras tecnologias. Fique à vontade para entrar em contato ou me adicionar nas redes.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alisson-pereira-ferreira-45022623b/)
[![Gmail](https://img.shields.io/badge/Gmail-%23EA4335.svg?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alissonpef@gmail.com)

---
Feito com ❤️ por **Alisson Pereira**.