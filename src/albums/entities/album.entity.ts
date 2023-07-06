import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class AlbumsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string;
}
