import { PatchPostDto } from './../dtos/patch-post.dto';
import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from '../../tags/providers/tags.service';
import { GetPostsDto } from 'src/users/dtos/get-posts.dto';
import { PaginationService } from 'src/common/pagination/providers/pagination.service';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting UsersService
     */
    private readonly usersService: UsersService,

    /**
     * Injecting TagsService
     */

    private readonly tagsService: TagsService,

    /**
     * Injecting PaginationService
     */

    private readonly paginationService: PaginationService,

    /**
     * Injecting PostsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Injecting MetaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findAll(
    postQuery: GetPostsDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userId: string,
  ): Promise<Paginated<Post>> {
    const posts = this.paginationService.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postsRepository,
    );

    return posts;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public FindOneById(id: number) {
    return {
      title: 'Second post',
      author: 'Alice',
      body: 'This is a post body',
    };
  }

  public async create(@Body() createPostDto: CreatePostDto) {
    // Find author from db based on the authorId
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // Find tags
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });
    console.log(post);
    return this.postsRepository.save(post);
  }

  public async update(@Body() patchPostDto: PatchPostDto) {
    let tags = null;
    let post = null;

    // Find tags
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request. Please try again later',
        {
          cause: error.message,
          description: 'Error connecting to the database',
        },
      );
    }

    /**
     * Check tags array length
     */

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        '1 or more tags do not exist. Please check the tag IDs and try again.',
      );
    }

    // Find post
    try {
      post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request. Please try again later',
        {
          cause: error.message,
          description: 'Error connecting to the database',
        },
      );
    }

    if (!post) {
      throw new BadRequestException(
        'The post does not exist. Please check the post ID and try again.',
      );
    }

    // update properties
    post.title = patchPostDto.title ?? post.title;
    post.slug = patchPostDto.slug ?? post.slug;
    post.status = patchPostDto.status ?? post.status;
    post.content = patchPostDto.content ?? post.content;
    post.schema = patchPostDto.schema ?? post.schema;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;

    // assign tags to post
    post.tags = tags;

    let updatedPost = null;

    try {
      // save post and return
      updatedPost = this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to update the post at the moment. Please try again later.',
        {
          cause: error.message,
          description: 'Error connecting to the database',
        },
      );
    }

    return updatedPost;
  }

  public async delete(id: number) {
    try {
      await this.postsRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later',
        {
          cause: error.message,
          description: 'Error connecting to the database',
        },
      );
    }

    return { deleted: true, id };
  }
}
