const { Router } = require("express");
const bookRoutes = require("./book.routes");
const loanRoutes = require("./loan.routes");

const router = Router();

router.use(bookRoutes);
router.use(loanRoutes);

module.exports = router;
