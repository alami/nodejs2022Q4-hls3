import { Inject, Injectable } from '@nestjs/common';
import { AlbumsDto } from './dto/albums.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album, Track } from '../models/interfaces';
import { DbService } from '../models/db.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(DbService) private db: DbService,
  ) {}

  getAll() {
    return this.db.albums.find();
  }

  getOneById(id: string) {
    const album = this.db.albums.findOne({where: {id}});
    if(!album) return undefined
    return album;
  }

  async create(dto: AlbumsDto) {
    const newAlbum = { id: uuidv4(), ...dto } as Album;
    const artist = await this.db.artists.findOne({where: {id: dto.artistId}});
    if (artist === undefined && dto.artistId !== null) {
      return undefined;
    }
    const album = this.db.albums.create(newAlbum);
    return this.db.albums.save(album);

  }

  async updateOne(id: string, dto: AlbumsDto) {
    const album =  await this.db.albums.findOne({where: {id}});
    if (!album) {
      return album;
    }
    const artist = await this.db.artists.findOne({where: {id: dto.artistId}});
    if (!artist && dto.artistId !== null) {
      return undefined;
    }
    const updAlbum = { ...album, ...dto } as Album;
    return await this.db.albums.save(updAlbum);
  }

  async deleteAlbum(id: string) {
    const album = await  this.db.albums.findOne({where: {id}});
    if (!album) {
      return undefined;
    }

    const favAlbumIndex = this.db.favorites.albums.findIndex(
        (el) => el.id === album.id,
    );
    if (favAlbumIndex !== -1) {
      this.db.favorites.albums.splice(favAlbumIndex, 1);
    }
    const track = await this.db.tracks.findOne({where:{albumId: id}})
    if (track) {
      const obj = { ...track, albumId: null } as Track;
      await this.db.tracks.save(obj);
    }
    await this.db.albums.delete(id);
    return true
  }
}
