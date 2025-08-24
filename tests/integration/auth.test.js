const request = require("supertest");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authRoutes = require("../../src/routes/auth.routes");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(authRoutes);

// Variáveis de teste
const testUser = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
};

beforeAll(async () => {
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
});

describe("Auth Routes", () => {
  describe("POST /auth/register", () => {
    it("should register a new user successfully", async () => {
      const response = await request(app).post("/auth/register").send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(testUser.name);
      expect(response.body.email).toBe(testUser.email);
      expect(response.body).not.toHaveProperty("password");
    });

    it("should return 400 if email is already registered", async () => {
      const response = await request(app).post("/auth/register").send(testUser);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("User with this email already exists.");
    });
  });

  describe("POST /auth/login", () => {
    it("should login the user and return a JWT", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ email: testUser.email, password: testUser.password });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return 401 for incorrect password", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ email: testUser.email, password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Invalid credentials.");
    });

    it("should return 401 for non-existent user", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ email: "nouser@example.com", password: "somepassword" });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Invalid credentials.");
    });
  });
});
