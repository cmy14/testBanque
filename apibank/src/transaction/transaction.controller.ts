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
import { TransactionService } from './transaction.service';
import {
  CreateTransactionDto,
  ITransaction,
  
} from 'src/interface/interface';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create  account' })
  @ApiResponse({
    status: 200,
    description: 'Transaction created ',
  })
  //@ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        accountSenderId: { type: 'string', example: 'IBAN14958' },
        accountRecipientId: { type: 'string', example: 'IBAN24088' },
        credit: { type: 'number', example: 1000 },
        type: { type: 'string', example: 'Deposit' },
        status: { type: 'string', example: 'InProgress' },
      },
    },
  })
  async create(
    @Body() transaction: CreateTransactionDto,
  ): Promise<ITransaction> {
    return this.transactionService.create(transaction);
  }

  @Put()
  @ApiOperation({ summary: 'update account' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated ',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '479c97b5-b589-4a72-a63c-c409fdbbc7b6' },
        accountSenderId: { type: 'string', example: 'IBAN14958' },
        accountRecipientId: { type: 'string', example: 'IBAN24088' },
        credit: { type: 'number', example: 1000 },
        type: { type: 'string', example: 'Transfer' },
        status: { type: 'string', example: 'Done' },
      },
      required: ['name', 'age'],
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Body() transaction: Partial<ITransaction>,
  ): Promise<ITransaction> {
    return await this.transactionService.update(
      transaction.id,
      transaction as CreateTransactionDto,
    );
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Nombre maximum de transaction à récupérer',
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
    description: 'Transaction found ',
  })
  async getAllTransactions(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ITransaction[]> {
    return await this.transactionService.getPaginate(page, limit);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: ' transaction',
  })
  delete(@Param('id') id: string): Promise<ITransaction> {
    return this.transactionService.delete(id);
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  get(@Param('id') id: string): Promise<ITransaction> {
    return this.transactionService.get(id);
  }
  @Get('by-iban/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async getTransactionByIban(@Param('id') id: string): Promise<ITransaction[]> {
    return await this.transactionService.getTransactionByIBan(id);
  }
}
