import { FavoritesService } from './favorites.service';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

@Controller('favs')
export class FavaritesController {
  constructor(private favService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async gettracks() {
    return await this.favService.getAll();
  }

  /* POSTS OPERATIONS */
  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrackFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const track = await this.favService.createTrackById(id);
    if (!track) {
      throw new HttpException(
        "trackId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return track;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const track = await this.favService.deleteTrackById(id);
    if (!track) {
      throw new HttpException('trackId not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  /* ALBUMS OPERATION */
  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const album = await this.favService.createAlbumById(id);
    if (!album) {
      throw new HttpException(
        "albumId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return album;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const album = await this.favService.deleteAlbumById(id);
    if (!album) {
      throw new HttpException('albumId not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  /* ARTIST OPERATION */
  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const artist = await this.favService.createArtistById(id);
    if (!artist) {
      throw new HttpException(
        "artistId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return artist;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const artist = await this.favService.deleteArtistById(id);
    if (!artist) {
      throw new HttpException('artistId not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }
}
