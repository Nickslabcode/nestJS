import { User } from '../users/user.entity';
import { MetaOption } from '../meta-options/meta-option.entity';
import { postStatus } from './enums/postStatus.enum';
import { postType } from './enums/postType.enum';
import { Tag } from '../tags/tag.entity';
export declare class Post {
    id: number;
    title: string;
    PostType: postType;
    slug: string;
    status: postStatus;
    content: string;
    schema: string;
    featuredImageUrl: string;
    publishedOn: Date;
    metaOptions?: MetaOption;
    author: User;
    tags?: Tag[];
}
