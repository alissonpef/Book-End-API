const booksModel = require("../models/books-model")

module.exports = {
  index: (req, res) => {
    const books = booksModel.getAllBooks()
    res.json(books)
  },
  show: (req, res) => {
    const { id } = req.params
    const book = booksModel.getBookById(id)
    if (!book) return res.status(404).json({ message: 'Livro não encontrado!' })
    res.json(book)
  },
  save: (req, res) => {
    const { title, author, quantityAvailable } = req.body
    if (
      typeof title !== 'string' || typeof author !== 'string' || typeof quantityAvailable !== 'number'
    ) {
      return res.status(400).json({ message: 'Campos inválidos.' })
    }
    const newBook = booksModel.createBook(title, author, quantityAvailable)
    res.status(201).json(newBook)
  },
  update: (req, res, next) => {
    try {
      const { id } = req.params
      const { title, author, quantityAvailable } = req.body
      const fieldsToUpdate = {}

      if (title) fieldsToUpdate.title = title
      if (author) fieldsToUpdate.author = author
      if (typeof quantityAvailable === 'number') {
        fieldsToUpdate.quantityAvailable = quantityAvailable
      }

      const updatedBook = booksModel.updateBook(id, fieldsToUpdate)
      return res.status(200).json(updatedBook)
    } catch (error) {
      next(error)
    }
  },
  delete: (req, res, next) => {
    try {
      const { id } = req.params
      const deletedBook = booksModel.deleteBook(id)
      res.status(200).json(deletedBook)
    } catch (error) {
      next(error)
    }
  }
}