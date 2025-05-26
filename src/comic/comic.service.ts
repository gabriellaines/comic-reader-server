import { Injectable } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comic } from './entities/comic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComicService {
  constructor(
    @InjectRepository(Comic)
    private readonly comicRepository: Repository<Comic>,
  ) {}

  create(createComicDto: CreateComicDto) {
    return this.comicRepository.save(createComicDto);
  }

  findAll() {
    return this.comicRepository.find();
  }

  findById(id: number) {
    return this.comicRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.comicRepository.delete(id);
  }

  updateCurrentPage(id: number, currentPage: number) {
    return this.comicRepository.update({ id }, { currentPage });
  }

  async getLast10(): Promise<Comic[]> {
    return this.comicRepository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }
}
