import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getartists() {
    return await this.artistsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getartist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const artist = await this.artistsService.getOneById(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createartist(@Body(new ValidationPipe()) createartistDto: ArtistDto) {
    const art = await this.artistsService.create(createartistDto);
    if (art === undefined) {
      throw new NotFoundException();
    }
    return art;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateartist(
    @Body(new ValidationPipe()) artistDto: ArtistDto,
    @Param(
        'id',
        new ParseUUIDPipe({
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
          version: '4',
        }),
    )
        id: string,
  ) {
    const artist = await this.artistsService.updateOne(id, artistDto);
    if (artist === undefined) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteartist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const art = await this.artistsService.deleteArtist(id);
    if (!art) {
      throw new NotFoundException();
    }
    return art;
  }
}
