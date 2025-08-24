const { Router } = require("express");
const bookController = require("../controllers/book.controller");
const loanController = require("../controllers/loan.controller");
const { ensureAuth } = require("../middlewares/auth.middleware");

const router = Router();
router.use(ensureAuth);

router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", bookController.createBook);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

router.get("/loans", loanController.getAllLoans);
router.get("/loans/:id", loanController.getLoanById);
router.post("/loans", loanController.createLoan);
router.post("/loans/:id/return", loanController.returnLoan);

module.exports = router;
