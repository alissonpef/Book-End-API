const { Router } = require("express");
const bookController = require("../controllers/book.controller");

const router = Router();

router.post("/books", bookController.createBook);
router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBookById);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

module.exports = router;
