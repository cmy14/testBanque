import { Module } from '@nestjs/common';

import { AccountsRepositoryService } from './accounts_repository/accounts_repository.service';
import { UsersRepositoryService } from './users_repository/users_repository.service';
import { TransactionsRepositoryService } from './transactions_repository/transactions_repository.service';
import { BeneficiariesRepositoryService } from './beneficiaries_repository/beneficiaries_repository.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [
    AccountsRepositoryService,
    UsersRepositoryService,
    TransactionsRepositoryService,
    BeneficiariesRepositoryService,
  ],
  imports: [PrismaModule],
  exports: [
    AccountsRepositoryService,
    UsersRepositoryService,
    TransactionsRepositoryService,
    BeneficiariesRepositoryService,
  ],
})
export class RepositoriesModule {}
