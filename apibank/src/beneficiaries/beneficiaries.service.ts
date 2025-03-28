import { Injectable, Logger } from '@nestjs/common';
import { CreateBeneficiaryDto, IBeneficiary } from 'src/interface/interface';
import { BeneficiariesRepositoryService } from 'src/repositories/beneficiaries_repository/beneficiaries_repository.service';

@Injectable()
export class BeneficiariesService {
  private readonly logger = new Logger(BeneficiariesService.name);
  constructor(
    private readonly beneficiaryRepositoryService: BeneficiariesRepositoryService,
  ) {}

  async delete(id: string): Promise<IBeneficiary> {
    try {
      return await this.beneficiaryRepositoryService.deleteBeneficiary(+id);
    } catch (error) {
      this.logger.error(error);
      throw new Error('not deleted');
    }
  }
  async getPaginate(
    page: number,
    itemsPerPage: number,
  ): Promise<IBeneficiary[]> {
    try {
      if (itemsPerPage !== 0 && page !== 0) {
        return await this.beneficiaryRepositoryService.getAllBeneficiaries();
      }
      return await this.beneficiaryRepositoryService.getBeneficiaries(
        page,
        itemsPerPage,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error(' not found');
    }
  }
  async update(beneficiariy: IBeneficiary): Promise<IBeneficiary> {
    try {
      return await this.beneficiaryRepositoryService.updateBeneficiary(
        beneficiariy.id,
        beneficiariy as CreateBeneficiaryDto,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('Method not implemented.');
    }
  }
  async create(beneficiariy: CreateBeneficiaryDto): Promise<IBeneficiary> {
    try {
      return await this.beneficiaryRepositoryService.createBeneficiary(
        beneficiariy,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('not create');
    }
  }

  async get(id: string): Promise<IBeneficiary> {
    try {
      return await this.beneficiaryRepositoryService.getBeneficiaryById(+id);
    } catch (error) {
      this.logger.error(error);
      throw new Error(` beneficiary ${id} not found`);
    }
  }
  async getBeneficiariesByUserId(userId: string): Promise<IBeneficiary[]> {
    try {
      return await this.beneficiaryRepositoryService.getBeneficiaryByUserId(
        userId,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
