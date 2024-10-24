import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from 'src/users/dtos/get-posts.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(userId: string, postQuery: GetPostsDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./post.entity").Post>>;
    createPost(createPostDto: CreatePostDto): Promise<import("./post.entity").Post>;
    patchPost(patchPostDto: PatchPostDto): Promise<any>;
    deletePost(id: number): Promise<{
        deleted: boolean;
        id: number;
    }>;
}
