import { Injectable, Logger } from '@nestjs/common';
import {
  CreateTransactionDto,
  ITransaction,
  StatusTransactions,
  TypeTransactions,
} from 'src/interface/interface';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsRepositoryService {
  private readonly logger = new Logger(TransactionsRepositoryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto): Promise<ITransaction> {
    try {
      const resultat = await this.prisma.transaction.create({ data });
      return {
        ...resultat,
        type: resultat.type as TypeTransactions,
        status: resultat.status as StatusTransactions,
      };
    } catch (error) {
      this.logger.error(`Transaction not created`);
      this.logger.error(error);
      throw new Error('transaction not created');
    }
  }

  async getAllTransactions(): Promise<ITransaction[]> {
    let resultatArray = await this.prisma.transaction.findMany({});
    return resultatArray.map((transaction) => ({
      ...transaction,
      type: transaction.type as TypeTransactions,
      status: transaction.status as StatusTransactions,
    }));
  }
  async getTransactions(page: number, limit: number): Promise<ITransaction[]> {
    let resultatArray = await this.prisma.transaction.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return resultatArray.map((transaction) => ({
      ...transaction,
      type: transaction.type as TypeTransactions,
      status: transaction.status as StatusTransactions,
    }));
  }
  async getTransactionById(id: string): Promise<ITransaction | null> {
    try {
      const resultat = await this.prisma.transaction.findUnique({
        where: { id },
      });
      return {
        ...resultat,
        type: resultat.type as TypeTransactions,
        status: resultat.status as StatusTransactions,
      };
    } catch (error) {
      this.logger.error(`not found `);
      throw new Error('transaction not found ');
    }
  }

  async updateTransaction(
    id: string,
    data: Partial<ITransaction>,
  ): Promise<ITransaction> {
    try {
      const resultat = await this.prisma.transaction.update({
        where: { id },
        data,
      });
      return {
        ...resultat,
        type: resultat.type as TypeTransactions,
        status: resultat.status as StatusTransactions,
      };
    } catch (error) {
      this.logger.error(`Transaction not updated `);
      throw new Error('transaction not updated  ');
    }
  }

  async deleteTransaction(id: string): Promise<ITransaction> {
    try {
      const resultat = await this.prisma.transaction.delete({ where: { id } });

      return {
        ...resultat,
        type: resultat.type as TypeTransactions,
        status: resultat.status as StatusTransactions,
      };
    } catch (error) {
      this.logger.error(` not delete  `);
      throw new Error('transaction not deleted');
    }
  }
  async findTransactionsByIban(iban: string): Promise<ITransaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [{ accountSenderId: iban }, { accountRecipientId: iban }],
      },
    });
    return transactions.map((transaction) => ({
      ...transaction,
      type: transaction.type as TypeTransactions,
      status: transaction.status as StatusTransactions,
    }));
  }
  async getLastTransaction(iban: string): Promise<ITransaction> {
    try {
      const transaction = await this.prisma.transaction.findFirst({
        where: {
          OR: [{ accountSenderId: iban }, { accountRecipientId: iban }],
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          accountSenderId: true,
          accountRecipientId: true,
          credit: true,
          status: true,
          type: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return {
        ...transaction,
        type: transaction.type as TypeTransactions,
        status: transaction.status as StatusTransactions,
      };
    } catch (error) {}
  }
}
