const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function cleanDatabase() {
  // Executa as exclusões na ordem correta para evitar erros de chave estrangeira
  await prisma.loan.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});
}

module.exports = {
  prisma,
  cleanDatabase,
};
