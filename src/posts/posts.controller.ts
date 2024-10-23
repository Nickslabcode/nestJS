import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPostsDto } from 'src/users/dtos/get-posts.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    // Inject PostsService
    private readonly postsService: PostsService,
  ) {}

  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    console.log(postQuery);
    return this.postsService.findAll(postQuery, userId);
  }

  // Complete Post, Patch methods as well as the http requests and test them

  @ApiOperation({
    summary: 'Creates a blog post',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response code if your post is created successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Updates a blog post corresponding to the given ID',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 200 response code if your post is updated successfully',
  })
  @Patch()
  public patchPost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
