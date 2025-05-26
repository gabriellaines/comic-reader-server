import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comic } from './entities/comic.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comic])],
  controllers: [ComicController],
  providers: [ComicService, FileService],
})
export class ComicModule {}
