# Book-End API 📚

Uma API RESTful robusta e de nível profissional, construída com **Node.js**, **Express** e **JavaScript**, projetada para servir como um backend exemplar para uma aplicação de gerenciamento de biblioteca. O projeto é totalmente containerizado com **Docker**, utiliza o **Prisma ORM** para interagir com um banco de dados **PostgreSQL** e é protegido por **testes de integração automatizados**.

## ✨ Core Architectural Features & Best Practices

Este projeto foi construído sobre uma fundação de práticas de engenharia de software modernas:

- **✅ Ambiente Consistente e Isolado com Docker:** Utiliza **Docker Compose** para orquestrar o banco de dados PostgreSQL, garantindo que o ambiente de desenvolvimento seja 100% idêntico para todos os contribuidores e totalmente isolado da máquina host.
- **✅ ORM de Próxima Geração com Prisma:** Gerencia todo o ciclo de vida do banco de dados, desde a definição do schema e geração de migrações até o acesso a dados tipado e seguro, prevenindo erros comuns e vulnerabilidades.
- **✅ Arquitetura em Camadas (Layered Architecture):** O código é estritamente organizado em `Controllers`, `Services`, `Routes` e `Middlewares`, promovendo uma clara separação de responsabilidades, alta coesão e baixo acoplamento, o que torna o projeto escalável e fácil de manter.
- **✅ Testes de Integração Confiáveis:** Uma bateria de testes com **Jest** e **Supertest** que valida os fluxos da API de ponta a ponta. Os testes são executados contra um banco de dados de teste separado e containerizado, que é criado e destruído a cada execução, garantindo testes atômicos e confiáveis.
- **✅ Transações Atômicas:** A lógica de negócio crítica (como a criação de um empréstimo) utiliza transações de banco de dados para garantir a **integridade dos dados**. Se qualquer parte da operação falhar, todas as alterações são revertidas (rollback).
- **✅ Automação de Workflows:** Scripts NPM poderosos e bem organizados automatizam tarefas complexas como iniciar o ambiente de desenvolvimento, rodar pipelines de teste completos e manter a qualidade do código.
- **✅ Tratamento de Erros Centralizado:** Um middleware de erro global e classes de erro customizadas (`HttpError`) garantem que todas as respostas de erro da API sejam consistentes, previsíveis e seguras, sem vazar detalhes internos da implementação.

## 🛠️ Stack de Tecnologias

| Categoria | Tecnologia |
| :--- | :--- |
| **Stack Principal** | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) |
| **Testes e Qualidade** | ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) |
| **Ambiente e DevOps** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Git](https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=git&logoColor=white) ![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) |                                                                                 |

## 🚀 Getting Started

**Pré-requisitos:**

- Node.js (v18+) e npm
- Docker e Docker Compose

### 1. Clonar e Instalar

```bash
git clone https://github.com/alissonpef/Book-End-API.git
cd Book-End-API
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie dois arquivos na raiz do projeto: `.env` (para desenvolvimento) e `.env.test` (para os testes). Copie o conteúdo abaixo para cada um, **garantindo que `JWT_SECRET` seja uma string longa e aleatória**.

**Arquivo `.env`:**

```env
# Ambiente de Desenvolvimento
POSTGRES_USER=app_user
POSTGRES_PASSWORD=app_password
POSTGRES_DB=book_api_dev_db
POSTGRES_PORT=5432
DATABASE_URL="postgresql://app_user:app_password@localhost:5432/book_api_dev_db"
JWT_SECRET=seu-segredo-super-forte-para-desenvolvimento
```

**Arquivo `.env.test`:**

```env
# Ambiente de Teste
POSTGRES_USER=app_user
POSTGRES_PASSWORD=app_password
POSTGRES_DB=book_api_test_db
POSTGRES_PORT=5433
DATABASE_URL="postgresql://app_user:app_password@localhost:5433/book_api_test_db"
JWT_SECRET=qualquer-segredo-para-testes
```

## ⚙️ Workflows & Scripts

O projeto foi configurado com scripts NPM para simplificar os fluxos de trabalho.

| Comando                 | Descrição                                                                                                                                                                                      |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`           | Inicia o ambiente de desenvolvimento completo. Sobe o contêiner do banco de dados e inicia o servidor com `nodemon` para hot-reloading.                                                        |
| `npm run test`          | Executa o pipeline de testes de integração. Sobe um banco de dados de teste **limpo**, aplica as migrações, roda todos os testes e desliga o ambiente no final.                                |
| `npm run test:watch`    | Ideal para TDD. Requer que o ambiente de teste seja iniciado manualmente (`npm run services:up:test`) e então roda o Jest em modo _watch_, re-executando os testes a cada alteração de código. |
| `npm run lint`          | Executa o ESLint e o Prettier para verificar a qualidade e a formatação do código em todo o projeto.                                                                                           |
| `npm run services:down` | Desliga o contêiner do banco de dados de desenvolvimento.                                                                                                                                      |

## 📖 Endpoints da API

| Endpoint                | Método   | Descrição                                      | Autenticação Necessária? |
| :---------------------- | :------- | :--------------------------------------------- | :----------------------- |
| `/auth/register`        | `POST`   | Registra um novo usuário.                      | Não                      |
| `/auth/login`           | `POST`   | Autentica um usuário e retorna um token JWT.   | Não                      |
| `/api/books`            | `GET`    | Lista todos os livros.                         | Sim                      |
| `/api/books/:id`        | `GET`    | Obtém os detalhes de um livro específico.      | Sim                      |
| `/api/books`            | `POST`   | Cria um novo livro.                            | Sim                      |
| `/api/books/:id`        | `PUT`    | Atualiza os dados de um livro.                 | Sim                      |
| `/api/books/:id`        | `DELETE` | Remove um livro do sistema.                    | Sim                      |
| `/api/loans`            | `GET`    | Lista todos os empréstimos.                    | Sim                      |
| `/api/loans/:id`        | `GET`    | Obtém os detalhes de um empréstimo específico. | Sim                      |
| `/api/loans`            | `POST`   | Cria um novo empréstimo (pega um livro).       | Sim                      |
| `/api/loans/:id/return` | `POST`   | Registra a devolução de um livro.              | Sim                      |

## 📁 Estrutura do Projeto

A estrutura segue um padrão de arquitetura em camadas, separando claramente as responsabilidades.

```
/
├── .env
├── .env.test
├── infra/
│   ├── compose.yaml
│   └── scripts/
│       └── wait-for-postgres.js
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── errors/
│   ├── middlewares/
│   ├── routes/
│   └── services/
└── tests/
    ├── helpers/
    │   └── db.js
    └── integration/
```

---

## 📫 Vamos Conectar!

Adoraria trocar ideias sobre desenvolvimento backend, Node.js, Express ou outras tecnologias. Fique à vontade para entrar em contato ou me adicionar nas redes.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alisson-pereira-ferreira-45022623b/)
[![Gmail](https://img.shields.io/badge/Gmail-%23EA4335.svg?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alissonpef@gmail.com)

---

Feito com ❤️ por **Alisson Pereira**.
