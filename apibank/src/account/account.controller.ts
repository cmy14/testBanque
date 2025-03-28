import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Query,
  Logger,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto, IAccount } from 'src/interface/interface';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Create  account' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        iban: { type: 'string', example: 'IBAN14958' },
        userId: {
          type: 'string',
          example: 'c6294aef-b5d4-4d33-8906-430e2df4d6c6',
        },
        balance: { type: 'number', example: 10000000 },
        type: { type: 'string', example: 'BusinessAccount' },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() account: CreateAccountDto): Promise<IAccount> {
    return this.accountService.create(account);
  }

  @Put()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        iban: { type: 'string', example: 'IBAN14958' },
        userId: {
          type: 'string',
          example: 'c6294aef-b5d4-4d33-8906-430e2df4d6c6',
        },
        balance: { type: 'number', example: 100 },
        type: { type: 'string', example: 'BusinessAccount' },
      },
    },
  })
  @ApiOperation({ summary: 'update account' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(@Body() account: Partial<IAccount>): Promise<IAccount> {
    return this.accountService.update(account);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<IAccount[]> {
    return this.accountService.getPaginate(page, limit);
  }

  @Delete('delete/:id')
  @ApiResponse({
    status: 200,
    description: ' account deletes',
  })
  delete(@Param('id') id: string): Promise<IAccount> {
    return this.accountService.delete(id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  get(@Param('id') id: string): Promise<IAccount> {
    return this.accountService.get(id);
  }
  @Get('by-user-id/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async getByUserId(@Param('id') id: string): Promise<IAccount[]> {
    return this.accountService.getAccountsByUserId(id);
  }
}
