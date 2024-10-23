import { PatchPostDto } from './../dtos/patch-post.dto';
import { UsersService } from '../../users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from '../../tags/providers/tags.service';
import { GetPostsDto } from 'src/users/dtos/get-posts.dto';
import { PaginationService } from 'src/common/pagination/providers/pagination.service';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
export declare class PostsService {
    private readonly usersService;
    private readonly tagsService;
    private readonly paginationService;
    private readonly postsRepository;
    private readonly metaOptionsRepository;
    constructor(usersService: UsersService, tagsService: TagsService, paginationService: PaginationService, postsRepository: Repository<Post>, metaOptionsRepository: Repository<MetaOption>);
    findAll(postQuery: GetPostsDto, userId: string): Promise<Paginated<Post>>;
    FindOneById(id: number): {
        title: string;
        author: string;
        body: string;
    };
    create(createPostDto: CreatePostDto): Promise<Post>;
    update(patchPostDto: PatchPostDto): Promise<any>;
    delete(id: number): Promise<{
        deleted: boolean;
        id: number;
    }>;
}
