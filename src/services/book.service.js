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

async function getBookById(id) {
  return await prisma.book.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}

async function updateBook(id, updateData) {
  return await prisma.book.update({
    where: {
      id: parseInt(id),
    },
    data: updateData,
  });
}

async function deleteBook(id) {
  return await prisma.book.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
