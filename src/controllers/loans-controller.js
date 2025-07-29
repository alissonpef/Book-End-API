const booksModel = require("../models/books-model")
const loansModel = require("../models/loans-model")
const HttpError = require("../errors/HttpError")

module.exports = {
  index: (req, res) => {
    const loans = loansModel.getAllLoans()
    res.json(loans)
  },
  show: (req, res, next) => {
    try {
      const { id } = req.params
      const loan = loansModel.getLoanById(id)
      if (!loan) throw new HttpError(404, 'Empréstimo não encontrado!')
      res.json(loan)
    } catch (error) {
      next(error)
    }
  },
  save: (req, res, next) => {
    try {
      const user = req.user
      const { bookId } = req.body
      if (typeof bookId !== 'string') throw new HttpError(400, 'ID de livro inválido!')
      const book = booksModel.getBookById(bookId)
      if (!book) throw new HttpError(404, 'Livro não encontrado!')
      const newLoan = loansModel.createLoan(user, book)
      res.status(201).json(newLoan)
    } catch (error) {
      next(error)
    }
  },
  return: (req, res, next) => {
    try {
      const { id } = req.params
      const loan = loansModel.returnLoan(id)
      res.json(loan)
    } catch (error) {
      next(error)
    }
  }
}