import { Injectable, Logger } from '@nestjs/common';

import {
  CreateAccountDto,
  IAccount,
  TypeAccount,
} from 'src/interface/interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsRepositoryService {
  private readonly logger = new Logger(AccountsRepositoryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(data: CreateAccountDto): Promise<IAccount> {
    let result = await this.prisma.account.create({ data });
    return { ...result, type: result.type as TypeAccount };
  }
  async getAccounts(page: number, limit: number): Promise<IAccount[]> {
    const { skip, take } = this.getPaginationOptions(page, limit);
    const accounts = await this.prisma.account.findMany({
      skip,
      take,
    });

    return accounts.map((account) => ({
      ...account,
      type: account.type as TypeAccount,
    }));
  }
  async getAllAccounts(): Promise<IAccount[]> {
    const accounts = await this.prisma.account.findMany({});

    return accounts.map((account) => ({
      ...account,
      type: account.type as TypeAccount,
    }));
  }

  private getPaginationOptions(
    page: number,
    limit: number,
  ): { skip: number; take: number } {
    return { skip: (page - 1) * limit, take: limit };
  }
  async getAccountByIban(iban: string): Promise<IAccount | null> {
    const resultat = await this.prisma.account.findUnique({ where: { iban } });

    return { ...resultat, type: resultat.type as TypeAccount };
  }

  async updateAccount(data: Partial<IAccount>): Promise<IAccount> {
    const resultat = await this.prisma.account.update({
      where: { iban: data.iban },
      data,
    });
    return { ...resultat, type: resultat.type as TypeAccount };
  }

  async getAccountByUserId(userId: string): Promise<IAccount[]> {
    const accounts = await this.prisma.account.findMany({
      where: { userId: userId },
    });
    return accounts.map((account) => ({
      ...account,
      type: account.type as TypeAccount,
    }));
  }

  async deleteAccount(iban: string): Promise<IAccount> {
    const resultat = await this.prisma.account.delete({ where: { iban } });
    return { ...resultat, type: resultat.type as TypeAccount };
  }

  async deleteMany(iban: string): Promise<number> {
    let accounts = await this.prisma.account.deleteMany({ where: { iban } });
    return accounts.count;
  }
}
