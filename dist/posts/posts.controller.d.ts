import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(userId: string): Promise<import("./post.entity").Post[]>;
    createPost(createPostDto: CreatePostDto): Promise<import("./post.entity").Post>;
    patchPost(patchPostDto: PatchPostDto): Promise<import("./post.entity").Post>;
    deletePost(id: number): Promise<{
        deleted: boolean;
        id: number;
    }>;
}
