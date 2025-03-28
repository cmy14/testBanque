import { Injectable } from '@nestjs/common';
import { CreateUserDto, IUser } from 'src/interface/interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    return this.prisma.user.create({ data });
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.prisma.user.findMany({});
  }
  async getUsers(page: number, limit: number): Promise<IUser[]> {
    return this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<IUser> {
    return this.prisma.user.delete({ where: { id } });
  }
}
