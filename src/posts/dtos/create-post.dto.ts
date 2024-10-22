import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'Blog post title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(512)
  title: string;

  @ApiProperty({
    enum: postType,
    description: 'Possible values: post, page, story or series',
  })
  @IsNotEmpty()
  @IsEnum(postType, {
    message: 'postType must be one of: post, page, story or series',
  })
  postType: postType;

  @ApiProperty({
    example: 'my-post-url',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: postStatus,
    description: 'Possible values: draft, scheduled, review or published',
  })
  @IsNotEmpty()
  @IsEnum(postStatus, {
    message: 'status must be one of: draft, scheduled, review or published',
  })
  status: postStatus;

  @ApiPropertyOptional({
    description: 'The content of the post',
    example: "This is a post's content",
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Property to serialize your JSON object else a validation error will be thrown',
    example: '{"type": "test"}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The URL of the featured image of the post',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsOptional()
  @MaxLength(1024)
  @IsUrl()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date when the post is published',
    example: '2024-09-22T14:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of ids of tags',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The metaValue is a JSON string',
          example: '{"sidebarEnabled":true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    type: 'integer',
    required: true,
    example: 1,
  })
  authorId: number;
}
