import { AlbumsEntity } from 'src/albums/entities/album.entity';
import { ArtistsEntity } from 'src/artist/entities/artists.entity';
import { TracksEntity } from 'src/track/entities/tracks.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  artists: ArtistsEntity[];

  @Column()
  albums: AlbumsEntity[];

  @Column()
  tracks: TracksEntity[];
}
