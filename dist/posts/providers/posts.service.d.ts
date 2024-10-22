import { PatchPostDto } from './../dtos/patch-post.dto';
import { UsersService } from '../../users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from '../../tags/providers/tags.service';
export declare class PostsService {
    private readonly usersService;
    private readonly tagsService;
    private readonly postsRepository;
    private readonly metaOptionsRepository;
    constructor(usersService: UsersService, tagsService: TagsService, postsRepository: Repository<Post>, metaOptionsRepository: Repository<MetaOption>);
    findAll(userId: string): Promise<Post[]>;
    FindOneById(id: number): {
        title: string;
        author: string;
        body: string;
    };
    create(createPostDto: CreatePostDto): Promise<Post>;
    update(patchPostDto: PatchPostDto): Promise<Post>;
    delete(id: number): Promise<{
        deleted: boolean;
        id: number;
    }>;
}
