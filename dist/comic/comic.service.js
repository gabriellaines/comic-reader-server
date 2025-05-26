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
exports.ComicService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comic_entity_1 = require("./entities/comic.entity");
const typeorm_2 = require("typeorm");
let ComicService = class ComicService {
    comicRepository;
    constructor(comicRepository) {
        this.comicRepository = comicRepository;
    }
    create(createComicDto) {
        return this.comicRepository.save(createComicDto);
    }
    findAll() {
        return this.comicRepository.find();
    }
    findById(id) {
        return this.comicRepository.findOneBy({ id });
    }
    remove(id) {
        return this.comicRepository.delete(id);
    }
    updateCurrentPage(id, currentPage) {
        return this.comicRepository.update({ id }, { currentPage });
    }
    async getLast10() {
        return this.comicRepository.find({
            order: { id: 'DESC' },
            take: 10,
        });
    }
};
exports.ComicService = ComicService;
exports.ComicService = ComicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comic_entity_1.Comic)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ComicService);
//# sourceMappingURL=comic.service.js.map