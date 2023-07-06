import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  version: number; // integer number, increments on update

  @IsNumber()
  @IsOptional()
  createdAt: number; // timestamp of creation

  @IsNumber()
  @IsOptional()
  updatedAt: number;
}
