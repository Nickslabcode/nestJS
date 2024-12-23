import { TagsModule } from './../tags/tags.module';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from '../meta-options/meta-option.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostService } from './providers/create-post.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CreatePostService],
  imports: [
    UsersModule,
    TagsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
  ],
})
export class PostsModule {}
