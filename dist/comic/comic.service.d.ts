import { CreateComicDto } from './dto/create-comic.dto';
import { Comic } from './entities/comic.entity';
import { Repository } from 'typeorm';
export declare class ComicService {
    private readonly comicRepository;
    constructor(comicRepository: Repository<Comic>);
    create(createComicDto: CreateComicDto): Promise<CreateComicDto & Comic>;
    findAll(): Promise<Comic[]>;
    findById(id: number): Promise<Comic | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    updateCurrentPage(id: number, currentPage: number): Promise<import("typeorm").UpdateResult>;
    getLast10(): Promise<Comic[]>;
}
