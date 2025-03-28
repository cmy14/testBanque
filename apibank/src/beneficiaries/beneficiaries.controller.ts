import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBeneficiaryDto, IBeneficiary } from 'src/interface/interface';
import { BeneficiariesService } from './beneficiaries.service';

@ApiTags('beneficiaries')
@Controller('beneficiaries')
export class BeneficiariesController {
  private readonly logger = new Logger(BeneficiariesController.name);
  constructor(private readonly beneficiaireService: BeneficiariesService) {}

  @Post()
  @ApiOperation({ summary: 'Create beneficiairy' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'Done' },
        iban: { type: 'string', example: 'ibanl31010101' },
        userId: {
          type: 'string',
          example: 'c6294aef-b5d4-4d33-8906-430e2df4d6c6',
        },
      },
    },
  })
  async create(
    @Body() beneficiary: CreateBeneficiaryDto,
  ): Promise<IBeneficiary> {
    return this.beneficiaireService.create(beneficiary);
  }

  @Put()
  @ApiOperation({ summary: 'update bznzficiairy' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        iban: { type: 'strin', example: 'ibanl31010101' },
        status: { type: 'string', example: 'Done' },
        id: { type: 'number', example: 9 },
        userId: {
          type: 'string',
          example: 'c6294aef-b5d4-4d33-8906-430e2df4d6c6',
        },
      },
    },
  })
  async update(@Body() beneficiary: IBeneficiary): Promise<IBeneficiary> {
    return await this.beneficiaireService.update(beneficiary);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    description: "Nombre maximum d'utilisateurs à récupérer",
    example: 10,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Numéro de la page pour la pagination',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<IBeneficiary[]> {
    return await this.beneficiaireService.getPaginate(page, limit);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'deleted',
  })
  delete(@Param('id') id: string): Promise<IBeneficiary> {
    return this.beneficiaireService.delete(id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  get(@Param('id') id: string): Promise<IBeneficiary> {
    return this.beneficiaireService.get(id);
  }
  @Get('by-user/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async getBeneficiariesByUser(
    @Param('id') id: string,
  ): Promise<IBeneficiary[]> {
    return await this.beneficiaireService.getBeneficiariesByUserId(id);
  }
}
