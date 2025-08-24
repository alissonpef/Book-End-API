const loanService = require("../services/loan.service");

async function getAllLoans(req, res) {
  try {
    const loans = await loanService.getAllLoans();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch loans." });
  }
}

async function getLoanById(req, res) {
  try {
    const { id } = req.params;
    const loan = await loanService.getLoanById(id);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found." });
    }
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch the loan." });
  }
}

async function createLoan(req, res) {
  try {
    const { userId, bookId } = req.body;
    const newLoan = await loanService.createLoan(userId, bookId);
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function returnLoan(req, res) {
  try {
    const { id } = req.params;
    const returnedLoan = await loanService.returnLoan(id);
    res.json(returnedLoan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  returnLoan,
};
