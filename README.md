# BookHub API 📚

A robust, professional-grade RESTful API built with **Node.js**, **Express**, and **JavaScript**, designed to serve as an exemplary backend for a library management application. The project is fully containerized with **Docker**, uses the **Prisma ORM** to interact with a **PostgreSQL** database, and is protected by **automated integration tests**.

## ✨ Core Architectural Features & Best Practices

This project is built on a foundation of modern software engineering practices:

-   **✅ Consistent and Isolated Environment with Docker:** Uses **Docker Compose** to orchestrate the PostgreSQL database, ensuring the development environment is 100% identical for all contributors and fully isolated from the host machine.
-   **✅ Next-Generation ORM with Prisma:** Manages the entire database lifecycle, from schema definition and migration generation to type-safe data access, preventing common errors and vulnerabilities.
-   **✅ Layered Architecture:** The code is strictly organized into `Controllers`, `Services`, `Routes`, and `Middlewares`, promoting a clear separation of concerns, high cohesion, and low coupling, which makes the project scalable and easy to maintain.
-   **✅ Reliable Integration Tests:** A comprehensive test suite with **Jest** and **Supertest** that validates the API flows from end to end. The tests run against a separate, containerized test database that is created and destroyed for each run, ensuring atomic and reliable tests.
-   **✅ Atomic Transactions:** Critical business logic (such as creating a loan) uses database transactions to ensure **data integrity**. If any part of the operation fails, all changes are rolled back.
-   **✅ Workflow Automation:** Powerful and well-organized NPM scripts automate complex tasks like starting the development environment, running full test pipelines, and maintaining code quality.
-   **✅ Centralized Error Handling:** A global error middleware and custom error classes (`HttpError`) ensure that all API error responses are consistent, predictable, and secure, without leaking internal implementation details.

## 🛠️ Tech Stack

| Category              | Technology                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Main Stack**        | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) |
| **Testing & Quality** | ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)                                                                                                                                 |
| **Environment & DevOps**  | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Git](https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=git&logoColor=white) ![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) |

## 🚀 Getting Started

**Prerequisites:**

-   Node.js (v18+) and npm
-   Docker and Docker Compose

### 1. Clone and Install

```bash
git clone https://github.com/alissonpef/Book-End-API.git
cd Book-End-API
npm install
```

### 2. Configure Environment Variables

Create two files in the project root: `.env` (for development) and `.env.test` (for testing). Copy the content below into each, **ensuring `JWT_SECRET` is a long and random string**.

**`.env` file:**

```env
# Development Environment
POSTGRES_USER=app_user
POSTGRES_PASSWORD=app_password
POSTGRES_DB=book_api_dev_db
POSTGRES_PORT=5432
DATABASE_URL="postgresql://app_user:app_password@localhost:5432/book_api_dev_db"
JWT_SECRET=your-super-strong-secret-for-development
```

**`.env.test` file:**

```env
# Test Environment
POSTGRES_USER=app_user
POSTGRES_PASSWORD=app_password
POSTGRES_DB=book_api_test_db
POSTGRES_PORT=5433
DATABASE_URL="postgresql://app_user:app_password@localhost:5433/book_api_test_db"
JWT_SECRET=any-secret-for-testing
```

## ⚙️ Workflows & Scripts

The project is configured with NPM scripts to simplify workflows.

| Command             | Description                                                                                                                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`       | Starts the complete development environment. Spins up the database container and starts the server with `nodemon` for hot-reloading.                                                        |
| `npm run test`      | Executes the integration test pipeline. Spins up a **clean** test database, applies migrations, runs all tests, and shuts down the environment at the end.                                |
| `npm run test:watch`| Ideal for TDD. Requires the test environment to be started manually (`npm run services:up:test`), then runs Jest in *watch* mode, re-running tests on each code change.                     |
| `npm run lint`      | Runs ESLint and Prettier to check the code quality and formatting across the entire project.                                                                                               |
| `npm run services:down` | Shuts down the development database container.                                                                                                                                          |

## 📖 API Endpoints

| Endpoint                | Method   | Description                                 | Authentication Required? |
| :---------------------- | :------- | :------------------------------------------ | :----------------------- |
| `/auth/register`        | `POST`   | Registers a new user.                       | No                       |
| `/auth/login`           | `POST`   | Authenticates a user and returns a JWT.     | No                       |
| `/api/books`            | `GET`    | Lists all books.                            | Yes                      |
| `/api/books/:id`        | `GET`    | Gets the details of a specific book.        | Yes                      |
| `/api/books`            | `POST`   | Creates a new book.                         | Yes                      |
| `/api/books/:id`        | `PUT`    | Updates a book's data.                      | Yes                      |
| `/api/books/:id`        | `DELETE` | Removes a book from the system.             | Yes                      |
| `/api/loans`            | `GET`    | Lists all loans.                            | Yes                      |
| `/api/loans/:id`        | `GET`    | Gets the details of a specific loan.        | Yes                      |
| `/api/loans`            | `POST`   | Creates a new loan (borrows a book).        | Yes                      |
| `/api/loans/:id/return` | `POST`   | Registers a book's return.                  | Yes                      |

## 📁 Project Structure

The structure follows a layered architecture pattern, clearly separating responsibilities.

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

## 📫 Let's Connect!

I'd love to exchange ideas about backend development, Node.js, Express, or other technologies. Feel free to get in touch or add me on social media.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alisson-pereira-ferreira-45022623b/)
[![Gmail](https://img.shields.io/badge/Gmail-%23EA4335.svg?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alissonpef@gmail.com)

---

Made with ❤️ by **Alisson Pereira**.
