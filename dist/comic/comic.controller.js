"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComicController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const comic_service_1 = require("./comic.service");
const create_comic_dto_1 = require("./dto/create-comic.dto");
const fs_1 = require("fs");
const path = require("path");
const file_service_1 = require("../file/file.service");
let ComicController = class ComicController {
    comicService;
    fileService;
    constructor(comicService, fileService) {
        this.comicService = comicService;
        this.fileService = fileService;
    }
    async uploadComic(file, name) {
        try {
            let fileToCreate = new create_comic_dto_1.CreateComicDto();
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
            }
            else {
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
            const absolutePath = path.resolve(__dirname, '..', '..', 'uploads', file.filename);
            await fs_1.promises.unlink(absolutePath);
            return this.comicService.create(fileToCreate);
        }
        catch (ex) {
            console.log('ex: ', ex);
        }
    }
    getLatestComics() {
        return this.comicService.getLast10();
    }
    findAll() {
        return this.comicService.findAll();
    }
    removeComic(id) {
        return this.comicService.remove(id);
    }
    findById(id) {
        return this.comicService.findById(id);
    }
    updateCurrentPage(id, updateRequestBody) {
        return this.comicService.updateCurrentPage(id, updateRequestBody.currentPage);
    }
};
exports.ComicController = ComicController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowedTypes = ['.cbz', '.cbr'];
            const fileExt = (0, path_1.extname)(file.originalname).toLowerCase();
            if (allowedTypes.includes(fileExt)) {
                cb(null, true);
            }
            else {
                cb(new Error('Only .cbz and .cbr files are allowed!'), false);
            }
        },
        limits: {
            fileSize: 1024 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ComicController.prototype, "uploadComic", null);
__decorate([
    (0, common_1.Get)('/latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComicController.prototype, "getLatestComics", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComicController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ComicController.prototype, "removeComic", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ComicController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id/page'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ComicController.prototype, "updateCurrentPage", null);
exports.ComicController = ComicController = __decorate([
    (0, common_1.Controller)('comic'),
    __metadata("design:paramtypes", [comic_service_1.ComicService,
        file_service_1.FileService])
], ComicController);
//# sourceMappingURL=comic.controller.js.map