const { Router } = require("express");
const bookController = require("../controllers/book.controller");

const router = Router();

router.post("/books", bookController.createBook);
router.get("/books", bookController.getAllBooks);

module.exports = router;
