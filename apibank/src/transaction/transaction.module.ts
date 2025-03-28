import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  providers: [TransactionService],
  imports: [RepositoriesModule, AccountModule],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
