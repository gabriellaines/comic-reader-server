import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  slug: string;

  @Column({ type: 'varchar', length: 250 })
  originalName: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  name: string;

  @Column({ type: 'int' })
  pageCount: number;

  @Column({ type: 'int' })
  currentPage: number;

  @Column({ type: 'varchar', length: 500 })
  cover: string;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column('text', { array: true, nullable: true })
  pages: string[];
}
