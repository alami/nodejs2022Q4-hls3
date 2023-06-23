import { Repository } from 'typeorm';
import { AlbumsEntity } from 'src/albums/entities/album.entity';
import { ArtistsEntity } from 'src/artist/entities/artists.entity';
import { TracksEntity } from 'src/track/entities/tracks.entity';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

// Artist (with attributes)
export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

// Track (with attributes)
export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

// Album (with attributes):
export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

// Favorites (with attributes):
export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface Favarite {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}

export interface FavRepoInterface {
  artists: Repository<ArtistsEntity>;
  albums: Repository<AlbumsEntity>;
  tracks: Repository<TracksEntity>;
}
