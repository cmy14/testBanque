import { Injectable, Logger } from '@nestjs/common';
import {
  CreateAccountDto,
  IAccount,
  ITransaction,
} from 'src/interface/interface';
import { AccountsRepositoryService } from 'src/repositories/accounts_repository/accounts_repository.service';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);
  constructor(
    private readonly accountRepositoryService: AccountsRepositoryService,
    //  private readonly transactionService: TransactionService,
  ) {}
  async delete(id: string): Promise<IAccount> {
    try {
      return await this.accountRepositoryService.deleteAccount(id);
    } catch (error) {
      this.logger.error(error);
      throw new Error('not deleted');
    }
  }
  async deleteMany(id: string) {
    try {
      const accounts = await this.getAccountsByUserId(id);
      accounts.forEach(async (account) => {
        await this.accountRepositoryService.deleteAccount(account.iban);
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error('not deleted');
    }
  }
  async getPaginate(page: number, itemsPerPage: number): Promise<IAccount[]> {
    try {
      if (itemsPerPage !== 0 && page !== 0) {
        return await this.accountRepositoryService.getAllAccounts();
      }
      return await this.accountRepositoryService.getAccounts(
        page,
        itemsPerPage,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error(' not found');
    }
  }
  async update(account: Partial<IAccount>): Promise<IAccount> {
    try {
      return await this.accountRepositoryService.updateAccount(account);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Method not implemented.');
    }
  }
  async create(transaction: CreateAccountDto): Promise<IAccount> {
    try {
      return await this.accountRepositoryService.createAccount(transaction);
    } catch (error) {
      this.logger.error(error);
      throw new Error('not create');
    }
  }

  async get(id: string): Promise<IAccount> {
    try {
      return await this.accountRepositoryService.getAccountByIban(id);
    } catch (error) {
      this.logger.error(error);
      throw new Error(` transaction ${id} not found`);
    }
  }
  async getAccountsByUserId(id: string): Promise<IAccount[]> {
    try {
      return await this.accountRepositoryService.getAccountByUserId(id);
    } catch (error) {
      this.logger.error(error);
      throw new Error(`  to transaction  ${id} not found`);
    }
  }

  async updateAccount(transaction: ITransaction): Promise<boolean> {
    try {
      let accountreceveir =
        await this.accountRepositoryService.getAccountByIban(
          transaction.accountRecipientId,
        );
      let accountsender = await this.accountRepositoryService.getAccountByIban(
        transaction.accountSenderId,
      );
      accountreceveir.balance = accountreceveir.balance + transaction.credit;
      accountsender.balance = accountsender.balance - transaction.credit;
      this.update(accountreceveir);
      this.update(accountsender);
      return true;
    } catch (error) {
      this.logger.error('error');
      this.logger.error(`transaction ${transaction.id} not  done `);
      throw new Error(
        `error durind update of  credit account  watch  ${transaction.id}   `,
      );
    }
  }
}
