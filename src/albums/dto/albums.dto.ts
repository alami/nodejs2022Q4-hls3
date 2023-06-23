import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AlbumsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
