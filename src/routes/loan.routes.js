const { Router } = require("express");
const loanController = require("../controllers/loan.controller");
const { ensureAuth } = require("../middlewares/auth.middleware");

const router = Router();

router.use(ensureAuth);

router.post("/loans", loanController.createLoan);
router.post("/loans/:id/return", loanController.returnLoan);

module.exports = router;
