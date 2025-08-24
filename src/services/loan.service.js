const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllLoans() {
  return await prisma.loan.findMany({
    include: {
      user: true,
      book: true,
    },
  });
}

async function getLoanById(id) {
  return await prisma.loan.findUnique({
    where: { id: parseInt(id) },
    include: { user: true, book: true },
  });
}

async function createLoan(userId, bookId) {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(bookId) },
  });

  if (!book || book.quantityAvailable < 1) {
    throw new Error("Não há exemplares disponíveis!");
  }

  const newLoan = await prisma.loan.create({
    data: {
      userId: parseInt(userId),
      bookId: parseInt(bookId),
      returnDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      book: {
        update: {
          quantityAvailable: book.quantityAvailable - 1,
        },
      },
    },
  });

  return newLoan;
}

async function returnLoan(id) {
  const loan = await prisma.loan.findUnique({ where: { id: parseInt(id) } });

  if (!loan) {
    throw new Error("Empréstimo não encontrado!");
  }
  if (loan.returnedAt) {
    throw new Error("Este livro já foi devolvido.");
  }

  const today = new Date();
  const isLate = today > loan.returnDate;

  const updatedLoan = await prisma.loan.update({
    where: { id: parseInt(id) },
    data: {
      returnedAt: today,
      isLate,
      book: {
        update: {
          quantityAvailable: {
            increment: 1,
          },
        },
      },
    },
  });

  return updatedLoan;
}

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  returnLoan,
};
