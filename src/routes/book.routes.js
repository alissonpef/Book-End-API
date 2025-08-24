// src/routes/book.routes.js
const { Router } = require("express");
const bookController = require("../controllers/book.controller");
const { ensureAuth } = require("../middlewares/auth.middleware");

const router = Router();

router.use(ensureAuth);

router.post("/books", bookController.createBook);
router.get("/books", bookController.getAllBooks);

module.exports = router;
