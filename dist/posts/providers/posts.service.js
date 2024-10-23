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
exports.PostsService = void 0;
const patch_post_dto_1 = require("./../dtos/patch-post.dto");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/providers/users.service");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../post.entity");
const typeorm_2 = require("@nestjs/typeorm");
const meta_option_entity_1 = require("../../meta-options/meta-option.entity");
const create_post_dto_1 = require("../dtos/create-post.dto");
const tags_service_1 = require("../../tags/providers/tags.service");
const pagination_service_1 = require("../../common/pagination/providers/pagination.service");
let PostsService = class PostsService {
    constructor(usersService, tagsService, paginationService, postsRepository, metaOptionsRepository) {
        this.usersService = usersService;
        this.tagsService = tagsService;
        this.paginationService = paginationService;
        this.postsRepository = postsRepository;
        this.metaOptionsRepository = metaOptionsRepository;
    }
    async findAll(postQuery, userId) {
        const posts = this.paginationService.paginateQuery({
            limit: postQuery.limit,
            page: postQuery.page,
        }, this.postsRepository);
        return posts;
    }
    FindOneById(id) {
        return {
            title: 'Second post',
            author: 'Alice',
            body: 'This is a post body',
        };
    }
    async create(createPostDto) {
        const author = await this.usersService.findOneById(createPostDto.authorId);
        const tags = await this.tagsService.findMultipleTags(createPostDto.tags);
        const post = this.postsRepository.create({
            ...createPostDto,
            author: author,
            tags: tags,
        });
        console.log(post);
        return this.postsRepository.save(post);
    }
    async update(patchPostDto) {
        let tags = null;
        let post = null;
        try {
            tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to process your request. Please try again later', {
                cause: error.message,
                description: 'Error connecting to the database',
            });
        }
        if (!tags || tags.length !== patchPostDto.tags.length) {
            throw new common_1.BadRequestException('1 or more tags do not exist. Please check the tag IDs and try again.');
        }
        try {
            post = await this.postsRepository.findOneBy({
                id: patchPostDto.id,
            });
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to process your request. Please try again later', {
                cause: error.message,
                description: 'Error connecting to the database',
            });
        }
        if (!post) {
            throw new common_1.BadRequestException('The post does not exist. Please check the post ID and try again.');
        }
        post.title = patchPostDto.title ?? post.title;
        post.slug = patchPostDto.slug ?? post.slug;
        post.status = patchPostDto.status ?? post.status;
        post.content = patchPostDto.content ?? post.content;
        post.schema = patchPostDto.schema ?? post.schema;
        post.featuredImageUrl =
            patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
        post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;
        post.tags = tags;
        let updatedPost = null;
        try {
            updatedPost = this.postsRepository.save(post);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to update the post at the moment. Please try again later.', {
                cause: error.message,
                description: 'Error connecting to the database',
            });
        }
        return updatedPost;
    }
    async delete(id) {
        try {
            await this.postsRepository.delete(id);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment. Please try again later', {
                cause: error.message,
                description: 'Error connecting to the database',
            });
        }
        return { deleted: true, id };
    }
};
exports.PostsService = PostsService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostsService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patch_post_dto_1.PatchPostDto]),
    __metadata("design:returntype", Promise)
], PostsService.prototype, "update", null);
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_2.InjectRepository)(post_entity_1.Post)),
    __param(4, (0, typeorm_2.InjectRepository)(meta_option_entity_1.MetaOption)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tags_service_1.TagsService,
        pagination_service_1.PaginationService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map