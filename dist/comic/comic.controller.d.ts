import { ComicService } from './comic.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { FileService } from 'src/file/file.service';
export declare class ComicController {
    private readonly comicService;
    private readonly fileService;
    constructor(comicService: ComicService, fileService: FileService);
    uploadComic(file: any, name: string): Promise<(CreateComicDto & import("./entities/comic.entity").Comic) | undefined>;
    getLatestComics(): Promise<import("./entities/comic.entity").Comic[]>;
    findAll(): Promise<import("./entities/comic.entity").Comic[]>;
    removeComic(id: number): Promise<import("typeorm").DeleteResult>;
    findById(id: number): Promise<import("./entities/comic.entity").Comic | null>;
    updateCurrentPage(id: number, updateRequestBody: {
        currentPage: number;
    }): Promise<import("typeorm").UpdateResult>;
}
