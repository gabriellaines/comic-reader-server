/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// file.service.ts
import { Injectable } from '@nestjs/common';
import * as unzipper from 'unzipper';
import * as fs from 'fs';
import * as path from 'path';
import * as unrar from 'node-unrar-js';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  async extractCbr(file: any) {
    const fileSlug = uuid.v4();
    const outputDir = path.join('extracted', fileSlug);

    const extractor = await unrar.createExtractorFromFile({
      filepath: file.path,
      targetPath: outputDir,
    });

    // Extract the files
    [...extractor.extract().files];

    return {
      slug: fileSlug,
      pages: fs
        .readdirSync(outputDir, 'utf8')
        .filter((page: string) => page.includes('.jpg')),
    };
  }

  async extractCbz(file: any) {
    const fileSlug = uuid.v4();
    const outputDir = path.join('extracted', fileSlug);

    fs.mkdirSync(outputDir, { recursive: true });

    await fs
      .createReadStream(file.path)
      .pipe(unzipper.Parse())
      .on('entry', function (entry) {
        const entryPath = entry.path;
        const fullPath = path.join(outputDir, path.basename(entryPath));

        // Skip directories
        if (entry.type === 'Directory') {
          fs.mkdirSync(fullPath, { recursive: true });
          entry.autodrain();
        } else {
          // Ensure parent directory exists
          fs.mkdirSync(path.dirname(fullPath), { recursive: true });

          entry.pipe(fs.createWriteStream(fullPath));
        }
      })
      .promise();

    return {
      slug: fileSlug,
      pages: fs
        .readdirSync(outputDir, 'utf8')
        .filter((page: string) => page.includes('.jpg')),
    };
  }
}
