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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./providers/posts.service");
const create_post_dto_1 = require("./dtos/create-post.dto");
const patch_post_dto_1 = require("./dtos/patch-post.dto");
const swagger_1 = require("@nestjs/swagger");
const get_posts_dto_1 = require("../users/dtos/get-posts.dto");
const active_user_decorator_1 = require("../auth/decorators/active-user.decorator");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    getPosts(userId, postQuery) {
        console.log(postQuery);
        return this.postsService.findAll(postQuery, userId);
    }
    createPost(createPostDto, user) {
        return this.postsService.create(createPostDto, user);
    }
    patchPost(patchPostDto) {
        return this.postsService.update(patchPostDto);
    }
    deletePost(id) {
        return this.postsService.delete(id);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)('/:userId?'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_posts_dto_1.GetPostsDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Creates a blog post',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'You get a 201 response code if your post is created successfully',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Updates a blog post corresponding to the given ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'You get a 200 response code if your post is updated successfully',
    }),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patch_post_dto_1.PatchPostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "patchPost", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, swagger_1.ApiTags)('Posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map