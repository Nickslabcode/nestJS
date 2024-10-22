import { PatchPostDto } from './../dtos/patch-post.dto';
import { Body, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from '../../tags/providers/tags.service';

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

  public async findAll(userId: string) {
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        // tags: true,
        // author: true,
      }, // One of the ways to fetch relations
    });
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
    // Find tags
    const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    // Find post
    const post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

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
    // save post and return
    return this.postsRepository.save(post);
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
