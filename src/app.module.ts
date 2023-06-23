import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './albums/albums.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DbModule } from './models/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/entities/users.entity';
import { TracksEntity } from './track/entities/tracks.entity';
import { AlbumsEntity } from './albums/entities/album.entity';
import { ArtistsEntity } from './artist/entities/artists.entity';

@Module({
  imports: [
    UsersModule,
    DbModule,
    ArtistModule,
    AlbumsModule,
    TrackModule,
    FavoritesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: Number(process.env.POSTGRES_DEFAULT_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PW,
      database: process.env.POSTGRES_DB,
      entities: [UsersEntity, TracksEntity, AlbumsEntity, ArtistsEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
