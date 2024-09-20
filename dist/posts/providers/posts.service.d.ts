import { GetPostsParamDto } from '../dtos/get-posts-param.dto.js';
export declare class PostsService {
    findAll(getPostParamDto: GetPostsParamDto, limit: number, page: number): {
        title: string;
        author: string;
        body: string;
    }[];
    FindOneById(id: number): {
        title: string;
        author: string;
        body: string;
    };
}
