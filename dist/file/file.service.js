"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const unzipper = require("unzipper");
const fs = require("fs");
const path = require("path");
const unrar = require("node-unrar-js");
const uuid = require("uuid");
let FileService = class FileService {
    async extractCbr(file) {
        const fileSlug = uuid.v4();
        const outputDir = path.join('extracted', fileSlug);
        const extractor = await unrar.createExtractorFromFile({
            filepath: file.path,
            targetPath: outputDir,
        });
        [...extractor.extract().files];
        return {
            slug: fileSlug,
            pages: fs
                .readdirSync(outputDir, 'utf8')
                .filter((page) => page.includes('.jpg')),
        };
    }
    async extractCbz(file) {
        const fileSlug = uuid.v4();
        const outputDir = path.join('extracted', fileSlug);
        fs.mkdirSync(outputDir, { recursive: true });
        await fs
            .createReadStream(file.path)
            .pipe(unzipper.Parse())
            .on('entry', function (entry) {
            const entryPath = entry.path;
            const fullPath = path.join(outputDir, path.basename(entryPath));
            if (entry.type === 'Directory') {
                fs.mkdirSync(fullPath, { recursive: true });
                entry.autodrain();
            }
            else {
                fs.mkdirSync(path.dirname(fullPath), { recursive: true });
                entry.pipe(fs.createWriteStream(fullPath));
            }
        })
            .promise();
        return {
            slug: fileSlug,
            pages: fs
                .readdirSync(outputDir, 'utf8')
                .filter((page) => page.includes('.jpg')),
        };
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map