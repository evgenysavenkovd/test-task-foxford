import { faker } from '@faker-js/faker';
import { PrismaPg } from '@prisma/adapter-pg';
import argon from 'argon2';

import { Prisma, PrismaClient } from '../generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await argon.hash('123');

  const usersData: Prisma.UserCreateManyInput[] = Array(10)
    .fill(null)
    .map(() => ({
      email: faker.internet.email(),
      password: hashedPassword,
    }));

  await prisma.user.createMany({ data: usersData });

  const users = await prisma.user.findMany({
    where: { email: { in: usersData.map((i) => i.email) } },
    select: { id: true },
  });

  const tasksData: Prisma.TaskCreateManyInput[] = Array(20)
    .fill(null)
    .map(() => {
      const authorIndex = Math.floor((users.length - 1) * Math.random());
      const assigneeIndex = (authorIndex + 2) % 10;
      return {
        authorId: users[authorIndex].id,
        assigneeId: users[assigneeIndex].id,
        name: faker.lorem.words({ min: 3, max: 6 }),
        description: faker.lorem.sentences({ min: 2, max: 10 }),
      };
    });

  await prisma.task.createMany({ data: tasksData });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
