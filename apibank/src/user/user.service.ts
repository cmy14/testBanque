import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, IUser } from 'src/interface/interface';
import { UsersRepositoryService } from 'src/repositories/users_repository/users_repository.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UsersRepositoryService) {}
  async delete(id: string): Promise<IUser> {
    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      this.logger.error(error);
      throw new Error('not deleted');
    }
  }
  async get(id: string): Promise<IUser> {
    try {
      return await this.userRepository.getUserById(id);
    } catch (error) {
      this.logger.error(error);
      throw new Error('not found');
    }
  }
  async getPaginate(page: number, itemsPerPage: number): Promise<IUser[]> {
    try {
      if (itemsPerPage == 0 && page == 0) {
        return await this.userRepository.getAllUsers();
      }
      return await this.userRepository.getUsers(page, itemsPerPage);
    } catch (error) {
      this.logger.error(error);
      throw new Error(' not found');
    }
  }
  async update(user: IUser): Promise<IUser> {
    try {
      return await this.userRepository.updateUser(
        user.id,
        user as CreateUserDto,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('Method not implemented.');
    }
  }
  async create(user: CreateUserDto): Promise<IUser> {
    try {
      return await this.userRepository.createUser(user);
    } catch (error) {
      this.logger.error(error);
      throw new Error('not create');
    }
  }
}
