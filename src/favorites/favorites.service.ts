import { Inject, Injectable } from '@nestjs/common';
import { DbService } from '../models/db.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
      @Inject(DbService) private db: DbService
  ) {}

  getAll() {
    return this.db.favorites;
  }

  async createTrackById(id: string) {
    const track = await this.db.tracks.findOne({where: {id}});
    if (!track) {
      return undefined;
    }
    this.db.favorites.tracks.push(track);
    return track
  }

  async deleteTrackById(id: string) {
    const trackInd = this.db.favorites.tracks.findIndex((el) => el.id === id);
    if (trackInd === -1) {
      return undefined;
    }
    return this.db.favorites.tracks.splice(trackInd, 1);
  }

  async createAlbumById(id: string) {
    const album = await this.db.albums.findOne({where: {id}});
    if (!album) {
      return undefined;
    }
    this.db.favorites.albums.push(album);
    return album;
  }

  async deleteAlbumById(id: string) {
    const albums = this.db.favorites.albums.findIndex((el) => el.id === id);
    if (albums === -1) {
      return undefined;
    }
    return this.db.favorites.albums.splice(albums, 1);
  }

  async createArtistById(id: string) {
    const artist = await this.db.artists.findOne({where: {id}});
    if (!artist) {
      return undefined;
    }
    this.db.favorites.artists.push(artist);
    return artist;
  }

  async deleteArtistById(id: string) {
    const artists = this.db.favorites.artists.findIndex((el) => el.id === id);
    if (artists === -1) {
      return undefined;
    }
    return this.db.favorites.artists.splice(artists, 1);
  }
}
