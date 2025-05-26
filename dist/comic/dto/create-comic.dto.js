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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComicDto = void 0;
const class_validator_1 = require("class-validator");
class CreateComicDto {
    originalName;
    name;
    pageCount;
    currentPage;
    cover;
    url;
    slug;
    pages;
}
exports.CreateComicDto = CreateComicDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Original Name must have at least 2 characters' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComicDto.prototype, "originalName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Name must have at least 2 characters' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComicDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateComicDto.prototype, "pageCount", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateComicDto.prototype, "currentPage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Original Name must have at least 2 characters' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComicDto.prototype, "cover", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Original Name must have at least 2 characters' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComicDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Slug must have at least 2 characters' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComicDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateComicDto.prototype, "pages", void 0);
//# sourceMappingURL=create-comic.dto.js.map