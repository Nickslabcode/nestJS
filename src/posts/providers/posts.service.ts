import { Injectable } from '@nestjs/common';
import { GetPostsParamDto } from '../dtos/get-posts-param.dto.js';

@Injectable()
export class PostsService {
  public findAll(
    getPostParamDto: GetPostsParamDto,
    limit: number,
    page: number,
  ) {
    return [
      {
        title: 'First post',
        author: 'John',
        body: 'This is a post body',
      },
      {
        title: 'Second post',
        author: 'Alice',
        body: 'This is a post body',
      },
      {
        title: 'Third post',
        author: 'John',
        body: 'This is a post body',
      },
    ];
  }

  public FindOneById(id: number) {
    return {
      title: 'Second post',
      author: 'Alice',
      body: 'This is a post body',
    };
  }
}
