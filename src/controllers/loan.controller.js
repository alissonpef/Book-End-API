const loanService = require("../services/loan.service");

async function createLoan(req, res) {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required." });
    }

    const newLoan = await loanService.createLoan(userId, bookId);
    res.status(201).json(newLoan);
  } catch (error) {
    if (
      error.message.includes("not found") ||
      error.message.includes("No available copies")
    ) {
      return res.status(404).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: "Could not process the loan." });
  }
}

async function returnLoan(req, res) {
  try {
    const { id } = req.params;
    const returnedLoan = await loanService.returnLoan(id);
    res.status(200).json(returnedLoan);
  } catch (error) {
    if (
      error.message.includes("not found") ||
      error.message.includes("already been returned")
    ) {
      return res.status(404).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: "Could not process the return." });
  }
}

module.exports = {
  createLoan,
  returnLoan,
};
