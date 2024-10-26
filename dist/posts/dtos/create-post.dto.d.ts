import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
export declare class CreatePostDto {
    title: string;
    postType: postType;
    slug: string;
    status: postStatus;
    content?: string;
    schema?: string;
    featuredImageUrl?: string;
    publishedOn?: string;
    tags?: number[];
    metaOptions?: CreatePostMetaOptionsDto | null;
}
