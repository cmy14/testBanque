import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { AccountModule } from './account/account.module';

import { RepositoriesModule } from './repositories/repositories.module';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    TransactionModule,
    AccountModule,
    RepositoriesModule,
    BeneficiariesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
