import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from './../../tags/providers/tags.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostService {
  constructor(
    /**
     * Injecting usersService
     */
    private readonly usersService: UsersService,

    /**
     * Injecting tagsService
     */
    private readonly tagsService: TagsService,

    /**
     * Injecting postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    let author = undefined;
    let tags = undefined;

    try {
      // Find author from db based on the authorId
      author = await this.usersService.findOneById(user.sub);

      // Find tags
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }
    console.log(tags);
    if (createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('Please check your Tag IDs');
    }
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    try {
      return this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
