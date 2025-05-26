import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComicModule } from './comic/comic.module';
import { Comic } from './comic/entities/comic.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// postgresql://comics_owner:npg_js98FEZMmYuV@ep-dark-morning-acr1lc7l-pooler.sa-east-1.aws.neon.tech/comics?sslmode=require
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-dark-morning-acr1lc7l-pooler.sa-east-1.aws.neon.tech',
      port: 5432,
      password: 'npg_js98FEZMmYuV',
      username: 'comics_owner',
      entities: [Comic],
      database: 'comics',
      synchronize: true,
      logging: true,
      ssl: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'extracted'),
      serveRoot: '/static-comic',
    }),
    ComicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
