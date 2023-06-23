import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../models/db.service';
import { Inject } from '@nestjs/common/decorators';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DbService) private db: DbService,
  ) {}

  async getAll() {
    return (await this.db.users.find()).map((el) => {
      const { password, ...res } = el;
      return res;
    });
  }

  async getOneById(id: string) {
    const user = (await this.db.users.findOneBy({ id }));
    if(!user) {
      return undefined
    }
    const {password, ...res} = user;
    return res;
  }

  async create(dto: CreateUserDto) {
    const now = Date.now().toString();
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    } as UsersEntity;
    const user = this.db.users.create(newUser);
    const userne = await this.db.users.save(user);
    const { password, ...res } = newUser;

    return {
      ...res,
      createdAt: +userne.createdAt,
      updatedAt: +userne.updatedAt,
    };
  }

  async updateOne(id: string, dto: UserUpdateDto) {
    const user = await this.db.users.findOneBy({ id });
    if (!user) {
      return undefined;
    }
    if (user.password !== dto.oldPassword) {
      return 'password';
    }
    const updUser = {
      id: user.id,
      login: user.login,
      password: dto.newPassword,
      version: ++user.version,
      createdAt: user.createdAt,
      updatedAt: new Date().getTime().toString(),
    } as UsersEntity;
    const updedUser = await this.db.users.save(updUser);
    const { password, ...res } = updedUser;
    return {
      ...res,
      createdAt: +updedUser.createdAt,
      updatedAt: +updedUser.updatedAt,
    };
  }

  async deleteUser(id: string) {
    const user = await this.db.users.findOneBy({ id });
    if (!user) {
      return undefined;
    }
    await this.db.users.delete(id);
    return true
  }
}
