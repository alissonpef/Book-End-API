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
  name: "Test User",
  email: "test_books@example.com",
  password: "password123",
};

let authToken;
let createdBook;

beforeAll(async () => {
  await cleanDatabase();

  await request(app).post("/auth/register").send(testUser);
  const loginResponse = await request(app).post("/auth/login").send({
    email: testUser.email,
    password: testUser.password,
  });
  authToken = loginResponse.body.token;
});

afterAll(async () => {
  await cleanDatabase();
  await prisma.$disconnect();
});

describe("Book Routes", () => {
  it("should create a new book successfully", async () => {
    const newBook = {
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      quantityAvailable: 5,
    };
    const response = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newBook);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newBook.title);
    createdBook = response.body;
  });

  it("should return all books", async () => {
    const response = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("The Hitchhiker's Guide to the Galaxy");
  });

  it("should get a book by id", async () => {
    const response = await request(app)
      .get(`/api/books/${createdBook.id}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdBook.id);
  });

  it("should update a book by id", async () => {
    const updatedTitle = "The Hitchhiker's Guide";
    const response = await request(app)
      .put(`/api/books/${createdBook.id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ title: updatedTitle });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTitle);
  });

  it("should delete a book by id", async () => {
    const response = await request(app)
      .delete(`/api/books/${createdBook.id}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdBook.id);

    const checkDelete = await request(app)
      .get(`/api/books/${createdBook.id}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(checkDelete.status).toBe(404);
  });
});
