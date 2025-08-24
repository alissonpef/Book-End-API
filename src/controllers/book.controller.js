const bookService = require("../services/book.service");

async function createBook(req, res) {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required." });
    }
    const newBook = await bookService.createBook({ title, author });
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the book." });
  }
}

async function getAllBooks(req, res) {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch books." });
  }
}

module.exports = {
  createBook,
  getAllBooks,
};
