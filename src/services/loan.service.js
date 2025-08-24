const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createLoan(userId, bookId) {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(bookId) },
  });

  if (!book) {
    throw new Error("Book not found.");
  }
  if (book.quantityAvailable < 1) {
    throw new Error("No available copies of this book.");
  }

  return prisma.$transaction(async (tx) => {
    await tx.book.update({
      where: { id: parseInt(bookId) },
      data: { quantityAvailable: { decrement: 1 } },
    });

    const fourteenDaysFromNow = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    const newLoan = await tx.loan.create({
      data: {
        userId: userId,
        bookId: parseInt(bookId),
        returnDate: fourteenDaysFromNow,
      },
    });

    return newLoan;
  });
}

async function returnLoan(loanId) {
  const loan = await prisma.loan.findUnique({
    where: { id: parseInt(loanId) },
  });

  if (!loan) {
    throw new Error("Loan not found.");
  }
  if (loan.returnedAt) {
    throw new Error("This loan has already been returned.");
  }

  return prisma.$transaction(async (tx) => {
    await tx.book.update({
      where: { id: loan.bookId },
      data: { quantityAvailable: { increment: 1 } },
    });

    const updatedLoan = await tx.loan.update({
      where: { id: parseInt(loanId) },
      data: { returnedAt: new Date() },
    });

    return updatedLoan;
  });
}

module.exports = {
  createLoan,
  returnLoan,
};
