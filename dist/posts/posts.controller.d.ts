import { PostsService } from './providers/posts.service.js';
import { GetPostsParamDto } from './dtos/get-posts-param.dto.js';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(getPostParamDto: GetPostsParamDto, limit: number, page: number): {
        title: string;
        author: string;
        body: string;
    }[];
}
