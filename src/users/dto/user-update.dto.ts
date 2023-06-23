import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsOptional()
  login: string;

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
