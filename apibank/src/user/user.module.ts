import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  providers: [UserService],
  imports: [RepositoriesModule, forwardRef(() => AccountModule)],
  controllers: [UserController],
})
export class UserModule {}
