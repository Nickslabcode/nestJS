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
exports.CreatePostDto = void 0;
const class_validator_1 = require("class-validator");
const postType_enum_1 = require("../enums/postType.enum");
const postStatus_enum_1 = require("../enums/postStatus.enum");
const create_post_meta_options_dto_1 = require("../../meta-options/dtos/create-post-meta-options.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreatePostDto {
}
exports.CreatePostDto = CreatePostDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Blog post title',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(512),
    __metadata("design:type", String)
], CreatePostDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: postType_enum_1.postType,
        description: 'Possible values: post, page, story or series',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(postType_enum_1.postType, {
        message: 'postType must be one of: post, page, story or series',
    }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "postType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'my-post-url',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(256),
    (0, class_validator_1.Matches)(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
    }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: postStatus_enum_1.postStatus,
        description: 'Possible values: draft, scheduled, review or published',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(postStatus_enum_1.postStatus, {
        message: 'status must be one of: draft, scheduled, review or published',
    }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The content of the post',
        example: "This is a post's content",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Property to serialize your JSON object else a validation error will be thrown',
        example: '{"type": "test"}',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "schema", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The URL of the featured image of the post',
        example: 'http://localhost.com/images/image1.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1024),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "featuredImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The date when the post is published',
        example: '2024-09-22T14:00:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "publishedOn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Array of ids of tags',
        example: [1, 2],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CreatePostDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'object',
        required: false,
        items: {
            type: 'object',
            properties: {
                metaValue: {
                    type: 'json',
                    description: 'The metaValue is a JSON string',
                    example: '{"sidebarEnabled":true}',
                },
            },
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_post_meta_options_dto_1.CreatePostMetaOptionsDto),
    __metadata("design:type", create_post_meta_options_dto_1.CreatePostMetaOptionsDto)
], CreatePostDto.prototype, "metaOptions", void 0);
//# sourceMappingURL=create-post.dto.js.map