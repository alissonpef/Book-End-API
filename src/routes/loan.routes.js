const { Router } = require("express");
const loanController = require("../controllers/loan.controller");

const router = Router();

router.get("/loans", loanController.getAllLoans);
router.get("/loans/:id", loanController.getLoanById);
router.post("/loans", loanController.createLoan);
router.post("/loans/:id/return", loanController.returnLoan);

module.exports = router;
