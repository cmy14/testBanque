import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Query,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CreateUserDto, IUser } from 'src/interface/interface';
import { AccountService } from 'src/account/account.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create  user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'semmy guiose' },
        job: { type: 'string', example: 'developer' },
        email: { type: 'string', example: 'semmyguiose@gmail.com' },
        role: { type: 'string', example: 'user' },
      },
      required: ['name', 'age'],
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() user: CreateUserDto): Promise<IUser> {
    return this.userService.create(user);
  }

  @Put()
  @ApiOperation({ summary: 'update account' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '86a29c26-5188-4127-80dd-31bd6aa158c7' },
        username: { type: 'string', example: 'semmy guiose' },
        job: { type: 'string', example: 'developer' },
        email: { type: 'string', example: 'semmyguiose@gmail.com' },
        role: { type: 'string', example: 'user' },
      },
      required: ['name', 'age'],
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(@Body() user: IUser): Promise<IUser> {
    return await this.userService.update(user);
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
  ): Promise<IUser[]> {
    return await this.userService.getPaginate(+page, +limit);
  }

  @Delete('delete/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async delete(@Param('id') id: string): Promise<IUser> {
    await this.accountService.deleteMany(id);
    return await this.userService.delete(id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async get(@Param('id') id: string): Promise<IUser> {
    return await this.userService.get(id);
  }
}
