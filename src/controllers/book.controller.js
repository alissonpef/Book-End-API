const bookService = require("../services/book.service");

async function createBook(req, res) {
  try {
    const { title, author, quantityAvailable } = req.body;
    if (!title || !author || typeof quantityAvailable !== "number") {
      return res
        .status(400)
        .json({
          error:
            "Title, author, and quantityAvailable are required and must be of the correct type.",
        });
    }
    const newBook = await bookService.createBook({
      title,
      author,
      quantityAvailable,
    });
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

async function getBookById(req, res) {
  try {
    const { id } = req.params;
    const book = await bookService.getBookById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch the book." });
  }
}

async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedBook = await bookService.updateBook(id, updateData);
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found." });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the book." });
  }
}

async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.deleteBook(id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found." });
    }
    res.status(200).json(deletedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the book." });
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
