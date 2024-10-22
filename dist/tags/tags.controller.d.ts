import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<import("./tag.entity").Tag>;
    delete(id: number): Promise<{
        deleted: boolean;
        id: number;
    }>;
    softDelete(id: number): Promise<{
        deleted: boolean;
        id: number;
    }>;
}
