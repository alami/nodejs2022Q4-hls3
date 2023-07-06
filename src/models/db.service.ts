import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsEntity } from 'src/albums/entities/album.entity';
import { ArtistsEntity } from 'src/artist/entities/artists.entity';
import { TracksEntity } from 'src/track/entities/tracks.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DbService {
  public users:Repository<UsersEntity>;
  public artists: Repository<ArtistsEntity>;
  public tracks: Repository<TracksEntity>;
  public albums: Repository<AlbumsEntity>;
  public favorites: {
    artists: ArtistsEntity[],
    albums: AlbumsEntity[],
    tracks: TracksEntity[],
  };
  constructor(
      @InjectRepository(UsersEntity)
      public usersRepository: Repository<UsersEntity>,
      @InjectRepository(TracksEntity)
      private trackRepo: Repository<TracksEntity>,
      @InjectRepository(ArtistsEntity)
      private artistRepo: Repository<ArtistsEntity>,
      @InjectRepository(AlbumsEntity)
      private albumRepo: Repository<AlbumsEntity>,
  ){}
  onModuleInit() {
    this.users = this.usersRepository;
    this.tracks = this.trackRepo;
    this.artists = this.artistRepo;
    this.albums = this.albumRepo;
    this.favorites = {
      tracks: [],
      artists: [],
      albums: [],
    }
  }
}
