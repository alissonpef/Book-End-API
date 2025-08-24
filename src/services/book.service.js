const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createBook(bookData) {
  return await prisma.book.create({
    data: bookData,
  });
}

async function getAllBooks() {
  return await prisma.book.findMany();
}

module.exports = {
  createBook,
  getAllBooks,
};
