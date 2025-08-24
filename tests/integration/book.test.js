const request = require("supertest");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authRoutes = require("../../src/routes/auth.routes");
const bookRoutes = require("../../src/routes/book.routes");

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(authRoutes);
app.use("/api", bookRoutes);

let token;
let bookId;
const testUser = {
  name: "Book Tester",
  email: "booktester@example.com",
  password: "password123",
};

beforeAll(async () => {
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});

  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send({
    email: testUser.email,
    password: testUser.password,
  });
  token = response.body.token;
});

afterAll(async () => {
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
});

describe("Book Routes CRUD", () => {
  it("POST /api/books - should create a new book", async () => {
    const newBook = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      quantityAvailable: 5,
    };

    const response = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newBook.title);
    bookId = response.body.id;
  });

  it("GET /api/books - should return a list of books", async () => {
    const response = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /api/books/:id - should return a single book", async () => {
    const response = await request(app)
      .get(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(bookId);
    expect(response.body.title).toBe("The Lord of the Rings");
  });

  it("PUT /api/books/:id - should update a book", async () => {
    const updatedData = {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      quantityAvailable: 3,
    };

    const response = await request(app)
      .put(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.quantityAvailable).toBe(updatedData.quantityAvailable);
  });

  it("DELETE /api/books/:id - should delete a book", async () => {
    const response = await request(app)
      .delete(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);

    const getResponse = await request(app)
      .get(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(getResponse.status).toBe(404);
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/api/books");
    expect(response.status).toBe(401);
  });
});
