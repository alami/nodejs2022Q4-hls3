import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ArtistsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
