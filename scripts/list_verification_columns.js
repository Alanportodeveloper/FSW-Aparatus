/* eslint-disable */
const { PrismaClient } = require("../app/generated/prisma/client");
const prisma = new PrismaClient();

async function main() {
  const cols =
    await prisma.$queryRaw`SELECT column_name,data_type FROM information_schema.columns WHERE table_name='verification' ORDER BY ordinal_position`;
  console.log(cols);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
