import { Inject, Injectable } from '@nestjs/common';
import { TracksDto } from './dto/tracks.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../models/db.service';
import { TracksEntity } from './entities/tracks.entity';

@Injectable()
export class TracksService {
  constructor(@Inject(DbService) private db: DbService) {}

  getAll() {
    return this.db.tracks.find();
  }

  getOneById(id: string) {
    return this.db.tracks.findOne({ where: { id } });
  }

  async create(dto: TracksDto) {
    const newtrack = { id: uuidv4(), ...dto } as TracksEntity;
    const art = this.db.artists.findOne({ where: { id: dto.artistId } });
    const album = this.db.albums.findOne({ where: { id: dto.albumId } });

    if (album === undefined && dto.albumId !== null) {
      return undefined;
    }

    if (art === undefined && dto.artistId !== null) {
      return undefined;
    }
    const track = this.db.tracks.create(newtrack);
    return this.db.tracks.save(track);
  }

  async updateOne(id: string, dto: TracksDto) {
    const track = await this.db.tracks.findOne({ where: { id } });

    const art = this.db.artists.findOne({ where: { id: dto.artistId } });
    const album = this.db.albums.findOne({ where: { id: dto.albumId } });
    if (!album && dto.albumId !== null) {
      return undefined;
    }
    if (!art && dto.artistId !== null) {
      return undefined;
    }
    if (!track) {
      return undefined;
    }
    const updTrack = { ...track, ...dto } as TracksEntity;
    return this.db.tracks.save(updTrack);
  }

  async deleteTrack(id: string) {
    const track = await this.db.tracks.findOne({ where: { id } });
    if (!track) {
      return undefined;
    }
    const ind = this.db.favorites.tracks.findIndex((el) => el.id === id);
    if (ind !== -1) {
      this.db.favorites.tracks.splice(ind, 1);
    }
    await this.db.tracks.delete(id);
    return true
  }
}
