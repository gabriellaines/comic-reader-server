"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComicDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_comic_dto_1 = require("./create-comic.dto");
class UpdateComicDto extends (0, mapped_types_1.PartialType)(create_comic_dto_1.CreateComicDto) {
}
exports.UpdateComicDto = UpdateComicDto;
//# sourceMappingURL=update-comic.dto.js.map