import { Inject, Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist, Track } from '../models/interfaces';
import { DbService } from '../models/db.service';
import { AlbumsEntity } from '../albums/entities/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(DbService) private db: DbService,
  ) {}

  async getAll() {
    return await this.db.artists.find();
  }

  async getOneById(id: string) {
    return await this.db.artists.findOne({where:{id}});
  }

  create({ grammy, name }: ArtistDto) {
    const newArtist = {
      id: uuidv4(),
      grammy,
      name,
    } as Artist;
    const artist = this.db.artists.create(newArtist);
    return this.db.artists.save(artist);

  }

  async updateOne(id: string, dto: ArtistDto) {
    const artist = await this.db.artists.findOne({where:{id}});
    if (!artist) {
      return artist;
    }
    const updArtist = { ...artist, ...dto } as Artist;
    return this.db.artists.save(updArtist);
  }

  async deleteArtist(id: string) {
    const artist = await this.db.artists.findOne({where:{id}});
    if (!artist) {
      return undefined;
    }

    const favArtInd = this.db.favorites.artists.findIndex((el) => el.id === id);
    if (favArtInd !== -1) {
      this.db.favorites.artists.splice(favArtInd, 1);
    }

    const albumInd = await this.db.albums.findOne({where:{artistId: id}});
    if (albumInd) {
      const obj = { ...albumInd, artistId: null } as AlbumsEntity;
      await this.db.albums.save(obj)
    }

    const trackInd = await this.db.tracks.findOne({where:{artistId: id}});
    if (trackInd) {
      const obj = { ...trackInd, artistId: null } as Track;

      await this.db.tracks.save(obj);
    }
    await this.db.artists.delete(id)
    return true
  }
}
