import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsEntity } from 'src/albums/entities/album.entity';
import { ArtistsEntity } from 'src/artist/entities/artists.entity';
import { TracksEntity } from 'src/track/entities/tracks.entity';
import { UsersEntity } from 'src/users/entities/users.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumsEntity,
      ArtistsEntity,
      TracksEntity,
      UsersEntity,
    ]),
  ],
  controllers: [],
  providers: [DbService],
  exports: [DbService, TypeOrmModule],
})
export class DbModule {}
