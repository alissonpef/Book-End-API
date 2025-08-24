const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllLoans() {
  return await prisma.loan.findMany({
    include: {
      user: { select: { name: true, email: true } },
      book: { select: { title: true, author: true } },
    },
  });
}

async function getLoanById(id) {
  return await prisma.loan.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      user: { select: { name: true, email: true } },
      book: { select: { title: true, author: true } },
    },
  });
}

async function createLoan(userId, bookId) {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(bookId) },
  });

  if (!book || book.quantityAvailable < 1) {
    throw new Error("Book not available.");
  }

  const newLoan = await prisma.loan.create({
    data: {
      loanDate: new Date(),
      returnDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      userId: parseInt(userId),
      bookId: parseInt(bookId),
    },
  });

  await prisma.book.update({
    where: { id: parseInt(bookId) },
    data: { quantityAvailable: { decrement: 1 } },
  });

  return newLoan;
}

async function returnLoan(id) {
  const loan = await prisma.loan.findUnique({
    where: { id: parseInt(id) },
  });

  if (!loan) {
    throw new Error("Loan not found.");
  }

  if (loan.returnedAt) {
    throw new Error("Book already returned.");
  }

  const updatedLoan = await prisma.loan.update({
    where: { id: parseInt(id) },
    data: {
      returnedAt: new Date(),
    },
  });

  await prisma.book.update({
    where: { id: loan.bookId },
    data: { quantityAvailable: { increment: 1 } },
  });

  return updatedLoan;
}

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  returnLoan,
};
