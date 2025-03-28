import { PrismaClient } from './generated/client';
import crypto from 'node:crypto';
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: Array.from({ length: 10 }, (_, i) => ({
      id: crypto.randomUUID(),
      username: `user${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 2 === 0 ? 'Admin' : 'User',
      job: i % 2 === 0 ? 'Developer' : 'Designer',
    })),
  });

  // Get all users
  const allUsers = await prisma.user.findMany();

  // Seed Accounts
  const accounts = await prisma.account.createMany({
    data: allUsers.map((user, i) => ({
      iban: `IBAN${i + 1}${Math.floor(Math.random() * 10000)}`,
      userId: user.id,
      balance: Math.floor(Math.random() * 10000),
      type: 'CurrentAccount',
    })),
  });

  // Get all accounts
  const allAccounts = await prisma.account.findMany();

  // Seed Beneficiaries
  await prisma.beneficiary.createMany({
    data: allUsers.map((user, i) => ({
      iban: `BENEF${i + 1}${Math.floor(Math.random() * 10000)}`,
      status: i % 2 === 0 ? 'Active' : 'Inactive',
      userId: user.id,
    })),
  });

  // Seed Transactions
  await prisma.transaction.createMany({
    data: Array.from({ length: 10 }, () => {
      const sender =
        allAccounts[Math.floor(Math.random() * allAccounts.length)];
      let recipient =
        allAccounts[Math.floor(Math.random() * allAccounts.length)];
      while (recipient.iban === sender.iban) {
        recipient = allAccounts[Math.floor(Math.random() * allAccounts.length)];
      }
      return {
        id: crypto.randomUUID(),
        accountSenderId: sender.iban,
        accountRecipientId: recipient.iban,
        credit: Math.floor(Math.random() * 5000),
        status: 'Done',
        type: 'Transfer',
      };
    }),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
