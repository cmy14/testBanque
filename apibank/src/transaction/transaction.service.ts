import { Injectable, Logger } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import {
  CreateTransactionDto,
  ITransaction,
  StatusTransactions,
} from 'src/interface/interface';
import { TransactionsRepositoryService } from 'src/repositories/transactions_repository/transactions_repository.service';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);
  constructor(
    private readonly transactionRepository: TransactionsRepositoryService,
    private readonly accountSevice: AccountService,
  ) {}

  async getTransactionByIBan(iban: string): Promise<ITransaction[]> {
    try {
      return await this.transactionRepository.findTransactionsByIban(iban);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async delete(id: string): Promise<ITransaction> {
    try {
      return await this.transactionRepository.deleteTransaction(id);
    } catch (error) {
      this.logger.error(error);
      throw new Error('not deleted');
    }
  }
  async getPaginate(
    page: number,
    itemsPerPage: number,
  ): Promise<ITransaction[]> {
    try {
      if (itemsPerPage !== 0 && page !== 0) {
        return await this.transactionRepository.getAllTransactions();
      }
      return await this.transactionRepository.getTransactions(
        page,
        itemsPerPage,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error(' not found');
    }
  }
  async update(
    id: string,
    transaction: CreateTransactionDto,
  ): Promise<ITransaction> {
    try {
      return await this.transactionRepository.updateTransaction(
        id,
        transaction,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('Method not implemented.');
    }
  }
  async create(transaction: CreateTransactionDto): Promise<ITransaction> {
    let newTransaction: ITransaction;
    try {
      newTransaction =
        await this.transactionRepository.createTransaction(transaction);
      // create  update  account
      await this.accountSevice.updateAccount(newTransaction);
      newTransaction.status = StatusTransactions.Done;
      this.update(newTransaction.id, transaction);

      return newTransaction;
    } catch (error) {
      newTransaction.status = StatusTransactions.Cancelled;
      this.update(newTransaction.id, newTransaction);
      this.logger.error(error);
      throw new Error('error with new transaction ');
    }
  }

  async get(id: string): Promise<ITransaction> {
    try {
      return await this.transactionRepository.getTransactionById(id);
    } catch (error) {
      this.logger.error(error);
      throw new Error(` transaction ${id} not found`);
    }
  }
}
