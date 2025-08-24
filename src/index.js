const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Rota de teste para verificar se a API está no ar
app.get("/", (req, res) => {
  res.send("<h1>Book-end API está funcionando! 🚀</h1>");
});

// Rota para CRIAR um novo livro
app.post("/books", async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res
        .status(400)
        .json({ error: "Título e autor são obrigatórios." });
    }
    const newBook = await prisma.book.create({
      data: { title, author },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Não foi possível criar o livro." });
  }
});

// Rota para LER todos os livros
app.get("/books", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Não foi possível buscar os livros." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
