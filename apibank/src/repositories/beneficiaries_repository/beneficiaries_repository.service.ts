import { Injectable, Logger } from '@nestjs/common';
import { CreateBeneficiaryDto, IBeneficiary } from 'src/interface/interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BeneficiariesRepositoryService {
  private readonly logger = new Logger(BeneficiariesRepositoryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createBeneficiary(data: CreateBeneficiaryDto): Promise<IBeneficiary> {
    return this.prisma.beneficiary.create({ data });
  }

  async getBeneficiaries(page: number, limit: number): Promise<IBeneficiary[]> {
    return this.prisma.beneficiary.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  async getAllBeneficiaries(): Promise<IBeneficiary[]> {
    return this.prisma.beneficiary.findMany({});
  }

  async getBeneficiaryById(id: number): Promise<IBeneficiary | null> {
    return this.prisma.beneficiary.findUnique({ where: { id } });
  }
  async getBeneficiaryByUserId(userId: string): Promise<IBeneficiary[]> {
    try {
      return await  this.prisma.beneficiary.findMany({ where: { userId: userId } });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateBeneficiary(
    id: number,
    data: Partial<IBeneficiary>,
  ): Promise<IBeneficiary> {
    return this.prisma.beneficiary.update({ where: { id }, data });
  }

  async deleteBeneficiary(id: number): Promise<IBeneficiary> {
    return this.prisma.beneficiary.delete({ where: { id } });
  }
}
