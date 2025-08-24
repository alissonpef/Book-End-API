const request = require("supertest");
const express = require("express");
const apiRoutes = require("../../src/routes/api.routes");
const authRoutes = require("../../src/routes/auth.routes");
const errorMiddleware = require("../../src/middlewares/error.middleware");
const { prisma, cleanDatabase } = require("../helpers/db");

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use("/api", apiRoutes);
app.use(errorMiddleware);

const testUser = {
  name: "Test Loan User",
  email: "test_loans@example.com",
  password: "password123",
};

let authToken;
let createdBook;
let createdLoan;
let testUserFromDb;

beforeAll(async () => {
  await cleanDatabase();

  const registerResponse = await request(app)
    .post("/auth/register")
    .send(testUser);
  testUserFromDb = registerResponse.body;

  const loginResponse = await request(app).post("/auth/login").send({
    email: testUser.email,
    password: testUser.password,
  });
  authToken = loginResponse.body.token;

  const bookData = {
    title: "Book for Loan",
    author: "Author of Loan",
    quantityAvailable: 1,
  };
  const bookResponse = await request(app)
    .post("/api/books")
    .set("Authorization", `Bearer ${authToken}`)
    .send(bookData);
  createdBook = bookResponse.body;
});

afterAll(async () => {
  await cleanDatabase();
  await prisma.$disconnect();
});

describe("Loan Routes", () => {
  it("should create a new loan successfully", async () => {
    const response = await request(app)
      .post("/api/loans")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ userId: testUserFromDb.id, bookId: createdBook.id });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.userId).toBe(testUserFromDb.id);
    expect(response.body.bookId).toBe(createdBook.id);
    expect(response.body.returnedAt).toBeNull();

    createdLoan = response.body;
  });

  it("should return a specific loan by id", async () => {
    const response = await request(app)
      .get(`/api/loans/${createdLoan.id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdLoan.id);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.email).toBe(testUser.email);
    expect(response.body).toHaveProperty("book");
    expect(response.body.book.title).toBe(createdBook.title);
  });

  it("should return a book successfully", async () => {
    const response = await request(app)
      .post(`/api/loans/${createdLoan.id}/return`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdLoan.id);
    expect(response.body.returnedAt).not.toBeNull();
  });
});
