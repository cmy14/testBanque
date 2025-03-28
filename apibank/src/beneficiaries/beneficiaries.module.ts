import { Module } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { BeneficiariesController } from './beneficiaries.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  providers: [BeneficiariesService],
  imports: [RepositoriesModule],
  controllers: [BeneficiariesController],
})
export class BeneficiariesModule {}
