import { Post } from '../posts/post.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    posts: Post[];
}
