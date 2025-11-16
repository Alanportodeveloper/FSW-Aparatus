/* eslint-disable */
const { PrismaClient } = require("../app/generated/prisma/client");
const prisma = new PrismaClient();

async function main() {
  const res =
    await prisma.$queryRaw`SELECT to_regclass('public.verification')::text as v`;
  console.log(res);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
