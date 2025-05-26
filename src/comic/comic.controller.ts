/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  UploadedFile,
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ComicService } from './comic.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { FileService } from 'src/file/file.service';

@Controller('comic')
export class ComicController {
  constructor(
    private readonly comicService: ComicService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      storage: diskStorage({
        destination: './uploads', // Ensure this folder exists and is writable
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['.cbz', '.cbr'];
        const fileExt = extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(fileExt)) {
          cb(null, true);
        } else {
          cb(new Error('Only .cbz and .cbr files are allowed!'), false);
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 1024, // 20MB limit
      },
    }),
  )
  async uploadComic(@UploadedFile() file: any, @Body('name') name: string) {
    try {
      let fileToCreate = new CreateComicDto();

      if (file.originalname.includes('cbr')) {
        const extractedFile = await this.fileService.extractCbr(file);

        fileToCreate = {
          originalName: file.originalname,
          pageCount: extractedFile.pages.length,
          currentPage: 0,
          name: name,
          cover: extractedFile.pages[0],
          url: '/' + extractedFile.slug + '/' + extractedFile.pages[0],
          slug: extractedFile.slug,
          pages: extractedFile.pages,
        };
      } else {
        const extractedFile = await this.fileService.extractCbz(file);

        fileToCreate = {
          originalName: file.originalname,
          pageCount: extractedFile.pages.length,
          currentPage: 0,
          name: name,
          cover: extractedFile.pages[0],
          url: '/' + extractedFile.slug + '/' + extractedFile.pages[0],
          slug: extractedFile.slug,
          pages: extractedFile.pages,
        };
      }

      const absolutePath = path.resolve(
        __dirname,
        '..',
        '..',
        'uploads',
        file.filename,
      );
      await fs.unlink(absolutePath);

      return this.comicService.create(fileToCreate);
    } catch (ex: any) {
      console.log('ex: ', ex);
    }
  }

  @Get('/latest')
  getLatestComics() {
    return this.comicService.getLast10();
  }

  @Get()
  findAll() {
    return this.comicService.findAll();
  }

  @Delete(':id')
  removeComic(@Param('id') id: number) {
    return this.comicService.remove(id);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.comicService.findById(id);
  }

  @Patch(':id/page')
  updateCurrentPage(
    @Param('id') id: number,
    @Body() updateRequestBody: { currentPage: number },
  ) {
    return this.comicService.updateCurrentPage(
      id,
      updateRequestBody.currentPage,
    );
  }
}
