import { Module } from '@nestjs/common';
import { ArtistsController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
