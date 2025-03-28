import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';



@Module({
  providers: [AccountService],
  exports: [AccountService],
  imports: [RepositoriesModule],
  controllers: [AccountController],
})
export class AccountModule {}
