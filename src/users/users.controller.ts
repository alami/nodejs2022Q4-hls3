import { UserUpdateDto } from './dto/user-update.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return await this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.getOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Body(new ValidationPipe()) updateUserDto: UserUpdateDto,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.updateOne(id, updateUserDto);
    if (user === undefined) {
      throw new NotFoundException();
    } else if (user === 'password') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.deleteUser(id);
    if (user === undefined) {
      throw new NotFoundException();
    }
  }
}
