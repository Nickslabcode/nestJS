import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service.js';
import { GetPostsParamDto } from './dtos/get-posts-param.dto.js';

@Controller('posts')
export class PostsController {
  constructor(
    // Inject PostsService
    private readonly postsService: PostsService,
  ) {}

  @Get('/:id?')
  public getPosts(
    @Param() getPostParamDto: GetPostsParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.postsService.findAll(getPostParamDto, limit, page);
  }

  // Complete Post, Patch methods as well as the http requests and test them

  // @Post()
  // public createPost(@Body() createPostDto: CreatePostDto) {}
}
